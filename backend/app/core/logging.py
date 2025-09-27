import logging
from decimal import Decimal
import json
from app.core.settings import settings

def setup_logging() -> logging.Logger:
    level = getattr(logging, settings.LOG_LEVEL, logging.INFO)
    root = logging.getLogger()
    root.setLevel(level)
    for h in root.handlers:
        h.setLevel(level)
    logger = logging.getLogger("iqana")
    logger.propagate = True
    return logger

def _json_dumps_safe(payload: dict) -> str:
    def _default(o):
        if isinstance(o, Decimal):
            return str(o)
        return str(o)
    return json.dumps(payload, default=_default)

def log_info(logger: logging.Logger, event: str, **kwargs):
    logger.info(_json_dumps_safe({"event": event, **kwargs}))

def log_error(logger: logging.Logger, event: str, **kwargs):
    logger.error(_json_dumps_safe({"event": event, **kwargs}))