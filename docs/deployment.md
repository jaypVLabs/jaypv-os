# Deployment Guide

This guide covers how to deploy your Wix Velo project using the Wix CLI, including environment setup, authentication, publishing, and rollback basics.

---

## Prerequisites
- Node.js (v14.8 or later)
- npm or yarn
- Wix CLI (`npm install -g @wix/cli`)
- Access to the connected Wix site
- Required environment variables in `.env` (see `.env.example`)

---

## 1. Authenticate with Wix CLI

```bash
wix login
```
- Follow the browser prompt to authenticate with your Wix account.
- Ensure you have access to the correct site.

---

## 2. Set Up Environment
- Copy `.env.example` to `.env` and fill in all required values.
- Never commit `.env` to the repository.

---

## 3. Local Build & Test

```bash
npm install
npm run lint
npm run dev
```
- Confirm the site runs locally and passes linting before publishing.

---

## 4. Publish to Wix

```bash
wix publish
```
- This will build and deploy your site to the connected Wix environment.
- Follow any prompts for environment or site selection.

---

## 5. Rollback / Revert
- If a deployment fails or needs to be reverted:
  1. Revert to a previous commit locally (`git checkout <commit>` or use your Git provider’s UI).
  2. Re-run `wix publish` to redeploy the previous state.
- There is no built-in “rollback” in Wix CLI; you must redeploy a previous commit.

---

## 6. Troubleshooting
- Ensure all environment variables are set.
- If authentication fails, re-run `wix login`.
- For build errors, check lint output and dependency versions.

---

## Notes
- Only publish from a clean, tested state.
- For production, double-check all secrets and API keys are correct in `.env`.
- For more, see [Wix CLI documentation](https://support.wix.com/en/article/velo-working-with-the-wix-cli-beta).
