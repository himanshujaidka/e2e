from fastapi import FastAPI
from app.routes import ssh_routes, remote_access, login
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React dev server origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ssh_routes.router, prefix="/ssh", tags=["SSH"])
app.include_router(remote_access.router, prefix="/remote", tags=["Remote Access"])
app.include_router(login.router, prefix="", tags=["Login"])