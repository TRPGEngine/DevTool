module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [{
    name: 'trpg-client',
    script: './node_modules/.bin/webpack-dev-server',
    cwd: '/Users/moonrailgun/Develop/Inventory/TRPG/Client',
    args: '--hot --inline --progress --colors --port 8080 --host 0.0.0.0 --config ./config/webpack.config.js',
    env: {
      NODE_ENV: 'development',
      PLATFORM: 'web'
    },
  }, {
    name: 'trpg-dev-server',
    script: 'script/server.js',
    cwd: '/Users/moonrailgun/Develop/Inventory/TRPG/DevTool',
    env: {
      NODE_ENV: 'development',
      DEBUG: 'trpg:*',
      PLATFORM: 'web',
    }
  }]
};
