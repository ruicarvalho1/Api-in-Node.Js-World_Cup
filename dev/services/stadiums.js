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

  updatebyIDStadiums: async (id, name, city) => {
    let stadiums;
    try {
      stadiums = await db.query(
        `SELECT 
        * 
      FROM
      stadiums
      WHERE
        id = $1`,
        [id]
      );
      if (stadiums.rows.length > 0) {
        const updateQuery = `UPDATE stadiums SET name = $1, city= $2 WHERE id = $3`;
        await db.query(updateQuery, [name, city, id]);
        console.log(`Stadiums with id '${id} was updated successfully`);
        teams = await db.query(`SELECT * FROM stadiums WHERE id = $1`, [id]);
      } else {
        throw new Error(`Stadiums with id='${id}' not found!`);
      }
    } catch (e) {
      throw new Error(e);
    }
    return teams.rows[0];
  },
  deletebyIDStadiums: async (id) => {
    let stadiums;
    try {
      stadiums = await db.query(
        `SELECT 
              * 
            FROM
            stadiums
            WHERE
              id = $1`,
        [id]
      );
      if (stadiums.rows.length > 0) {
        const deleteQuery = `DELETE FROM stadiums WHERE id = $1`;
        await db.query(deleteQuery, [id]);
        console.log(`Stadiums with id ${id} was deleted successfully`);
      } else {
        throw new Error(`Stadiums with id='${id}' not found!`);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
};
