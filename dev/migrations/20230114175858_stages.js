exports.up = function (knex) {
  return knex.schema.createTable("stages", (table) => {
    table.increments("id").primary();
    table.text("stage");
    table.integer("id_competition").unsigned();
    table.foreign("id_competition").references("competitions.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("stages");
};
