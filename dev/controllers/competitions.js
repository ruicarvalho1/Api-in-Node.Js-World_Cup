const { competitions } = require(".");
const services = require("../services");

module.exports = {
  getAll: async (req, res) => {
    return services.competitions
      .getAll()
      .then((competitions) => res.status(200).send(competitions));
  },

  getById: async (req, res) => {
    try {
      let competition = await services.competitions.getById(req.params.id);
      res.status(200).send(competition);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  updatebyIDCompetitions: async (req, res) => {
    try {
      const { id } = req.params;
      const { year } = req.body;
      const updatedCompetition =
        await services.competitions.updatebyIDCompetitions(id, year);
      res.status(200).json({
        success: true,
        data: updatedCompetition,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deletebyIDCompetitions: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteCompetition =
        await services.competitions.deletebyIDCompetitions(id);
      res.status(200).json({
        success: true,
        data: deleteCompetition,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getIngredientsByRecipeId: async (req, res) => {
    try {
      res
        .status(200)
        .send(await services.competitions.getIngredients(req.params.id));
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getCondimentsByRecipeId: async (req, res) => {
    try {
      res
        .status(200)
        .send(
          await services.competitions.getIngredientsByType(
            req.params.id,
            "condiments"
          )
        );
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  insert: async (req, res) => {
    try {
      const { name, imageUrl, originalUrl } = req.body;

      res.status(201).send(
        await services.recipes.insert({
          name,
          imageUrl,
          originalUrl,
        })
      );
    } catch ({ message }) {
      res.status(400).send({ error: message });
    }
  },
};
