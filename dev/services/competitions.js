const db = require("../database");

module.exports = {
  getAll: async () => {
    return db
      .query(
        `
          SELECT
            *
          FROM 
            competitions
        `
      )
      .then((q) => q.rows);
  },

  getById: async (id) => {
    const competitions = await db
      .query(
        `
            SELECT 
              * 
            FROM
            competitions
            WHERE
              id = $1
        `,
        [id]
      )
      .then((q) => q.rows);

    if (competitions.length > 0) {
      return competitions[0];
    }

    throw new Error(`Competitions with id='${id}' not found!`);
  },

  updatebyIDCompetitions: async (id, year, stage) => {
    let competitions;
    const fieldsToUpdate = {
      year: year,
      stage: stage,
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
      const query = `UPDATE competitions SET ${updates.join(
        ", "
      )} WHERE id = $1  RETURNING *`;
      competitions = await db.query(query, values);
      console.log(`Competitions with id '${id} was updated successfully`);
    } catch (e) {
      throw new Error(e);
    }
    return competitions.rows[0];
  },

  deletebyIDCompetitions: async (id) => {
    let competition;
    try {
      competition = await db.query(
        `SELECT 
              * 
            FROM
              competitions
            WHERE
              id = $1`,
        [id]
      );
      if (competition.rows.length > 0) {
        const deleteQuery = `DELETE FROM competitions WHERE id = $1`;
        await db.query(deleteQuery, [id]);
        console.log(`Competition with id ${id} was deleted successfully`);
      } else {
        throw new Error(`Competition with id='${id}' not found!`);
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  insertcompetitions: async ({ year, stage = "" }) => {
    return db
      .query(
        `
            INSERT INTO
              competitions(year, stage)
            VALUES ($1, $2)
            RETURNING *
        `,
        [year, stage]
      )
      .then((q) => q.rows);
  },
};

/* getIngredients: async (id) => {
    return await db
      .query(
        `
            SELECT 
              i.name,
              i.type,
              ri.quantity
            FROM
              recipe_ingredients ri JOIN ingredients i ON
                ri.ingredient_id = i.id
            WHERE
              ri.recipe_id = $1
        `,
        [id]
      )
      .then((q) => q.rows);
  },

  getIngredientsByType: async (id, type) => {
    return await db
      .query(
        `
            SELECT 
              i.name,
              i.type,
              ri.quantity
            FROM
              recipe_ingredients ri JOIN ingredients i ON
                ri.ingredient_id = i.id
            WHERE
              ri.recipe_id = $1 AND 
              i.type = $2
        `,
        [id, type]
      )
      .then((q) => q.rows);
  },

  insert: async ({ name, imageUrl = "", originalUrl = "" }) => {
    return db
      .query(
        `
            INSERT INTO
              recipes(name, image_url, original_url)
            VALUES ($1, $2, $3)
            RETURNING *
        `,
        [name, imageUrl, originalUrl]
      )
      .then((q) => q.rows);
  }, */
