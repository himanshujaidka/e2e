import requests
from app.config import CERT_PATH, REMOTE_URL, REMOTE_USERNAME, REMOTE_PIN
from app.utils.logger import logger

def access_remote_server():
    try:
        response = requests.get(
            REMOTE_URL,
            cert=CERT_PATH,
            auth=(REMOTE_USERNAME, REMOTE_PIN),
            verify=False
        )
        if response.status_code == 200:
            try:
                return {"status": "success", "data": response.json()}
            except ValueError:
                return {"status": "error", "message": "Invalid JSON", "raw": response.text}
        return {"status": "error", "message": response.text}
    except Exception as e:
        logger.error(f"Request failed: {e}")
        return {"error": str(e)}
