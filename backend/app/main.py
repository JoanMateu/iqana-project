# app/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from app.core.settings import settings
from app.core.logging import setup_logging, log_info, log_error
from app.api.routes import router as api_router
from app.handlers import register_exception_handlers

logger = setup_logging()

app = FastAPI(title=settings.PROJECT_NAME)
register_exception_handlers(app)

# inyectar logger al router (para usarlo dentro de routes.py)
setattr(api_router, "logger", logger)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    try:
        ua = request.headers.get("user-agent", "-")
        log_info(logger, "request_start", method=request.method, path=request.url.path, user_agent=ua)
        response = await call_next(request)
        log_info(logger, "request_end", method=request.method, path=request.url.path, status=response.status_code)
        return response
    except Exception as e:
        log_error(logger, "request_error", method=request.method, path=request.url.path, error=str(e))
        raise

app.include_router(api_router, prefix="/api")

@app.get("/health")
def health_root():
    return {"status": "ok"}

handler = Mangum(app)
