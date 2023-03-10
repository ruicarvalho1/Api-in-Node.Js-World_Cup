exports.up = function (knex) {
  return knex.schema.createTable("competitions", (table) => {
    table.increments("id").primary();
    table.integer("year", 10).notNullable();
    table.string("stage");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("competitions");
};
