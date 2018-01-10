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
    max_restarts: 10,
    env: {
      NODE_ENV: 'development',
      PLATFORM: 'web',
    },
  }, {
    name: 'trpg-dev-server',
    script: 'script/server.js',
    cwd: '/Users/moonrailgun/Develop/Inventory/TRPG/DevTool',
    max_restarts: 10,
    env: {
      NODE_ENV: 'development',
      DEBUG: 'trpg:*',
      PLATFORM: 'web',
    }
  }, {
    name: 'trpg-app-packager',
    script: './node_modules/react-native/local-cli/cli.js',
    args: 'start --root ./src/app',
    cwd: '/Users/moonrailgun/Develop/Inventory/TRPG/Client',
    max_restarts: 10,
    env: {
      NODE_ENV: 'development',
    }
  }]
};
