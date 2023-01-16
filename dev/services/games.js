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
    const teams = await db
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

    if (teams.length > 0) {
      return teams[0];
    }

    throw new Error(`Games with id='${id}' not found!`);
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
