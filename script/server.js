const app = require('../../Core/')();
const player = require('../../Player/');
const actor = require('../../Actor/');
const chat = require('../../Chat/');
const dice = require('../../Dice/');
const group = require('../../Group/');

app.load(player);
app.load(actor);
app.load(chat);
app.load(dice);
app.load(group);
app.run();
app.reset();
