const NodeEnvironment = require('jest-environment-node');
const config = require('../../config/trpg');
const trpgapp = require('../../server');

class TRPGEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log('Setup TRPG Test Environment');

    // 声明沙盒内可用的全局变量
    this.global.trpgapp = trpgapp;
    this.global.db = trpgapp.storage.db;

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
