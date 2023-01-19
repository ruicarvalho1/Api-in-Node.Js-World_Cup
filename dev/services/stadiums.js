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

  getNameById: async (id) => {
    const stadiums = await db
      .query(
        `
            SELECT 
              name 
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

    throw new Error(`Stadiums name with id='${id}' not found!`);
  },

  getCityById: async (id) => {
    const stadiums = await db
      .query(
        `
            SELECT 
               city
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

    throw new Error(`Stadiums city with id='${id}' not found!`);
  },

  updatebyIDStadiums: async (id, name, city) => {
    let stadiums;
    const fieldsToUpdate = {
      name: name,
      city: city,
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
      const query = `UPDATE stadiums SET ${updates.join(
        ", "
      )} WHERE id = $1  RETURNING *`;
      stadiums = await db.query(query, values);
      console.log(`Stadiums with id '${id} was updated successfully`);
    } catch (e) {
      throw new Error(e);
    }
    return stadiums.rows[0];
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

  insertstadiums: async ({ name = "", city = "" }) => {
    return db
      .query(
        `
            INSERT INTO
              stadiums(name,
                city)
            VALUES ($1, $2)
            RETURNING *
        `,
        [name, city]
      )
      .then((q) => q.rows);
  },
};
