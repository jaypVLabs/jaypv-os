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
        print(msg)
        logging.info(msg)

class ApiUser(HttpUser):
    wait_time = between(1, 3)
    # Set host as per Postman Collection (no trailing slash)
    host = "https://baseurl"  # <-- Replace with actual base URL if specified in Postman Collection
    timeout_duration = 90

    # Store IDs for use between requests
    site_id = None
    ui_version = None

    def on_start(self):
        # Initialize IDs from Postman Collection
        self.site_id = "46ed4c46-b292-491d-af5a-f40358a80a29"
        self.ui_version = "22"
        log(f"Initialized site_id: {self.site_id}, ui_version: {self.ui_version}")

    @task
    def run_scenario(self):
        """
        Runs the sequence of operations as defined in the Postman Collection.
        """
        # Since the Postman Collection only provides static values, we'll demonstrate a GET operation.
        # If there were more operations, each would be a separate function called here in order.
        self.get_site_info()

    def get_site_info(self):
        """
        Example GET operation using siteId and uiVersion from the Postman Collection.
        """
        url = f"/api/sites/{self.site_id}?uiVersion={self.ui_version}"
        headers = {
            "Accept": "application/json"
        }
        log(f"Requesting site info: {url} with headers {headers}")

        with self.client.get(
            url,
            headers=headers,