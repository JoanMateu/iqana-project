import time 
from typing import Optional, Dict, Any, List

_CACHE: Dict[str, Any] = {}
_TTL_SECONDS = 60  # Cache Time-To-Live in seconds



#### eg:
# _CACHE = {
#   "holdings": {
#     "data": [ { "asset": "BTC", "amount": 0.05 }, { "asset": "ETH", "amount": 1.2 } ],
#     "timestamp": 1727132345
#   }
# }
###


def get_cached_holdings() -> Optional[dict]:
    entry = _CACHE.get("holdings")
    if entry and (time.time() - entry["timestamp"] < _TTL_SECONDS):
        return entry
    return None

def set_cached_holdings(data: List[dict]) -> None:
    _CACHE["holdings"] = {
        "data": data,
        "timestamp": int(time.time())
    }