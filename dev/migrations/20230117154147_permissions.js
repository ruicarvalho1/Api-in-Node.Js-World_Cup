exports.up = function (knex) {
  return knex.schema.createTable("permissions", (table) => {
    table.increments("id_permission").primary();
    table.string("type_permission").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("permissions");
};
