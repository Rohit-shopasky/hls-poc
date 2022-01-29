module.exports = {
  apps: [
    {
      name: 'video-worker',
      script: './dist/workers/uploadVideoWorker/worker.main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'staging',
        max_memory_restart: '256M',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
