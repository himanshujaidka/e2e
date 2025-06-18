import paramiko
from app.utils.logger import logger
from app.config import SSH_KEY_PATH, DEFAULT_SSH_USER

# def connect_ssh():
#     ssh = paramiko.SSHClient()
#     ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#     ssh.connect(hostname=SSH_HOST, username=SSH_USER, key_filename=SSH_KEY_PATH)
#     return ssh

current_connection = {
    "hostname": None,
    "ssh_client": None  # optionally keep SSHClient instance if you want persistent connection
}

def connect_ssh(hostname:str, username: str =DEFAULT_SSH_USER ):
     # If already connected to a different host, close that connection first
    if current_connection["ssh_client"]:
        try:
            current_connection["ssh_client"].close()
        except:
            pass
        current_connection["ssh_client"] = None
        current_connection["hostname"] = None
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    logger.info(f"Connecting to {username}@{hostname}")
    try:
        ssh.connect(hostname=hostname, username=username, key_filename=SSH_KEY_PATH)
        logger.info(f"Connection successful to {hostname}")
        current_connection["ssh_client"] = ssh
        current_connection["hostname"] = hostname
        return {"success": True, "message": f"Connected to {hostname}"}
    except Exception as e:
        logger.error(f"SSH connection failed to {hostname}: {str(e)}")
        return None
    
def list_remote_files(hostname, username, path):
    ssh = connect_ssh(hostname, username)
    sftp = ssh.open_sftp()
    try:
        files = sftp.listdir(path)
    except IOError:
        files = []
    finally:
        sftp.close()
        ssh.close()
    return files

def run_remote_script(hostname, username=DEFAULT_SSH_USER, script_path="/home/e2e/script/test.py"):
    # Check if connected and to the same host
    if current_connection["hostname"] != hostname or current_connection["ssh"] is None:
        return {"error": "You need to connect to the host first before running the script."}

    ssh = current_connection["ssh"]

    try:
        stdin, stdout, stderr = ssh.exec_command(f"python {script_path}")
        out = stdout.read().decode()
        err = stderr.read().decode()
        return {"stdout": out, "stderr": err}
    except Exception as e:
        return {"error": str(e)}

# def list_remote_files():
#     ssh = None
#     try:
#         ssh = connect_ssh()
#         stdin, stdout, stderr = ssh.exec_command("ls -l")
#         output = stdout.read().decode().strip()
#         error = stderr.read().decode().strip()
#         return {"files": output if not error else error}
#     except Exception as e:
#         logger.error(f"SSH Error: {e}")
#         return {"error": str(e)}
#     finally:
#          if ssh is not None:
#             ssh.close()
#             logger.info("SSH connection closed.")

# def run_remote_script():
#     ssh = None
#     try:
#         ssh = connect_ssh()
#         stdin, stdout, stderr = ssh.exec_command("bash /home/e2e/scripts/test.py")
#         output = stdout.read().decode().strip()
#         error = stderr.read().decode().strip()
#         return {"output": output if not error else error}
#     except Exception as e:
#         logger.error(f"SSH Error: {e}")
#         return {"error": str(e)}
#     finally:
#         if ssh is not None:
#             ssh.close()
#             logger.info("SSH connection closed.")
