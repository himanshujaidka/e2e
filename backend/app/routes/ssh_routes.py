from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from app.services.ssh_service import current_connection, list_remote_files, run_remote_script, connect_ssh
from app.services.application_service import get_servers_for_app

router = APIRouter()

class SSHConnectRequests(BaseModel):
    app: str
    env: Optional[str] = ""
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

@router.post("/connect-jump")
async def connect_jump(request: SSHConnectRequests):
    servers = get_servers_for_app(request.app)
    if not servers:
        raise HTTPException(status_code=404, detail="App not found")
    
    if isinstance(servers, dict) and "server" in servers:
        host = servers["server"]
    else:
        if not isinstance(servers, list):
            servers = [servers]
        if request.server_index >= len(servers) or request.server_index < 0:
            raise HTTPException(status_code=400, detail="Invalid server index")
        host = servers[request.server_index]

    result = connect_ssh(hostname=host, username=request.user)
    return result

class ListFilesRequest(BaseModel):
    app: str
    env: Optional[str] = ""
    user: str
    server_index: Optional[int] = 0
    directory: Optional[str] = "/home/e2e/script"

@router.post("/list-files")
async def list_files(request: ListFilesRequest):
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
    files = list_remote_files(hostname=host, username=request.user, path=request.directory)
    return {"files": files}

class RunScriptRequest(BaseModel):
    app: str
    env: Optional[str] = ""
    user: str
    server_index: Optional[int] = 0
    script_path: str 

@router.post("/run-script")
async def run_script(request: RunScriptRequest):
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

    # Check if connected to the requested host
    if current_connection["hostname"] != host or current_connection["ssh_client"] is None:
        raise HTTPException(
            status_code=400,
            detail="You need to connect to the host first before running the script."
        )

    # Run the script on remote server
    result = run_remote_script(hostname=host, username=request.user, script_path=request.script_path)
    return result
# @router.get("/list-files")
# def list_files():
#     return list_remote_files()

# @router.get("/run-script")
# def run_script():
#     return run_remote_script()

# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel
# from typing import Optional
# from app.services.ssh_service import connect_ssh
# from app.services.application_service import get_servers_for_app
 
# router = APIRouter()
 
# class SSHConnectRequests(BaseModel):
#     app: str
#     env: str
#     user: str
#     server_index: Optional[int] = 0
 
# @router.post("/connect")
# async def connect(request: SSHConnectRequests):
#     try:
#         # Fetching servers for the provided app
#         servers = get_servers_for_app(request.app)
#         # If the app is not found, return a 404 error
#         if not servers:
#             raise HTTPException(status_code=404, detail="App not found")
#         # Fetching the environment servers for the app
#         env_servers = servers.get(request.env)
#         if not env_servers:
#             raise HTTPException(status_code=400, detail="Invalid environment")
#         # Ensuring that the list of servers is correctly handled
#         if not isinstance(env_servers, list):
#             env_servers = [env_servers]
 
#         # Validate server index is within the bounds of the available servers
#         if request.server_index >= len(env_servers) or request.server_index < 0:
#             raise HTTPException(status_code=400, detail="Invalid server index")
#         host = env_servers[request.server_index]
#         # Perform the SSH connection using the `connect_ssh` service
#         result = connect_ssh(hostname=host, username=request.user)
#         # Return the result from the SSH connection
#         return result
#     except Exception as e:
#         # Catch all exceptions and return an error
#         raise HTTPException(status_code=500, detail=str(e))
