function getIPAdress(){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
    var iface = interfaces[devName];
    for(var i=0;i<iface.length;i++){
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [{
    name: 'trpg-client',
    script: './node_modules/.bin/webpack-dev-server',
    cwd: '../Client',
    args: '--hot --inline --progress --colors --port 8080 --host 0.0.0.0 --config ./config/webpack.config.js',
    max_restarts: 10,
    env: {
      NODE_ENV: 'development',
      PLATFORM: 'web',
    },
  }, {
    name: 'trpg-dev-server',
    script: 'script/server.js',
    cwd: '../DevTool',
    max_restarts: 10,
    env: {
      NODE_ENV: 'development',
      DEBUG: 'trpg:*',
      PLATFORM: 'web',
    }
//  }, {
//    name: 'trpg-app-packager',
//    script: './node_modules/react-native/local-cli/cli.js',
//    args: 'start --root ./src/app',
//    cwd: '../Client',
//    max_restarts: 10,
//    env: {
//      NODE_ENV: 'development',
//      PLATFORM: 'app',
//      TRPG_HOST: getIPAdress(),
//    }
  }, {
    name: 'trpgengine.github.io',
    script: 'http-server',
    args: '-p 8088',
    cwd: '../TRPGEngine.github.io',
    max_restarts: 10,
  }]
};
