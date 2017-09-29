// const at = require('trpg-actor-template');
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

async function main() {
  let admin = await request('player::login', {
    username: 'admin',
    password: 'admin'
  });
  console.log('玩家登陆',admin);

  let allTemplate = await request('actor::getTemplate', {});
  console.log('获取所有模板', allTemplate);
  if(allTemplate.templates.length === 0) {
    socket.close();
    return;
  }

  let findTemplate = await request('actor::findTemplate', {
    name: '刀'
  });
  console.log('查询模板:', findTemplate);
  // return;

  let createTemplate = await request('actor::createTemplate', {
    name: 'test',
    desc: 'testdesc',
    avatar: '',
    info: at.stringify(at.getInitTemplate('test'))
  });
  console.log('创建模板', createTemplate);

  let template = await request('actor::updateTemplate', {
    uuid: createTemplate.template.uuid,
    name: createTemplate.template.name + '改',
    desc: '这是一次模板内容修改测试'
  })
  console.log('修改后模板', template);

  let delTemplate = await request('actor::removeTemplate', {
    uuid: createTemplate.template.uuid,
  })
  console.log('删除模板', delTemplate);
  console.log('====================');

  let createActor = await request('actor::createActor', {
    name: '测试人物',
    desc: '测试数据',
    info: {
      力量: 100,
      敏捷: "20"
    },
    template_uuid: findTemplate.templates[0].uuid
  })
  console.log('创建人物', createActor);

  socket.close();
}

main();
