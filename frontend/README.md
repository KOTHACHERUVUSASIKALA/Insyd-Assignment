# Frontend – Insyd Notification POC

React app with polling every 5s to fetch notifications.

## Run
```bash
npm install
echo "VITE_API_BASE=http://localhost:4000" > .env
npm run dev
```

## Usage
1. Set mock `sourceUserId` and `targetUserId` (ObjectIds as strings).
2. Trigger events and watch notifications appear.