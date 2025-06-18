from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Hardcoded valid credentials
VALID_ID = "abc"
VALID_PASSWORD = "123"

# Request body model
class LoginData(BaseModel):
    id: str
    password: str

@router.post("/login")
async def login(data: LoginData):
    print(f"[LOGIN ATTEMPT] ID: '{data.id}', Password: '{data.password}'")  # Debug print

    # Strip any accidental whitespace
    incoming_id = data.id.strip()
    incoming_password = data.password.strip()

    if incoming_id == VALID_ID and incoming_password == VALID_PASSWORD:
        print("[LOGIN SUCCESS]")
        return {"success": True}
    else:
        print("[LOGIN FAILED] Credentials don't match.")
        raise HTTPException(status_code=401, detail="Invalid credentials")
