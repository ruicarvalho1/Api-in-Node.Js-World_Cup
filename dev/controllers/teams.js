const services = require("../services");

module.exports = {
  getAll: async (req, res) => {
    return services.teams.getAll().then((teams) => res.status(200).send(teams));
  },

  getById: async (req, res) => {
    try {
      let teams = await services.teams.getById(req.params.id);
      res.status(200).send(teams);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getNameById: async (req, res) => {
    try {
      let teams = await services.teams.getNameById(req.params.id);
      res.status(200).send(teams);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getInitialsById: async (req, res) => {
    try {
      let teams = await services.teams.getInitialsById(req.params.id);
      res.status(200).send(teams);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  updatebyIDTeams: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const { initials } = req.body;

      const updatedteams = await services.teams.updatebyIDTeams(
        id,
        name,
        initials
      );
      res.status(200).json({
        success: true,
        data: updatedteams,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  deletebyIDTeams: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTeams = await services.teams.deletebyIDTeams(id);
      res.status(200).json({
        success: true,
        data: deleteTeams,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
