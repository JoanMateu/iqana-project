import json
from decimal import Decimal
from app import schemas
import app.cache as cache

def test_holdings_mock_ok(client):
    r = client.get("/holdings?source=mock")
    assert r.status_code == 200
    body = r.json()
    assert body["source"] == "mock"
    assert isinstance(body["data"], list)
    assert all("asset" in h and "amount" in h for h in body["data"])

def test_holdings_live_ok_mock(client, monkeypatch):
    import app.coinbase as cb
    # Simulate a response from Coinbase
    fake = schemas.HoldingsResponse(
        source="live",
        data=[schemas.Holding(asset="ETH", amount=Decimal("1.23"), value_eur=Decimal("123.45"))],
        timestamp=1727440000,
        username="test_user",
    )

    def fake_fetch():
        return fake
    
    monkeypatch.setattr(cb, "fetch_holdings_coinbase", fake_fetch)

    r = client.get("/holdings?source=live")
    assert r.status_code == 200
    body = r.json()
    assert body["source"] == "live"
    assert body["username"] == "test_user"
    assert body["data"][0]["asset"] == "ETH"


def test_fetch_holdings_coinbase_fallback_to_cache(monkeypatch):
    import app.coinbase as cb
    cached = schemas.HoldingsResponse(
        source="cache",
        data=[schemas.Holding(asset="BTC", amount=Decimal("0.50"), value_eur=Decimal("30000.00"))],
        timestamp=1727441111,
        username="cached_user",
    )

    cache.set_cache_holdings(cached)

    class ErrorClient:
        def get(self, *a, **k):
            raise RuntimeError("Error get")
        def get_accounts(self, *a, **k):
            raise RuntimeError("Error accounts")

    monkeypatch.setattr(cb, "client", ErrorClient())

    resp = cb.fetch_holdings_coinbase()

    assert resp.source == "cache"
    assert resp.username == "cached_user"
    assert resp.data[0].asset == "BTC"

def test_holdings_bad_source_logs_and_500(client, caplog):
    with caplog.at_level("ERROR"):
        r = client.get("/holdings?source=no_source")
    assert r.status_code == 500  
    assert any("holdings_bad_source" in rec.message for rec in caplog.records)