const server = require('./server');

console.log('同步数据库结构...');

(async () => {
  await server.dbSync();
  server.close();
  console.log('同步数据库结构完毕,等待应用自动退出或手动退出');
})()
