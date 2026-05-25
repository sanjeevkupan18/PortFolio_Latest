# Sanjeev Portfolio

Full-stack portfolio with a Vite/React frontend in `client/` and an Express/MongoDB backend in `server/`.

## Live Demo

https://sanjucodingportfolio.vercel.app/

## Stack

- Frontend: React 19, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT + bcryptjs

## Local Development

1. Install dependencies:

```bash
cd server && npm install
cd ../client && npm install
```

2. Configure env files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Start both apps:

```bash
cd server && npm run dev
cd ../client && npm run dev
```

Frontend runs on `http://localhost:3000` and the Vite dev server proxies `/api/*` to the backend.

## Environment Variables

### Backend (`server/.env`)

- `PORT`: Express port. Local default is `5001`.
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret used to sign admin tokens.
- `CLIENT_URL`: Main frontend origin, for example `https://your-site.vercel.app`.
- `CLIENT_URLS`: Optional comma-separated allowed origins for CORS.
- `ADMIN_USERNAME`: Admin account to seed on boot.
- `ADMIN_PASSWORD`: Password for the seeded admin account.
- `NODE_ENV`: Use `production` on Render.

### Frontend (`client/.env`)

- `VITE_API_BASE_URL`: Public backend URL, for example `https://your-api.onrender.com`.
- `VITE_API_PROXY_TARGET`: Local dev proxy target, usually `http://localhost:5001`.

## Deployment

### Backend on Render

The repo includes `render.yaml` for the API service.

Set these env vars in Render:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `CLIENT_URLS` if you want preview/custom domains too
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NODE_ENV=production`

Render settings:

- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`

### Frontend on Vercel

The repo includes `client/vercel.json` so React Router routes like `/projects` and `/admin/login` resolve correctly.

Set these Vercel settings:

- Root directory: `client`
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

Set this env var in Vercel:

- `VITE_API_BASE_URL=https://your-render-service.onrender.com`

## Admin Notes

- In production, set `ADMIN_USERNAME` and `ADMIN_PASSWORD` so Render seeds your real admin account on startup.
- The old login-time auto-creation flow was removed, which makes production deployment safer.

## Verification

Before deploying:

```bash
cd client && npm run build
node --check server/index.js
```
# PortFolio_Latest
