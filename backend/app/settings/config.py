import os
from typing import List
from dotenv import load_dotenv

load_dotenv() 

PROJECT_NAME = os.getenv("PROJECT_NAME", "Iqana Backend")

CACHE_TTL_SECONDS = int(os.getenv("CACHE_TTL_SECONDS", "60"))
COINBASE_API_KEY = os.getenv("COINBASE_API_KEY", "")
COINBASE_API_SECRET = os.getenv("COINBASE_API_SECRET", "")

raw_origins = os.getenv(
    "BACKEND_CORS_ORIGINS",
    "http://127.0.0.1:5173,http://localhost:5173"
)

BACKEND_CORS_ORIGINS = [o.strip() for o in raw_origins.split(",")]