# test_psutil.py
import psutil

print("CPU Usage:", psutil.cpu_percent(interval=1))
print("Memory Info:", psutil.virtual_memory())
