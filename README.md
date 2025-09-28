
This project delivers a small, end-to-end solution with a lightweight **backend API**, a minimal **React** frontend, and a **Coinbase connector**, all deployed on **AWS** via infrastructure as code. The architecture is simple, reliable, and resilient: it fetches and returns a user's Coinbase holdings and, if the upstream call fails, serves recent **cached data** to preserve responsiveness.

---

## Quick start (Frontend)

**Prerequisites**
- Node.js 20+ and npm

**Run**
```bash
cd frontend
npm ci

echo "VITE_BACKEND_URL=https://tskgt62dgb.execute-api.eu-west-3.amazonaws.com" > .env.local
npm run dev