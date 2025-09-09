module.exports = {
  apps: [
    {
      name: 'artanis-auth',
      script: 'dist/server.js',
      cwd: '/var/apps/artanis',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        DATABASE_URL: 'file:./artanis.db',
        JWT_SECRET:
          process.env.JWT_SECRET ||
          'artanis-benloe-auth-jwt-2024-production-secure-key-v2',
        JWT_EXPIRES_IN: '30d',
        MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
        MAILGUN_DOMAIN: 'mail.benloe.com',
        MAILGUN_BASE_URL: 'https://api.mailgun.net',
        FROM_EMAIL: 'noreply@benloe.com',
        FRONTEND_URL: 'https://auth.benloe.com',
        DOMAIN: 'benloe.com',
        RATE_LIMIT_WINDOW_MS: '900000',
        RATE_LIMIT_MAX_REQUESTS: '10',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      watch: false,
      max_memory_restart: '1G',
      restart_delay: 4000,
    },
  ],
};
