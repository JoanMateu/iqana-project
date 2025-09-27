import time
from decimal import Decimal
from app import cache, schemas
import app.settings.config as cfg

def test_cache_ttl_expired(monkeypatch):
    monkeypatch.setattr(cfg, "CACHE_TTL_SECONDS", 0)

    resp = schemas.HoldingsResponse(
        source="live",
        data=[schemas.Holding(asset="BTC", amount=Decimal("0.10"), value_eur=Decimal("1000.00"))],
        timestamp=123,
        username="u",
    )
    cache.set_cache_holdings(resp)
    time.sleep(1)

    got = cache.get_cached_holdings()
    assert got is None