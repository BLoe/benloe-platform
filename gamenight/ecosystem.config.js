module.exports = {
  apps: [
    {
      name: 'gamenight-api',
      script: 'api/dist/server.js',
      cwd: '/var/apps/gamenight',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        JWT_SECRET: 'artanis-benloe-auth-jwt-2024-production-secure-key-v2',
        AUTH_SERVICE_URL: 'http://localhost:3002',
        AUTH_DATABASE_URL: 'file:../../artanis/prisma/artanis.db'
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './api/logs/err.log',
      out_file: './api/logs/out.log',
      log_file: './api/logs/combined.log',
      time: true,
      watch: false,
      max_memory_restart: '1G',
      restart_delay: 4000
    },
    {
      name: 'gamenight-frontend',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: '/var/apps/gamenight/dist',
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html'
      },
      instances: 1,
      exec_mode: 'fork',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/frontend-err.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true,
      watch: false,
      max_memory_restart: '500M'
    }
  ]
};