/* eslint-disable linebreak-style */
module.exports = {
  apps: [
    {
      name: "marketsn-tezos-server",
      instances: 1,
      min_uptime: "5m",
      max_restarts: 5,
      restart_delay: 3000,
      exec_mode: "cluster",
      script: "./src/index.js",
      autorestart: true,
      watch: false,
      log_file: "./logs/server.log",
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      watch_options: {
        // usePolling: true,
      },
    },
  ],
};
