import os
import pytest
from decimal import Decimal
import app.services.coinbase as cb
from app.core import cache

INTEGRATION = os.getenv("LIVE_TESTS") == "1"

@pytest.mark.skipif(not INTEGRATION, reason="LIVE_TESTS not set")
def test_coinbase_function_live(monkeypatch):
    monkeypatch.setattr(cache, "_CACHE", {})

    resp = cb.fetch_holdings_coinbase()

    assert resp.source in ("live", "cache")
    assert isinstance(resp.data, list)
    for h in resp.data:
        assert isinstance(h.asset, str)
        assert isinstance(h.amount, Decimal)
        assert (h.value_eur is None) or isinstance(h.value_eur, Decimal)