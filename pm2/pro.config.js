module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [{
    name: 'trpg-server',
    script: 'script/server-pro.js',
    cwd: '/home/moonrailgun/app/TRPG/DevTool',
    max_restarts: 10,
    env: {
      NODE_ENV: 'production',
      //NODE_ENV: 'development',
      PORT: '23256',
      VERBOSE: 'true',
      DEBUG: 'trpg:*',
    },
  }]
};
