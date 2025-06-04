from fastapi import FastAPI
import paramiko

app = FastAPI()

@app.get("/list-files")
def list_files():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        ssh.connect(
            hostname='lxf202p1269.wob.vw.vwg',
            username='g0v3lhd',
            key_filename=r'C:\Users\G0V3LHD.VW\Documents\E2E\dashboard\backend\private_key.pem',
            allow_agent=True
        )

        command = "sudo su - e2e"
        stdin, stdout, stderr = ssh.exec_command(command)

        output = stdout.read().decode().strip()
        error = stderr.read().decode().strip()

        if error:
            return {"error": error}
        return {"files": output}

    except Exception as e:
        return {"error": str(e)}
    finally:
        ssh.close()

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
