# app/api/routes.py
from fastapi import APIRouter, HTTPException, status
from app import schemas
from app.core.logging import log_info, log_error
from app.core import cache
from app.services import coinbase
from app.core.errors import BadSourceError, BadSourceErrorNoCacheData

router = APIRouter()

@router.get("/health")
def health():
    log_info(router.logger, "health_ok")  
    return {"status": "ok"}

@router.get("/holdings", response_model=schemas.HoldingsResponse)
def get_holdings(source: str = "mock"):
    """Fetch holdings from specified source: "mock", "cache", or "live".
        Falls back to cache if live fetch fails and cache is available.
        - mock: Returns mock data for testing.
        - cache: Returns cached data if available, else empty response.
        - live: Fetches live data from Coinbase, updates cache, falls back to cache on failure.
        """
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
        raise BadSourceError(f"Unsupported source: {source}")
    
    except Exception as e:
        cached = cache.get_cached_holdings()
        if cached:
            log_error(router.logger, "holdings_fallback_cache", source=source, error=str(e))
            return cached

        log_error(router.logger, "holdings_no_cache_error", source=source, error=str(e))

        if isinstance(e, BadSourceError):
            raise BadSourceErrorNoCacheData(f"Unsupported source: {source}")
        raise