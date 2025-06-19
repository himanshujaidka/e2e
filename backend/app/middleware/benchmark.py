# middleware/benchmark.py

import time
import psutil
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

proc = psutil.Process()

class BenchmarkMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.time()
        cpu_before = proc.cpu_percent(interval=None)
        mem_before = proc.memory_info().rss

        response = await call_next(request)

        duration = time.time() - start
        cpu_after = proc.cpu_percent(interval=None)
        mem_after = proc.memory_info().rss

        print(
            f"→ {request.method} {request.url.path}: "
            f"{duration:.3f}s, CPU Δ {cpu_after - cpu_before}%, "
            f"Mem Δ {(mem_after - mem_before) / 1024:.1f} KB"
        )

        return response
