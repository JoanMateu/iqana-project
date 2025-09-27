import os
import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("LOG_LEVEL", "INFO")

from app.main import app  

@pytest.fixture()
def client():
    return TestClient(app, raise_server_exceptions=False)