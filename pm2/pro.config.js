module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [{
    name: 'trpg-server',
    script: 'script/server.js',
    cwd: '/home/tech/opt/mrg/trpg/DevTool',
    env: {
      NODE_ENV: 'production',
      DEBUG: 'trpg:*',
      PLATFORM: 'web',
    },
  }]
};
