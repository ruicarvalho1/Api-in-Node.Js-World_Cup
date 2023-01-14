exports.up = function (knex) {
  return knex.schema.createTable("stadiums", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("city").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("stadiums");
};
