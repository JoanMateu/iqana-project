from decimal import Decimal
from .schemas import Holding
from app import schemas, cache
import time
from coinbase.rest import RESTClient
from app.settings import config
from json import dumps

client = RESTClient(api_key=config.COINBASE_API_KEY, api_secret=config.COINBASE_API_SECRET)

def fetch_holdings_mock() -> schemas.HoldingsResponse:
    holdings = [
        Holding(asset="BTC", amount=Decimal("0.0500")),
        Holding(asset="ETH", amount=Decimal("1.2000")),
    ]

    return schemas.HoldingsResponse(
            source="mock",
            data=holdings,
            timestamp=int(time.time()),
            username="mock_user"
        )


def fetch_holdings_coinbase() -> schemas.HoldingsResponse:
    try:

        user_info = client.get("/v2/user") 
        username = None
        try:
            username = user_info["data"].get("name") or user_info["data"].get("username") or user_info["data"].get("email")
        except Exception:
            username = None


        accounts = client.get_accounts()
        holdings = []

        for acc in accounts["accounts"]:
            balance_info = acc["available_balance"]
            if not balance_info:
                continue

            try:
                balance = Decimal(balance_info["value"])
                currency = balance_info["currency"]
            except (KeyError, ValueError):
                continue

            if balance > 0:
                holdings.append(schemas.Holding(asset=currency, amount=balance))

        result = schemas.HoldingsResponse(
            source="live",
            data=holdings,
            timestamp=int(time.time()),
            username=username
        )

        return result
    
    except Exception as e:
        cached = cache.get_cached_holdings()
        if cached:
            return cached
        raise