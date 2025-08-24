# Backend – Insyd Notification POC

## Endpoints
- POST `/events` – create event → queued → processed to notification
- GET `/notifications/:userId` – list notifications (params: `status`, `after`)
- POST `/notifications` – create notification (testing)
- PATCH `/notifications/:id/read` – mark notification as read

## Run
```bash
npm install
cp .env.example .env # set MONGODB_URI, CLIENT_ORIGIN
npm run dev
```

## Notes
- In-memory queue (POC only). No auth. No caching.