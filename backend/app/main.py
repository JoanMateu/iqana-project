from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from app import schemas
from app import cache
from app import coinbase
from app.settings import config

load_dotenv() 

app = FastAPI(title=config.PROJECT_NAME)


app.add_middleware(
    CORSMiddleware,
    allow_origins=config.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    print("Health check OK")
    return {"status": "ok"}



@app.get("/holdings", response_model=schemas.HoldingsResponse)
def get_holdings(source: str = "mock"):
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
        return holdings
    else:
        raise ValueError("Unsupported source")
    


handler = Mangum(app)