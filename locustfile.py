            name="GET /api/sites/{siteId}",
            catch_response=True,
            timeout=self.timeout_duration
        ) as response:
            if response.status_code in [200]:
                log(f"Success: {url} returned {response.status_code}")
                response.success()
            else:
                error_msg = (
                    f"Failed GET site info. "
                    f"Status: {response.status_code}, "
                    f"URL: {url}, "
                    f"Headers: {headers}, "
                    f"Response: {response.text}"
                )
                log(error_msg)
                response.failure(error_msg)

    def on_stop(self):
        """
        Clean up any resources created during the test.
        No resources are created in this scenario, so nothing to clean up.
        """
        log("Test finished. No resources to clean up.")

# To run this script with Locust:
# locust -f locustfile.py -u 200 -r 20 --run-time 120s