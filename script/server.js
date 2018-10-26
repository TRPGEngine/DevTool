// const app = require('../../Core/')();
const app = require('../../Core/')({storageUrl: 'mysql://root:@localhost/trpg?debug=true'});
const player = require('../../Player/');
const actor = require('../../Actor/');
const chat = require('../../Chat/');
const dice = require('../../Dice/');
const group = require('../../Group/');
const file = require('../../File/');
const dashboard = require('../../Dashboard/');
const note = require('../../Note/');
const help = require('../../Help/');
const qqconnect = require('../../QQConnect/');
const report = require('../../Report/');
const mail = require('../../Mail/');

app.set('webserviceHomepage', '/admin/home');
app.set('apihost', 'http://127.0.0.1:23256');
app.load(player);
app.load(file());
app.load(actor);
app.load(chat);
app.load(dice);
app.load(group);
app.load(dashboard);
app.load(note);
app.load(help);
app.load(qqconnect);
app.load(report);
app.load(mail);
app.run();
// app.reset();

module.exports = app;
