const server = require('./server');

(async function() {
  console.log('重置应用服务...');
  await server.reset({force: true});
  await server.close();
  console.log('重置应用服务完毕,等待应用自动退出或手动退出');
})()
