const NodeEnvironment = require('jest-environment-node');
const config = require('../../config/trpg');
const trpgapp = require('../../server');
const db = trpgapp.storage.db;

class TRPGEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log('Setup TRPG Test Environment');

    // 声明沙盒内可用的全局变量
    this.global.trpgapp = trpgapp;
    this.global.db = db;
    this.global.testEvent = (eventFn, data) => {
      // 测试发送socket时事件数据方法
      return new Promise(resolve, reject) {
        try {
          let ret = await eventFn(data, (_res) => {
            resolve(_res)
          }, db);

          if(ret !== undefined) {
            if(typeof ret === 'boolean') {
              resolve({result: ret});
            }else if(typeof ret === 'object' && typeof ret.result !== 'boolean') {
              resolve(Object.assign({result: true}, ret))
            }else {
              resolve(ret);
            }
          }
        }catch(e) {
          resolve({result: false, msg: e.toString()})
        }
      }
    }

    await super.setup();
  }

  async teardown() {
    console.log('Teardown TRPG Test Environment');

    trpgapp.close();

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = TRPGEnvironment;
