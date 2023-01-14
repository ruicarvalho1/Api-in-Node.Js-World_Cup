exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.increments("id").primary();
    table.integer("goals_team_house");
    table.integer("goals_team_away");
    table.text("win_condition");
    table.integer("half_time_home_goals");
    table.integer("half_time_away_goals");
    table.text("referee");
    table.text("assistant_1");
    table.text("assistant_2");
    table.integer("num_spectators");
    table.integer("id_stadium");
    table.integer("id_team_home");
    table.integer("id_team_away");
    table.integer("id_stages");
    table.foreign("id_stadium").references("stadiums.id"); // references é o nome da tabela que queres referenciar e o id dessa tabela
    table.foreign("id_team_home").references("teams.id");
    table.foreign("id_team_away").references("teams.id");
    table.foreign("id_stages").references("stages.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("games");
};
