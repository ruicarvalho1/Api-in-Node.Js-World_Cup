const db = require("../database");

module.exports = {
  getAllusers: async () => {
    return db
      .query(
        `
          SELECT
            *
          FROM 
            users
        `
      )
      .then((q) => q.rows);
  },

  getByIdusers: async (id) => {
    const users = await db
      .query(
        `
            SELECT 
              * 
            FROM
            users
            WHERE
              id = $1
        `,
        [id]
      )
      .then((q) => q.rows);

    if (users.length > 0) {
      return users[0];
    }

    throw new Error(`Users with id='${id}' not found!`);
  },

  updatebyIDUsers: async (id, username, password, role) => {
    let users;
    const fieldsToUpdate = {
      username: username,
      password: password,
      role: role,
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
      const query = `UPDATE users SET ${updates.join(
        ", "
      )} WHERE id = $1  RETURNING *`;
      users = await db.query(query, values);
      console.log(`Users with id '${id} was updated successfully`);
    } catch (e) {
      throw new Error(e);
    }
    return users.rows[0];
  },

  deletebyIDusers: async (id) => {
    let users;
    try {
      users = await db.query(
        `SELECT 
              * 
            FROM
            users
            WHERE
              id = $1`,
        [id]
      );
      if (users.rows.length > 0) {
        const deleteQuery = `DELETE FROM users WHERE id = $1`;
        await db.query(deleteQuery, [id]);
        console.log(`Users with id ${id} was deleted successfully`);
      } else {
        throw new Error(`Users with id='${id}' not found!`);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  insertusers: async ({ username = "", password = "", role = "" }) => {
    return db
      .query(
        `
            INSERT INTO
              users (username,
                password, role)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
        [username, password, role]
      )
      .then((q) => q.rows);
  },

  loginuser: async (name, password, id) => {
    let users;
    try {
      users = await db.query(
        ` 
            SELECT 
               * 
               FROM
              users
             WHERE
            name = $1
                AND
            password = $2 AND id = $3`,
        [name, password, id]
      );

      if (users.rows.length > 0) {
      } else {
      }
    } catch (error) {
      throw new Error(error);
    }
    return users.rows[0];
  },
};
