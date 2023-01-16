const services = require("../services");

module.exports = {
  getAll: async (req, res) => {
    return services.games.getAll().then((games) => res.status(200).send(games));
  },

  getById: async (req, res) => {
    try {
      let games = await services.games.getById(req.params.id);
      res.status(200).send(games);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  deletebyIDGames: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteGames = await services.games.deletebyIDGames(id);
      res.status(200).json({
        success: true,
        data: deleteGames,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
