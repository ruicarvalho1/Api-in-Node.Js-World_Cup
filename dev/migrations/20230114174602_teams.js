exports.up = function (knex) {
  return knex.schema.createTable("teams", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("initials", 3).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("teams");
};
