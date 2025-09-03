import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { exerciseRoutes } from './routes/exercises';
import { workoutRoutes } from './routes/workouts';
import { prRoutes } from './routes/prs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from benloe.com subdomains and main domain
      if (
        !origin ||
        origin === 'https://benloe.com' ||
        origin === 'http://benloe.com' ||
        origin === 'https://weights.benloe.com' ||
        origin === 'http://weights.benloe.com' ||
        origin.includes('.benloe.com') ||
        origin.includes('localhost')
      ) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/prs', prRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'weights-api' });
});

// Error handling
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error('Error:', err);
    res.status(500).json({
      error:
        process.env.NODE_ENV === 'production'
          ? 'Internal server error'
          : err.message,
    });
  }
);

app.listen(PORT, () => {
  console.log(`💪 Weights API running on port ${PORT}`);
});

export default app;