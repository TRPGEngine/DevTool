// const at = require('trpg-actor-template');
const at = require('../../ActorTemplate/');
const socket = require('socket.io-client')('ws://127.0.0.1:23256');
// const socket = require('socket.io-client')('ws://trpgapi.moonrailgun.com:23256');
console.log('debug test start');

function request(eventName, data) {
  if(!data) {
    data = {}
  }
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

async function sendGroupInvite() {
  let admin2 = await request('player::login', {
    username: 'admin2',
    password: 'admin'
  });
  let admin2logout = await request('player::logout', {
    uuid: admin2.info.uuid,
    token: admin2.info.token
  });
  console.log('玩家2登出', admin2.info.uuid, admin2logout);
  let admin1 = await request('player::login', {
    username: 'admin',
    password: 'admin'
  });
  console.log('玩家登陆', admin1);
  let group = await request('group::create', {
    name: '测试⑨团'+Math.random(),
    avatar: '',
  });
  console.log('创建团', group);
  if(!group.result) {
    socket.close();
    return;
  }
  let groupUUID = group.group.uuid;
  let info = await request('group::getInfo', {
    uuid: groupUUID
  })
  console.log("获取团信息", info);

  await getGroupActors();// 获取团人物卡信息
  await addGroupActor(groupUUID, 'asddasds');// 获取团人物卡信息

  let invite = await request('group::sendGroupInvite', {
    group_uuid: groupUUID,
    to_uuid: admin2.info.uuid
  });
  console.log("发送邀请", invite);
  console.log("===================================");
  let admin1logout = await request('player::logout', {
    uuid: admin1.info.uuid,
    token: admin1.info.token
  });
  console.log('玩家1登出', admin1.info.uuid, admin1logout);
  // await refuseGroupInvite(invite.invite.uuid);
  await getGroupInvite();
  console.log("===================================");
  await agreeGroupInvite(invite.invite.uuid);
}

// sendGroupInvite();

async function getGroupInvite() {
  let admin2 = await request('player::login', {
    username: 'admin2',
    password: 'admin'
  });
  console.log('玩家2登陆', admin2);
  let refuse = await request('group::getGroupInvite');
  console.log("获取邀请列表", refuse);
}

async function refuseGroupInvite(uuid) {
  let admin2 = await request('player::login', {
    username: 'admin2',
    password: 'admin'
  });
  console.log('玩家2登陆', admin2);
  let refuse = await request('group::refuseGroupInvite', {
    uuid: uuid
  });
  console.log("拒绝邀请", uuid, refuse);
  socket.close();
}

async function agreeGroupInvite(uuid) {
  let admin2 = await request('player::login', {
    username: 'admin2',
    password: 'admin'
  });
  console.log('玩家2登陆', admin2);
  let refuse = await request('group::agreeGroupInvite', {
    uuid: uuid
  });
  console.log("同意邀请", uuid, refuse);
  socket.close();
}

async function getGroupActors() {
  console.log("===================================");
  let allGroup = await request('group::getGroupList');
  console.log('所有团', allGroup)
  if(allGroup.result) {
    let groupUUID = allGroup.groups[0].uuid;
    let actors = await request('group::getGroupActors', {groupUUID});
    console.log('团人物卡:', actors);
    console.log('团人物卡1关联人物:', actors.actors[0].actor);
  }
  console.log("===================================");
}

async function addGroupActor(groupUUID, actorUUID) {
  console.log("===================================");
  let actors = await request('actor::getActor');
  let groupActor = await request('group::addGroupActor', {groupUUID, actorUUID: actors.actors[0].uuid});
  console.log('增加团人物信息:', groupActor);
  console.log("===================================");
}

async function setPlayerSelectedGroupActor(groupActorUUID) {
  console.log("===================================");
  let admin1 = await request('player::login', {
    username: 'admin',
    password: 'admin'
  });
  let groups = await request('group::getGroupList', {});
  let res = await request('group::setPlayerSelectedGroupActor', {groupUUID: groups.groups[0].uuid, groupActorUUID});
  console.log('设置选择角色结果:', res);
  let res2 = await request('group::getPlayerSelectedGroupActor', {groupUUID: groups.groups[0].uuid, groupMemberUUID: admin1.info.uuid});
  console.log('获取选择角色结果:', res);
  socket.close();
  console.log("===================================");
}

setPlayerSelectedGroupActor("这是一个测试uuid");
