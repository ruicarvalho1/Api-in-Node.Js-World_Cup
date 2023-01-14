const config = require("./config");
const Pool = require("pg-pool");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = new Pool({
  user: "ipvc",
  password: "admin",
  host: "127.0.0.1",
  port: 54320,
  database: config.pg.database,
  strictSSL: false,
  max: 1,
});
