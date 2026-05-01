# Cloudflare Worker Secret Management

To add secrets for your Worker deployment:

1. **Via Wrangler CLI (recommended for local dev):**
   - Run in terminal (from `jaypventuresllc.com`):
     ```sh
     wrangler secret put API_KEY
     # Repeat for each secret
     ```

2. **Via GitHub Actions (for CI/CD):**
   - Go to your GitHub repo → Settings → Secrets and variables → Actions → New repository secret.
   - Add each secret (e.g., `API_KEY`, `CLOUDFLARE_API_TOKEN`).
   - These will be available to your workflow as environment variables.

**Note:** Never commit real secrets to the repo. Use `.secrets.example` as a template only.
