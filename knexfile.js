module.exports = {
  client: "postgresql",
  connection: {
    database: "Data_Base_SD",
    user: "ipvc",
    password: "admin",
    port: 54320,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
