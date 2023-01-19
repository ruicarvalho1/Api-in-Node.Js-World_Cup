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

  getNameById: async (id) => {
    const teams = await db
      .query(
        `
            SELECT 
              name 
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

    throw new Error(`Teams name with id='${id}' not found!`);
  },

  getInitialsById: async (id) => {
    const teams = await db
      .query(
        `
            SELECT 
              initials 
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

    throw new Error(`Teams initials with id='${id}' not found!`);
  },

  updatebyIDTeams: async (id, name, initials) => {
    let teams;
    const fieldsToUpdate = {
      name: name,
      initials: initials,
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
      const query = `UPDATE teams SET ${updates.join(
        ", "
      )} WHERE id = $1  RETURNING *`;
      teams = await db.query(query, values);
      console.log(`Teams with id '${id} was updated successfully`);
    } catch (e) {
      throw new Error(e);
    }
    return teams.rows[0];
  },

  deletebyIDTeams: async (id) => {
    let teams;
    try {
      teams = await db.query(
        `SELECT 
              * 
            FROM
            teams
            WHERE
              id = $1`,
        [id]
      );
      if (teams.rows.length > 0) {
        const deleteQuery = `DELETE FROM teams WHERE id = $1`;
        await db.query(deleteQuery, [id]);
        console.log(`Teams with id ${id} was deleted successfully`);
      } else {
        throw new Error(`Teams with id='${id}' not found!`);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  insertteams: async ({ name = "", initials = "" }) => {
    return db
      .query(
        `
            INSERT INTO
              teams(name,
                initials)
            VALUES ($1, $2)
            RETURNING *
        `,
        [name, initials]
      )
      .then((q) => q.rows);
  },
};
