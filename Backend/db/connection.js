const oracledb = require('oracledb');

const dbConfig = {
  user: 'Boris',
  password: 'Ucenik01',
  connectString: 'localhost/XEPDB1'
};

async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}

module.exports = { getConnection };
