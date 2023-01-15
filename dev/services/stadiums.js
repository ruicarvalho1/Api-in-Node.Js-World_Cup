const db = require("../database");

module.exports = {
  getAll: async () => {
    return db
      .query(
        `
          SELECT
            *
          FROM 
            stadiums
        `
      )
      .then((q) => q.rows);
  },

  getById: async (id) => {
    const stadiums = await db
      .query(
        `
            SELECT 
              * 
            FROM
            stadiums
            WHERE
              id = $1
        `,
        [id]
      )
      .then((q) => q.rows);

    if (stadiums.length > 0) {
      return stadiums[0];
    }

    throw new Error(`Stadiums with id='${id}' not found!`);
  },
};
