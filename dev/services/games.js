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
        let oldGoalsTeamHouse = games.rows[0].goals_team_house;
        let oldGoalsTeamAway = games.rows[0].goals_team_away;
        let oldWinCodition = games.rows[0].win_condition;
        let oldHalfTimeHomeGoals = games.rows[0].half_time_home_goals;
        let oldHalfTimeAwayGoals = games.rows[0].half_time_away_goals;
        let oldReferee = games.rows[0].referee;
        let oldAssistant1 = games.rows[0].assistant_1;
        let oldAssistant2 = games.rows[0].assistant_2;
        let oldNumEspectator = games.rows[0].num_spectators;

        if (goals_team_house != oldGoalsTeamHouse && goals_team_house != null) {
          const updateGoalsTeamHouse = `UPDATE games SET goals_team_house = $1  WHERE id = $2`;
          await db.query(updateGoalsTeamHouse, [goals_team_house, id]);
        } else if (
          goals_team_away != oldGoalsTeamAway &&
          goals_team_away != null
        ) {
          const updateGoalsTeamAway = `UPDATE games SET goals_team_away = $1  WHERE id = $2`;
          await db.query(updateGoalsTeamAway, [goals_team_away, id]);
        } else if (win_condition != oldWinCodition && win_condition != null) {
          const updateWinCondition = `UPDATE games SET win_condition = $1  WHERE id = $2`;

          await db.query(updateWinCondition, [win_condition, id]);
        } else if (
          half_time_home_goals != oldHalfTimeHomeGoals &&
          half_time_home_goals != null
        ) {
          const updateHalfTimeHomeGoals = `UPDATE games SET half_time_home_goals = $1  WHERE id = $2`;

          await db.query(updateHalfTimeHomeGoals, [half_time_home_goals, id]);
        } else if (
          half_time_away_goals != oldHalfTimeAwayGoals &&
          half_time_away_goals != null
        ) {
          const updateHalfTimeAwayGoals = `UPDATE games SET half_time_away_goals = $1  WHERE id = $2`;

          await db.query(updateHalfTimeAwayGoals, [half_time_away_goals, id]);
        } else if (referee != oldReferee && referee != null) {
          const updateReferee = `UPDATE games SET referee = $1  WHERE id = $2`;
          await db.query(updateReferee, [referee, id]);
        } else if (assistant_1 != oldAssistant1 && assistant_1 != null) {
          const updateAssistant1 = `UPDATE games SET assistant_1 = $1  WHERE id = $2`;
          await db.query(updateAssistant1, [assistant_1, id]);
        } else if (assistant_2 != oldAssistant2 && assistant_2 != null) {
          const updateAssistant2 = `UPDATE games SET assistant_2 = $1  WHERE id = $2`;
          await db.query(updateAssistant2, [assistant_2, id]);
        } else if (
          num_spectators != oldNumEspectator &&
          num_spectators != null
        ) {
          const updateNumEspectator = `UPDATE games SET num_espectator = $1  WHERE id = $2`;
          await db.query(updateNumEspectator, [num_spectators, id]);
        }

        console.log(`Games with id '${id} was updated successfully`);
        games = await db.query(`SELECT * FROM games WHERE id = $1`, [id]);
      } else {
        throw new Error(`Games with id='${id}' not found!`);
      }
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
