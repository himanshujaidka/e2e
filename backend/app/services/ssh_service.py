import paramiko
from app.utils.logger import logger
from app.config import SSH_KEY_PATH, DEFAULT_SSH_USER

# def connect_ssh():
#     ssh = paramiko.SSHClient()
#     ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#     ssh.connect(hostname=SSH_HOST, username=SSH_USER, key_filename=SSH_KEY_PATH)
#     return ssh

def connect_ssh(hostname:str, username: str =DEFAULT_SSH_USER ):
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        logger.info(f"Connecting to {username}@{hostname}")
        ssh.connect(hostname=hostname, username=username, key_filename=SSH_KEY_PATH)
        logger.info(f"Connection successful to {hostname}")
        return {"status": "success", "message": f"Connected to {hostname}"}
    except Exception as e:
        logger.error(f"SSH connection failed to {hostname}: {str(e)}")
        return {"status": "error", "message": str(e)}

def list_remote_files():
    ssh = None
    try:
        ssh = connect_ssh()
        stdin, stdout, stderr = ssh.exec_command("ls -l")
        output = stdout.read().decode().strip()
        error = stderr.read().decode().strip()
        return {"files": output if not error else error}
    except Exception as e:
        logger.error(f"SSH Error: {e}")
        return {"error": str(e)}
    finally:
         if ssh is not None:
            ssh.close()
            logger.info("SSH connection closed.")

def run_remote_script():
    ssh = None
    try:
        ssh = connect_ssh()
        stdin, stdout, stderr = ssh.exec_command("bash /home/e2e/scripts/test.py")
        output = stdout.read().decode().strip()
        error = stderr.read().decode().strip()
        return {"output": output if not error else error}
    except Exception as e:
        logger.error(f"SSH Error: {e}")
        return {"error": str(e)}
    finally:
        if ssh is not None:
            ssh.close()
            logger.info("SSH connection closed.")
