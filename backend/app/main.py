from fastapi import FastAPI
from dotenv import load_dotenv
from app import schemas
from app import cache
from app import coinbase
from fastapi.middleware.cors import CORSMiddleware
from app.settings import config

load_dotenv() 
app = FastAPI(title=config.PROJECT_NAME)

@app.get("/health")
def health():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/holdings", response_model=schemas.HoldingsResponse)
def get_holdings(source: str = "mock"):
    if source == "mock":
        return coinbase.fetch_holdings_mock()
    else:
        raise ValueError("Unsupported source")