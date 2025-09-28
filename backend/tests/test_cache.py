import time
from decimal import Decimal
from app.core import cache
from app.schemas import holdings
from app.core.settings import settings

def test_cache_ttl_expired(monkeypatch):

    resp = holdings.HoldingsResponse(
        source="live",
        data=[holdings.Holding(asset="BTC", amount=Decimal("0.10"), value_eur=Decimal("1000.00"))],
        timestamp=123,
        username="u",
    )
    cache.set_cache_holdings(resp)
    cache.force_expire_cache_holdings()

    got = cache.get_cached_holdings()
    assert got is None