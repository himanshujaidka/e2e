from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.ssh_service import list_remote_files, run_remote_script, connect_ssh
from app.services.application_service import get_servers_for_app

router = APIRouter()

class SSHConnectRequests(BaseModel):
    app: str
    env: str
    user: str
    server_index: Optional[int] = 0

@router.post("/connect")
async def connect(request: SSHConnectRequests):
    servers = get_servers_for_app(request.app)
    if not servers:
        raise HTTPException(status_code=404, detail="App not found")
    
    env_servers = servers.get(request.env)
    if not env_servers:
        raise HTTPException(status_code=400, detail="Invalid environment")

    if not isinstance(env_servers, list):
        env_servers = [env_servers]

    if request.server_index >= len(env_servers) or request.server_index < 0:
        raise HTTPException(status_code=400, detail="Invalid server index")

    host = env_servers[request.server_index]
    result = connect_ssh(hostname=host, username=request.user)
    return result


# @router.get("/list-files")
# def list_files():
#     return list_remote_files()

# @router.get("/run-script")
# def run_script():
#     return run_remote_script()
