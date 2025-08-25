module.exports = {
  apps: [
    {
      name: 'gamenight-api',
      script: 'dist/server.js',
      cwd: '/var/apps/gamenight/api',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        JWT_SECRET: 'artanis-benloe-auth-jwt-2024-production-secure-key-v2',
        AUTH_SERVICE_URL: 'http://localhost:3002',
        AUTH_DATABASE_URL: 'file:../../../artanis/prisma/artanis.db',
        RATE_LIMIT_WINDOW_MS: '900000',
        RATE_LIMIT_MAX_REQUESTS: '100'
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      watch: false,
      max_memory_restart: '1G',
      restart_delay: 4000
    }
  ]
};