module.exports = {
  apps: [
    {
      name: 'escuela-rapa-nui',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/escuela-rapa-nui',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/escuela-rapa-nui-error.log',
      out_file: '/var/log/escuela-rapa-nui-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', '.next']
    }
  ]
};
