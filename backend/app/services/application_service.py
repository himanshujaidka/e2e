import json
from pathlib import Path
from functools import lru_cache

CONFIG_PATH = Path("data/server_config.json") 

@lru_cache(maxsize=1)
def load_applications():
    with open(CONFIG_PATH, "r") as f:
        return json.load(f)

def load_applications():
    """
    Load the entire servers configuration JSON and return as dict.
    """
    with open(CONFIG_PATH, "r") as f:
        return json.load(f)

def get_servers_for_app(app_name: str):
    """
    Given an app name, return its servers dictionary (environments and IPs).
    Returns None if app not found.
    """
    data = load_applications()
    return data.get(app_name)
