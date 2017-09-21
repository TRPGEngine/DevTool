const Benchmark = require('benchmark');
const socket = require('socket.io-client')('ws://127.0.0.1:23256');
let suite = new Benchmark.Suite;

function request(eventName, data) {
  return new Promise((resolve, reject) => {
    socket.emit(eventName, data, (data) => {
      resolve(data);
    })
  })
}
let login;
(async function() {
  login = await request('player::login', {
    username: 'admin2',
    password: 'admin'
  });


  suite.add('User#getInfo', async function() {
    let info = await request('player::getInfo', {
      type: 'self'
    })
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', async function() {
    // console.log('Fastest is ' + this.filter('fastest').map('name'));
    let admin2logout = await request('player::logout', {
      uuid: login.info.uuid,
      token: login.info.token
    });
    socket.close();
    console.log(admin2logout);
  })
  // run async
  // .run({ 'async': true });
  .run();
})()
