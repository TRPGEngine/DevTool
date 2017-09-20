// const at = require('trpg-actor-template');
const at = require('../../ActorTemplate/');
const socket = require('socket.io-client')('ws://127.0.0.1:23256');
console.log('debug test start');

socket.on('connect', function(){
  console.log('链接成功');
});

socket.on('disconnect', function(){
  console.log('断开链接');
});

// let template = createBasicTemplate();
// let data = template.getData();
// console.log(data);
// data['力量'] = 200;
// console.dir(template.setData(data), {depth: 5});
// socket.close();
// return;

socket.emit('player::login', {
  username: 'admin',
  password: 'admin'
}, function(data) {
  console.log('玩家登陆', data);

  var newTemplate = createBasicTemplate();

  socket.emit('actor::createTemplate', {
    name: '测试用14',
    desc: '测试用卡',
    avatar: '',
    info: at.stringify(newTemplate)
  }, function(data) {
    console.log('建卡结果');
    console.dir(data, {depth: 6});

    if(data.template) {
      console.log('输出模板info对象\n', at.parse(data.template.info));
    }

    socket.close();
  })
})

function createBasicTemplate() {
  let template = at.getInitTemplate("基础模板");
  template.insertCell(at.getInitCell("力量").setDefault(20));
  template.insertCell(at.getInitCell("敏捷").setDefault(20));
  template.insertCell(at.getInitCell("体质").setDefault(20));
  template.insertCell(at.getInitCell("智力").setDefault(20));
  template.insertCell(at.getInitCell("魅力").setDefault(20));

  let group = at.getInitGroup("拓展属性");
  template.insertGroup(group);
  group.insertCell(at.getInitCell("生命值").setFunc('expression').setType('number').setDefault('{{力量}}*2'));
  group.insertCell(at.getInitCell("魔法值").setFunc('expression').setType('number').setDefault('{{力量}}*2'));
  group.insertCell(at.getInitCell("耐力值").setFunc('expression').setType('number').setDefault('{{力量}}*2'));
  group.insertCell(at.getInitCell("攻击力").setFunc('expression').setType('number').setDefault('{{力量}}*2'));
  group.insertCell(at.getInitCell("闪避率").setFunc('expression').setType('number').setDefault('{{力量}}*2'));
  group.insertCell(at.getInitCell("幸运度").setFunc('expression').setType('number').setDefault('{{力量}}*2'));
  return template.eval();
}
