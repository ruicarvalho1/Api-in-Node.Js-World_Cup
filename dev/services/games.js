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

  getGoalsTeamHouseById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              goals_team_house
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

    throw new Error(`Games with goals team house with id='${id}' not found!`);
  },

  getGoalsTeamHouseById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              goals_team_house
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

    throw new Error(`Games with goals team house with id='${id}' not found!`);
  },

  getGoalsTeamAwayById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              goals_team_away
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

    throw new Error(`Games with goals team away with id='${id}' not found!`);
  },

  getWinConditionById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              win_conditions
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

    throw new Error(`Games with win condition with id='${id}' not found!`);
  },

  getHalfTimeHomeGoalsById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              half_time_home_goals
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

    throw new Error(
      `Games with half time home goals with id='${id}' not found!`
    );
  },

  getHalfTimeAwayGoalsById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              half_time_away_goals
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

    throw new Error(
      `Games with half time away goals with id='${id}' not found!`
    );
  },

  getRefereeById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              referee
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

    throw new Error(`Games with referee with id='${id}' not found!`);
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

  getAssistant2ById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              assistant_2
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

    throw new Error(`Games with assistant two with id='${id}' not found!`);
  },

  getNumEspectatorsById: async (id) => {
    const games = await db
      .query(
        `
            SELECT 
              num_espectators
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

    throw new Error(`Games with num espectators with id='${id}' not found!`);
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
};
