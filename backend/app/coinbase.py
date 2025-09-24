from decimal import Decimal
from .schemas import Holding
from app import schemas
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
            timestamp=int(time.time())
        )


def fetch_holdings_coinbase() -> schemas.HoldingsResponse:
    accounts = client.get_accounts()
    holdings = []

    for acc in accounts["accounts"]:
        balance = Decimal(acc["available_balance"]["value"])
        if balance > 0:
            currency = acc["available_balance"]["currency"]
            holdings.append(schemas.Holding(asset=currency, amount=balance))

    return schemas.HoldingsResponse(
        source="live",
        data=holdings,
        timestamp=int(time.time())
    )
