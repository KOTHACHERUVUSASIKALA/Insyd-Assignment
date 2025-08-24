import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import eventsRouter from './routes/events.js';
import notificationsRouter from './routes/notifications.js';
import { startProcessor } from './services/notificationProcessor.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', // ✅ frontend URL
  })
);

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'insyd-notification-backend' });
});

// Routes
app.use('/events', eventsRouter);
app.use('/notifications', notificationsRouter);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'insyd_poc' });
    console.log('✅ MongoDB connected');

    // Start background processor
    startProcessor();

    app.listen(PORT, () =>
      console.log(`🚀 Backend running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('❌ Startup error:', err);
    process.exit(1);
  }
}

main();
