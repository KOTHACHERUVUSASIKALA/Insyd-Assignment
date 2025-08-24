# PART 1 System Design Document (Access through below drive link)

https://docs.google.com/document/d/1Fg0Idv5-Sd25coSlv9p_a4DocGYEx5-m/edit?usp=sharing&ouid=103575408738644804513&rtpof=true&sd=true

# Insyd Notification POC

POC of event-driven notifications with NodeJS/Express, MongoDB, and a React frontend with polling. Built strictly per the reference document. No auth, no caching, minimal UI.

## Repos
- Backend: ./backend
- Frontend: ./frontend

## Local Run

### Backend
```bash
cd backend
cp .env.example .env
# edit .env with your MongoDB Atlas URI and client origin
npm install
npm run dev
```
Open http://localhost:4000 to check service is running.

### Frontend (Vite)
```bash
cd frontend
npm install
echo "VITE_API_BASE=http://localhost:4000" > .env
npm run dev
# open the shown localhost URL (usually http://localhost:5173)
```

## How to test
1. Paste two Mongo ObjectIds into the frontend fields (or create Users in DB and copy their _id values).
2. Click **Trigger Event** for like/comment/follow/post.
3. Within ~5s (polling), notifications appear.
4. Click **Mark as read** on any item.

