// const at = require('trpg-actor-template');
const at = require('../../ActorTemplate/');
const socket = require('socket.io-client')('ws://127.0.0.1:23256');
console.log('debug test start');

socket.on('connect', function(){
  console.log('链接成功');
});

socket.on('disconnect', function(){
  console.log('断开链接');
  socket.close();
});

socket.emit('player::login', {
  username: 'admin',
  password: 'admin'
}, function(data) {
  console.log('玩家登陆', data);

  socket.emit('group::create', {
    name: '测试1团',
    avatar: '',
  }, function(data) {
    console.log('创建团', data);

    if(!data.result) {
      socket.close();
      return;
    }

    let groupUUID = data.group.uuid;
    socket.emit('group::getInfo', {
      uuid: groupUUID
    }, function(data) {
      console.log("获取团信息", data);

      socket.emit('group::sendGroupInvite', {
        group_uuid: groupUUID,
        to_uuid: 'testuuidtestuuidtestuuid'
      }, function(data) {
        console.log("发送邀请", data);
        socket.close();
      })
    })
  })
})
