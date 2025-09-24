import time 
from typing import Optional, Dict, Any, List
from app import schemas
from app.settings import config

_CACHE: dict[str, tuple[schemas.HoldingsResponse, int]] = {}


#### eg:
# _CACHE = {
#   "holdings": {
#     "data": [ { "asset": "BTC", "amount": 0.05 }, { "asset": "ETH", "amount": 1.2 } ],
#     "timestamp": 1727132345
#   }
# }
###


def get_cached_holdings() -> Optional[schemas.HoldingsResponse]:
    if "holdings" not in _CACHE:
        return None

    data, saved_at = _CACHE["holdings"]
    age = int(time.time()) - saved_at

    if age > config.CACHE_TTL_SECONDS:
        _CACHE.pop("holdings", None)
        return None

    return data

def set_cache_holdings(data: schemas.HoldingsResponse) -> None:
    _CACHE["holdings"] = (data, int(time.time()))