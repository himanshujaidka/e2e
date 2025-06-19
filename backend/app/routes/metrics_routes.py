# app/routes/metrics_routes.py
from fastapi import APIRouter
import psutil
import os

router = APIRouter()

@router.get("/metrics", tags=["Monitoring"])
async def get_metrics():
    process = psutil.Process(os.getpid())
    mem_bytes = process.memory_info().rss
    mem_gb = mem_bytes / (1024 ** 2)

    return {
        "app_memory_usage_gb": f"{mem_gb:.2f} MB",
        "app_memory_usage_mb": f"{mem_bytes / (1024 ** 2):.2f} MB",
        "memory_bytes": mem_bytes
    }
