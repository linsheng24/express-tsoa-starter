module.exports = {
  apps: [
    {
      name: 'primary',
      script: './dist/server.js',
      instances: 1,
      exec_mode: 'cluster',
    },
    {
      name: 'replica',
      script: './dist/server.js',
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
};
