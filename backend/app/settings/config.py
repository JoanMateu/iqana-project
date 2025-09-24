import os
from typing import List

PROJECT_NAME = os.getenv("PROJECT_NAME", "Iqana Backend")

CACHE_TTL_SECONDS = int(os.getenv("CACHE_TTL_SECONDS", "60"))


raw_origins = os.getenv(
    "BACKEND_CORS_ORIGINS",
    "http://127.0.0.1:5173,http://localhost:5173"
)

BACKEND_CORS_ORIGINS = [o.strip() for o in raw_origins.split(",")]