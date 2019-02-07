const NodeEnvironment = require('jest-environment-node');
const io = require('socket.io-client');
const config = require('../../config/trpg');
const trpgapp = require('../../server');
const socket = io('ws://127.0.0.1:23256', {
  autoConnect: false
});
const db = trpgapp.storage.db;

class TRPGEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log('Setup TRPG Test Environment');

    socket.open();

    // 声明沙盒内可用的全局变量
    this.global.trpgapp = trpgapp;
    this.global.db = db;
    this.global.testEvent = (eventFn, data) => {
      // 测试直接处理信息
      return new Promise(async function (resolve) {
        try {
          let cbres = {result: false}; // 默认返回信息
          let ret = await eventFn.call({
            app: trpgapp,
            socket: null
          }, data, (_res) => {
            cbres = _res; // 只收集cb返回的最后的响应
          }, db);

          if(ret !== undefined) {
            if(typeof ret === 'boolean') {
              resolve({result: ret});
            }else if(typeof ret === 'object' && typeof ret.result !== 'boolean') {
              resolve(Object.assign({result: true}, ret))
            }else {
              resolve(ret);
            }
          }else {
            // 从cb中取结果
            resolve(cbres);
          }
        }catch(e) {
          resolve({result: false, msg: e.toString()})
        }
      })
    }
    this.global.emitEvent = (eventName, data) => {
      // 发送信息测试
      return new Promise((resolve) => {
        socket.emit(eventName, data, function(_res) {
          resolve(_res);
        })
      })
    }

    await super.setup();
  }

  async teardown() {
    console.log('Teardown TRPG Test Environment');

    socket.close();
    trpgapp.close();

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = TRPGEnvironment;
