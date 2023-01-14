const knex = require("knex");
const knexfile = require("../sd/knexfile");

const db = knex(knexfile.development);

module.exports = db;
