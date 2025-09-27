# app/core/settings.py
import os
from typing import List
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()  

def _split_csv(value: str) -> List[str]:
    return [o.strip() for o in value.split(",")] if value else []

@dataclass(frozen=True)
class Settings:
    PROJECT_NAME: str
    CACHE_TTL_SECONDS: int
    COINBASE_API_KEY: str
    COINBASE_API_SECRET: str
    BACKEND_CORS_ORIGINS: List[str]
    LOG_LEVEL: str

def _build_settings() -> Settings:
    raw_origins = os.getenv(
        "BACKEND_CORS_ORIGINS",
        "http://127.0.0.1:5173,http://localhost:5173",
    )
    return Settings(
        PROJECT_NAME=os.getenv("PROJECT_NAME", "Iqana Backend"),
        CACHE_TTL_SECONDS=int(os.getenv("CACHE_TTL_SECONDS", "60")),
        COINBASE_API_KEY=os.getenv("COINBASE_API_KEY", ""),
        COINBASE_API_SECRET=os.getenv("COINBASE_API_SECRET", ""),
        BACKEND_CORS_ORIGINS=_split_csv(raw_origins),
        LOG_LEVEL=os.getenv("LOG_LEVEL", "INFO").upper(),
    )

settings = _build_settings()
