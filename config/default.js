module.exports = {
  db: {
    database: 'trpg',
    username: 'root',
    password: '',
    options: {
      localhost: 'localhost',
      dialect: 'mysql',
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    }
  },
  webserviceHomepage: '/admin/home',
  apihost: 'http://127.0.0.1:23256'
}
