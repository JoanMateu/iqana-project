from fastapi import Request
from fastapi.responses import JSONResponse
from app.core.errors import BadSourceError,BadSourceErrorNoCacheData

def register_exception_handlers(app):

    @app.exception_handler(BadSourceErrorNoCacheData)
    async def bad_source_no_cache_handler(request: Request, exc: BadSourceErrorNoCacheData):
        return JSONResponse(
            status_code=400,
            content={
                "detail": {
                    "error_code": exc.code,
                    "message": exc.message,
                }
            },
        )
    
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={
                "detail": {
                    "error_code": "internal_error",
                    "message": "An unexpected error occurred.",
                }
            },
        )