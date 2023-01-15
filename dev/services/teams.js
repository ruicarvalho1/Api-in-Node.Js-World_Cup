const db = require("../database");

module.exports = {
  getAll: async () => {
    return db
      .query(
        `
          SELECT
            *
          FROM 
            teams
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
            teams
            WHERE
              id = $1
        `,
        [id]
      )
      .then((q) => q.rows);

    if (teams.length > 0) {
      return teams[0];
    }

    throw new Error(`Teams with id='${id}' not found!`);
  },
};
