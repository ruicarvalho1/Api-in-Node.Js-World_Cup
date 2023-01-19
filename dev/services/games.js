const db = require("../database");

module.exports = {
  getAll: async () => {
    return db
      .query(
        `
          SELECT
            *
          FROM 
            games
        `
      )
      .then((q) => q.rows);
  },

  getById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              * 
            FROM
            games
            WHERE
              id = $1
        `,
        [id]
      )
      .then((q) => q.rows);

    if (games.length > 0) {
      return games[0];
    }

    throw new Error(`Games with id='${id}' not found!`);
  },

  geAssistant1yId: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              assistant_1
            FROM
            games
            WHERE
              id = $1
        `,
        [id]
      )
      .then((q) => q.rows);

    if (games.length > 0) {
      return games[0];
    }

    throw new Error(`Games with assistant one with id='${id}' not found!`);
  },

  updatebyIDGames: async (
    id,
    goals_team_house,
    goals_team_away,
    win_condition,
    half_time_home_goals,
    half_time_away_goals,
    referee,
    assistant_1,
    assistant_2,
    num_spectators
  ) => {
    let games;
    const fieldsToUpdate = {
      goals_team_house: goals_team_house,
      goals_team_away: goals_team_away,
      win_condition: win_condition,
      half_time_home_goals: half_time_home_goals,
      half_time_away_goals: half_time_away_goals,
      referee: referee,
      assistant_1: assistant_1,
      assistant_2: assistant_2,
      num_spectators: num_spectators,
    };

    try {
      let updates = [];
      let count = 2;
      let values = [id];

      for (let [key, value] of Object.entries(fieldsToUpdate)) {
        if (typeof value !== "undefined" && value !== null) {
          values.push(value);
          updates.push(`${key} = $${count++}`);
        }
      }
      if (updates.length == 0) {
        throw new Error("No values to update");
      }
      const query = `UPDATE games SET ${updates.join(
        ", "
      )} WHERE id = $1  RETURNING *`;
      games = await db.query(query, values);
      console.log(`Games with id '${id} was updated successfully`);
    } catch (e) {
      throw new Error(e);
    }
    return games.rows[0];
  },

  deletebyIDGames: async (id) => {
    let games;
    try {
      games = await db.query(
        `SELECT 
              * 
            FROM
            games
            WHERE
              id = $1`,
        [id]
      );
      if (games.rows.length > 0) {
        const deleteQuery = `DELETE FROM games WHERE id = $1`;
        await db.query(deleteQuery, [id]);
        console.log(`Games with id ${id} was deleted successfully`);
      } else {
        throw new Error(`Games with id='${id}' not found!`);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  insertgames: async ({
    goals_team_house,
    goals_team_away,
    win_condition = "",
    half_time_home_goals,
    half_time_away_goals,
    referee = "",
    assistant_1 = "",
    assistant_2 = "",
    num_spectators,
  }) => {
    return db
      .query(
        `
            INSERT INTO
              games(goals_team_house,
                goals_team_away,
                win_condition,
                half_time_home_goals,
                half_time_away_goals,
                referee,
                assistant_1,
                assistant_2,
                num_spectators)
            VALUES ($1, $2 ,$3, $4, $5, $6 ,$7, $8, $9)
            RETURNING *
        `,
        [
          goals_team_house,
          goals_team_away,
          win_condition,
          half_time_home_goals,
          half_time_away_goals,
          referee,
          assistant_1,
          assistant_2,
          num_spectators,
        ]
      )
      .then((q) => q.rows);
  },
};
