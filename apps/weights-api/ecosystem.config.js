module.exports = {
  apps: [
    {
      name: 'weights-api',
      script: './dist/server.js',
      cwd: '/var/apps/weights-api',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
};
