from decimal import Decimal
from fastapi import FastAPI,Request
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import json
import logging
import os

from app import schemas
from app import cache
from app import coinbase
from app.settings import config

load_dotenv() 
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
level = getattr(logging, LOG_LEVEL, logging.INFO)

root = logging.getLogger()
root.setLevel(level)
for h in root.handlers:
    h.setLevel(level)

logger = logging.getLogger("iqana")
logger.propagate = True  
app = FastAPI(title=config.PROJECT_NAME)


app.add_middleware(
    CORSMiddleware,
    allow_origins=config.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def _json_dumps_safe(payload: dict) -> str:
    def _default(o):
        if isinstance(o, Decimal):
            return str(o)
        return str(o)
    return json.dumps(payload, default=_default)

def log_info(event: str, **kwargs):
    record = {"event": event, **kwargs}
    logger.info(_json_dumps_safe(record))

def log_error(event: str, **kwargs):
    record = {"event": event, **kwargs}
    logger.error(_json_dumps_safe(record))



@app.middleware("http")
async def log_requests(request: Request, call_next):
    try:
        ua = request.headers.get("user-agent", "-")
        log_info("request_start", method=request.method, path=request.url.path, user_agent=ua)

        response = await call_next(request)  

        log_info("request_end", method=request.method, path=request.url.path, status=response.status_code)
        return response
    except Exception as e:
        log_error("request_error", method=request.method, path=request.url.path, error=str(e))
        raise



@app.get("/health")
def health():
    log_info("health_ok")
    print("Health check OK")
    return {"status": "ok"}



@app.get("/holdings", response_model=schemas.HoldingsResponse)
def get_holdings(source: str = "mock"):
    try:
        if source == "mock":
            holdings = coinbase.fetch_holdings_mock()
            cache.set_cache_holdings(holdings)
            return holdings
        elif source == "cache":
            cached = cache.get_cached_holdings()
            if cached:
                return cached
            else:
                return schemas.HoldingsResponse(
                source="cache",
                data=[],
                timestamp=None
            )
        elif source == "live":
            holdings = coinbase.fetch_holdings_coinbase()
            cache.set_cache_holdings(holdings)
            log_info("holdings_ok", source="live", items=len(holdings.data), username=holdings.username)
            return holdings
        else:
            log_error("holdings_bad_source", source=source)
            raise ValueError("Unsupported source")
        
    except Exception as e:
        log_error("holdings_error", source=source, error=str(e))
        raise


handler = Mangum(app)