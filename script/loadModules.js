const player = require('../../Player');
const actor = require('../../Actor');
const chat = require('../../Chat');
const dice = require('../../Dice');
const group = require('../../Group');
const file = require('../../File');
const dashboard = require('../../Dashboard');
const note = require('../../Note');
const help = require('../../Help');
const qqconnect = require('../../QQConnect');
const report = require('../../Report');
const mail = require('../../Mail');

module.exports = function loadModules(app) {
  app.load(player);
  app.load(file());
  app.load(actor);
  app.load(chat);
  app.load(dice); // 尚未测试
  app.load(group);
  app.load(dashboard); // 尚未测试
  app.load(note); // 尚未测试
  app.load(help);
  app.load(qqconnect); // 尚未测试
  app.load(report); // 尚未测试
  app.load(mail); // 尚未测试

  return app;
}
