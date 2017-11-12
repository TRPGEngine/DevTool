const at = require('../../ActorTemplate/');
const socket = require('socket.io-client')('ws://127.0.0.1:23256');
console.log('debug test start');

function request(eventName, data) {
  return new Promise((resolve, reject) => {
    socket.emit(eventName, data, (data) => {
      resolve(data);
    })
  })
}

socket.on('connect', function(){
  console.log('链接成功');
});

socket.on('disconnect', function(){
  console.log('断开链接');
  socket.close();
});

main();

async function main() {
  let admin = await request('player::login', {
    username: 'admin',
    password: 'admin'
  });
  console.log('玩家登陆',admin);

  let updateInfo = await request('player::updateInfo', {
    password: 'admin2'
  });
  console.log('更新信息',updateInfo);
  socket.close();
}
