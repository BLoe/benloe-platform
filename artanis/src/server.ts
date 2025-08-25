import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';

import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { authenticate } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from benloe.com subdomains
      if (
        !origin ||
        origin.includes('.benloe.com') ||
        origin.includes('localhost')
      ) {
        callback(null, true);
      } else {
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

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);

// Frontend routes
app.get('/', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    res.redirect('/dashboard');
  } else {
    const redirectUrl = req.query.redirect as string;
    res.render('login', { redirectUrl });
  }
});

app.get('/dashboard', authenticate, (req, res) => {
  res.render('dashboard', { user: req.user });
});

app.get('/verify', (req, res) => {
  const { token, redirect } = req.query;
  res.render('verify', { token, redirect });
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
  console.log(`🔐 Artanis Auth Server running on port ${PORT}`);
});

export default app;
