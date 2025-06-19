from fastapi import FastAPI ,Request
import time
from app.routes import ssh_routes, remote_access, login, metrics_routes
from fastapi.middleware.cors import CORSMiddleware
from app.middleware.benchmark import BenchmarkMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React dev server origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(BenchmarkMiddleware)


app.include_router(ssh_routes.router, prefix="/ssh", tags=["SSH"])
app.include_router(remote_access.router, prefix="/remote", tags=["Remote Access"])
app.include_router(login.router, prefix="", tags=["Login"])
app.include_router(metrics_routes.router, prefix="/monitoring", tags=["Monitoring"])
