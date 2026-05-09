const url = "https://jaypv-os.jasmynp11.workers.dev/api/health";

const response = await fetch(url);

if (!response.ok) {
  console.error(`JPV-OS live verification failed: ${response.status}`);
  process.exit(1);
}

const data = await response.json();

if (data.status !== "ok" || data.system !== "JPV-OS") {
  console.error("JPV-OS live verification returned invalid payload:");
  console.error(data);
  process.exit(1);
}

console.log("JPV-OS live verification passed.");
console.log(data);
