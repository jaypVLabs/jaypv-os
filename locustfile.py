```python
# Python
import os
import uuid
import logging
from locust import HttpUser, task, between
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

# Enable/disable logging via environment variable
ENABLE_LOGGING = os.getenv('ENABLE_LOGGING', 'True') == 'True'
if ENABLE_LOGGING:
    logging.basicConfig(level=logging.INFO)
else:
    logging.basicConfig(level=logging.CRITICAL)

def log(msg):
    if ENABLE_LOGGING:
