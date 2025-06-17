from fastapi import APIRouter
from app.services.remote_client import access_remote_server

router = APIRouter()

@router.get("/access")
def access_remote():
    return access_remote_server()
