from fastapi import FastAPI
import requests
import paramiko
import logging

app = FastAPI()

# Set up logging for better output
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
logger = logging.getLogger(__name__)

url = 'https://stages.wob.vw.vwg'
cert_path = r'C:\Users\G0V3LHD.VW\Documents\E2E\dashboard\e2e\backend\systeme2e.pem'
username_pin = "11666292"
username="tuev029"

@app.get("/list-files")
def list_files():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        # Connect directly as 'e2e' using the private key
        logger.info("Attempting to connect to the server...")
        ssh.connect(
            hostname='lxf202p1269.wob.vw.vwg',
            username='e2e',
            key_filename=r'C:\Users\G0V3LHD.VW\Documents\E2E\dashboard\e2e\backend\private_key.pem',
            allow_agent=False,
            look_for_keys=False
        )

        logger.info("Connection successful!")

        # Example command to list files in the home directory
        command = "ls -l"
        stdin, stdout, stderr = ssh.exec_command(command)

        output = stdout.read().decode().strip()
        error = stderr.read().decode().strip()

        if error:
            logger.error(f"Error executing command: {error}")
            return {"error": error}

        # Format the output to look clean in console
        if output:
            logger.info("Command output:")
            files = output.splitlines()
            for file in files:
                logger.info(f"  {file}")  # Each file listed with indent
        else:
            logger.warning("No files found or output is empty.")

        return {"files": output}

    except Exception as e:
        logger.error(f"Connection failed: {str(e)}")
        return {"error": str(e)}

    finally:
        ssh.close()
        logger.info("SSH connection closed.")

@app.get("/access-remote")
def access_remote():
    try:
        logger.info("Connecting to the remote server with certificate...")

        # Send the GET request with the certificate, PIN, and basic auth
        response = requests.get(
            url,
            cert=cert_path,              # Use the certificate file without PIN
            auth=(username, username_pin),  # Basic Auth with username and PIN as password
            verify=False                   # Enable SSL verification
        )

        # Log the raw response text and content type
        logger.info(f"Response Status Code: {response.status_code}")
        logger.info(f"Response Content-Type: {response.headers.get('Content-Type')}")
        logger.info(f"Response Raw Body: {response.text}")

        if response.status_code == 200:
            try:
                response_json = response.json()  # Try to parse as JSON
                logger.info("Response JSON:")
                return {"status": "success", "data": response_json}
            except ValueError as e:
                # If the response is not valid JSON, log the raw body
                logger.error(f"Failed to parse response as JSON: {e}")
                return {"status": "error", "message": "Invalid JSON response", "raw_response": response.text}
        else:
            logger.error(f"Failed to connect: {response.status_code}")
            return {"status": "error", "message": response.text}

    except requests.exceptions.RequestException as e:
        logger.error(f"Error during the request: {e}")
        return {"status": "error", "message": str(e)}


# @app.post("/run-script/{script_name}")
# def run_script(script_name: str):
#     ssh = paramiko.SSHClient()
#     ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

#     try:
#         ssh.connect(
#             hostname='lxf202p1269.wob.vw.vwg',
#             username='g0v3lhd',
#             key_filename = r'C:\Users\G0V3LHD.VW\Documents\E2E\dashboard\backend\private_key.pm', # or use PKI setup
#             allow_agent=True
#         )

#         script_map = {
#             "cleanup": "/home/e2e/scripts/cleanup.py",
#             "etl": "/home/e2e/scripts/run_etl.py"
#         }

#         if script_name not in script_map:
#             return {"error": "Script not defined"}

#         # command = f"sudo -u e2e python3 {script_map[script_name]}"
#         command = f"sudo su - e2e "
#         stdin, stdout, stderr = ssh.exec_command(command)

#         output = stdout.read().decode()
#         error = stderr.read().decode()

#         return {"output": output, "error": error}

#     except Exception as e:
#         return {"error": str(e)}
#     finally:
#         ssh.close()
