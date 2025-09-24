from decimal import Decimal
from .schemas import Holding
from app import schemas
import time


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