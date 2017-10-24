const app = require('../../Core/')();
// const app = require('../../Core/')({storageUrl: 'mysql://root:@localhost/trpg'});
const player = require('../../Player/');
const actor = require('../../Actor/');
const chat = require('../../Chat/');
const dice = require('../../Dice/');
const group = require('../../Group/');
const file = require('../../File/');

app.load(player);
app.load(file());
app.load(actor);
app.load(chat);
app.load(dice);
app.load(group);
app.run();
app.reset();
