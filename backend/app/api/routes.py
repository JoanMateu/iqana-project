# app/api/routes.py
from fastapi import APIRouter
from app import schemas
from app.core.logging import log_info, log_error
from app.core import cache
from app.services import coinbase

router = APIRouter()

@router.get("/health")
def health():
    log_info(router.logger, "health_ok")  
    return {"status": "ok"}

@router.get("/holdings", response_model=schemas.HoldingsResponse)
def get_holdings(source: str = "mock"):
    try:
        if source == "mock":
            resp = coinbase.fetch_holdings_mock()
            cache.set_cache_holdings(resp)
            return resp
        if source == "cache":
            cached = cache.get_cached_holdings()
            return cached or schemas.HoldingsResponse(source="cache", data=[], timestamp=None)
        if source == "live":
            resp = coinbase.fetch_holdings_coinbase()
            cache.set_cache_holdings(resp)
            log_info(router.logger, "holdings_ok", source="live", items=len(resp.data), username=resp.username)  
            return resp

        log_error(router.logger, "holdings_bad_source", source=source) 
        raise ValueError("Unsupported source")
    except Exception as e:
        # fallback a cache
        cached = cache.get_cached_holdings()
        if cached:
            log_error(router.logger, "holdings_error_but_cache", source=source, error=str(e))  
            return cached
        log_error(router.logger, "holdings_error", source=source, error=str(e))  
        raise
