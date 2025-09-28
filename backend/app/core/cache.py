import time 
from typing import Optional, Dict, Any, List
from app import schemas
from app.core.settings import settings

_CACHE: dict[str, tuple[schemas.HoldingsResponse, int]] = {}



def get_cached_holdings() -> Optional[schemas.HoldingsResponse]:
    """Returns cached holdings if available and not expired, else None."""
    
    if "holdings" not in _CACHE:
        return None

    data, saved_at = _CACHE["holdings"]
    age = int(time.time()) - saved_at

    if age > settings.CACHE_TTL_SECONDS:
        _CACHE.pop("holdings", None)
        return None

    return data

def set_cache_holdings(data: schemas.HoldingsResponse) -> None:
    _CACHE["holdings"] = (data, int(time.time()))


def clear_cache_holdings() -> None:
    _CACHE.pop("holdings", None)


def force_expire_cache_holdings() -> None:
    if "holdings" in _CACHE:
        data, _ = _CACHE["holdings"]
        _CACHE["holdings"] = (data, int(time.time()) - settings.CACHE_TTL_SECONDS - 1)