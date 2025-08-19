from .ocr_routes import ocr_router
from .home_route import home_router
from .file_route import file_router

__all__ = [
    "home_router",
    "ocr_router",
    "file_router"
]
