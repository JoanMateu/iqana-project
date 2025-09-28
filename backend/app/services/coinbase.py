# app/services/coinbase.py
import time
from decimal import Decimal, ROUND_HALF_UP, InvalidOperation
from coinbase.rest import RESTClient
from app import schemas
from app.core.settings import settings

client = RESTClient(api_key=settings.COINBASE_API_KEY,
                    api_secret=settings.COINBASE_API_SECRET)

def fetch_holdings_mock() -> schemas.HoldingsResponse:
    """Returns mock holdings data for testing purposes."""

    holdings = [
        schemas.Holding(asset="BTC", amount=Decimal("0.0500"), value_eur=Decimal("1700.00")),
        schemas.Holding(asset="ETH", amount=Decimal("1.2000"), value_eur=Decimal("3000.00")),
        schemas.Holding(asset="EUR", amount=Decimal("50.00"), value_eur=Decimal("50.00")),
        schemas.Holding(asset="LTC", amount=Decimal("10.0000"), value_eur=Decimal("800.00")),
        schemas.Holding(asset="XRP", amount=Decimal("500.0000"), value_eur=Decimal("400.00")),
        schemas.Holding(asset="DOGE", amount=Decimal("10000.0000"), value_eur=Decimal("200.00")),
        schemas.Holding(asset="ADA", amount=Decimal("2000.0000"), value_eur=Decimal("100.00")),
    ]
    return schemas.HoldingsResponse(
        source="mock", data=holdings, timestamp=int(time.time()), username="mock_user"
    )

def fetch_holdings_coinbase() -> schemas.HoldingsResponse:
    """Fetches and returns holdings from Coinbase account. Also return Username if available."""
    
    user_info = client.get("/v2/user")
    username = user_info["data"].get("name") or user_info["data"].get("username") or user_info["data"].get("email")

    accounts = client.get_accounts()
    holdings: list[schemas.Holding] = []

    for acc in accounts["accounts"]:
        balance_info = acc["available_balance"]
        if not balance_info:
            continue
        try:
            balance = Decimal(balance_info["value"])
            currency = balance_info["currency"]
        except (KeyError, ValueError, InvalidOperation):
            continue
        if balance <= 0:
            continue

        if currency == "EUR":
            value_eur = balance
        else:
            try:
                price_resp = client.get(f"/v2/prices/{currency}-EUR/spot")
                rate = Decimal(price_resp["data"]["amount"])
                value_eur = (balance * rate).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            except Exception:
                value_eur = None

        holdings.append(schemas.Holding(asset=currency, amount=balance, value_eur=value_eur))

    return schemas.HoldingsResponse(source="live", data=holdings, timestamp=int(time.time()), username=username)
