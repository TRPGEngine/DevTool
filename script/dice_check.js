// 用于检测投骰概率分布

const _ = require('lodash');
const app = require('../../Core/')();
const dice = require('../../Dice/');

app.load(dice);
app.run();

let diceres = [];
for (var i = 0; i < 10000000; i++) {
  diceres.push(app.dice.rollPoint(100))
}
let res = _.groupBy(diceres, (n) => n);
res = _.map(res, (n, i) => i+":"+n.length);

console.log(res);

app.close();
