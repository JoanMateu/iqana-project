# Iqana — Coinbase Holdings Dashboard

This project delivers a small, end-to-end solution with a lightweight **backend API**, a minimal **React** frontend, and a **Coinbase connector**, all deployed on **AWS** via infrastructure as code. The architecture is simple, reliable, and resilient: it fetches and returns a user's Coinbase holdings and, if the upstream call fails, serves recent **cached data** to preserve responsiveness.

---

## Live Demo (no local setup required)

➡️ **Frontend:** https://d2u5ie2k7r9a0g.cloudfront.net/  
The app is already deployed to CloudFront + S3. You can use it directly without running anything locally.

**Backend base URL:** `https://tskgt62dgb.execute-api.eu-west-3.amazonaws.com`

---

## Quick Start (Frontend — optional local run)

**Prerequisites**
- Node.js 20+ and npm

**Run locally**
```bash
cd frontend
npm ci

# Point the app to the deployed backend
echo "VITE_BACKEND_URL=https://tskgt62dgb.execute-api.eu-west-3.amazonaws.com" > .env.development

npm run dev
# Open http://localhost:5173