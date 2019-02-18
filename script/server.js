const config = require('config');
const loadModules = require('./loadModules');

// const app = require('../../Core/')();
const app = require('../../Core/')(config);

loadModules(app);

app.run();
// app.reset();

module.exports = app;
