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
};
