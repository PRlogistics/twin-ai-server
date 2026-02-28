"""
TWIN - Real-time Voice Translation Platform
Python 3.14+ with FastAPI
"""

from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import ORJSONResponse

from app.api import auth, conversations, health, rooms, users, websocket
from app.core.config import settings
from app.core.database import engine, init_db
from app.core.middleware import LoggingMiddleware, RateLimitMiddleware
from app.services.webrtc import WebRTCManager

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup
    logger.info("starting_twin_server", version="2.0.0", python_version="3.14")
    
    # Initialize database
    await init_db()
    
    # Initialize WebRTC manager
    app.state.webrtc = WebRTCManager()
    await app.state.webrtc.start()
    
    # Start background tasks
    app.state.audio_processor = asyncio.create_task(
        audio_processing_worker(app.state.webrtc)
    )
    
    logger.info("twin_server_ready")
    yield
    
    # Shutdown
    logger.info("shutting_down_twin_server")
    app.state.audio_processor.cancel()
    await app.state.webrtc.stop()
    await engine.dispose()


app = FastAPI(
    title="TWIN API",
    description="Real-time voice translation platform",
    version="2.0.0",
    default_response_class=ORJSONResponse,
    lifespan=lifespan,
    docs_url="/api/docs" if settings.DEBUG else None,
    redoc_url="/api/redoc" if settings.DEBUG else None,
)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(LoggingMiddleware)
app.add_middleware(RateLimitMiddleware, requests_per_minute=100)

# Routers
app.include_router(health.router, prefix="/api/v1", tags=["health"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(rooms.router, prefix="/api/v1/rooms", tags=["rooms"])
app.include_router(conversations.router, prefix="/api/v1/conversations", tags=["conversations"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])


async def audio_processing_worker(webrtc: WebRTCManager) -> None:
    """Background worker for processing audio streams."""
    while True:
        try:
            # Process audio chunks from queue
            chunk = await webrtc.audio_queue.get()
            await process_audio_chunk(chunk)
        except asyncio.CancelledError:
            break
        except Exception as e:
            logger.error("audio_processing_error", error=str(e))


async def process_audio_chunk(chunk: AudioChunk) -> None:
    """Process single audio chunk through STT -> Translate -> TTS pipeline."""
    # This integrates with AI services
    pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        workers=1 if settings.DEBUG else 4,
    )
