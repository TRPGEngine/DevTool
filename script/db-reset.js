const server = require('./server');

console.log('重置应用服务...');
server.reset();
server.close();
console.log('重置应用服务完毕');
