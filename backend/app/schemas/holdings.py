# app/schemas/holdings.py
from typing import Optional, List, Literal
from decimal import Decimal
from pydantic import BaseModel

class Holding(BaseModel):
    asset: str
    amount: Decimal
    value_eur: Optional[Decimal] = None

class HoldingsResponse(BaseModel):
    source: Literal["mock", "cache", "live"]
    data: List[Holding]
    timestamp: Optional[int] = None
    username: Optional[str] = None
