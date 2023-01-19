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

  getInitialsById: async (req, res) => {
    try {
      let teams = await services.teams.getInitialsById(req.params.id);
      res.status(200).send(teams);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getInitialsById: async (req, res) => {
    try {
      let teams = await services.teams.getById(req.params.id);
      let initials = teams.initials;
      res.status(200).send({ initials });
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
  insertteams: async (req, res) => {
    try {
      const { name, initials } = req.body;

      res.status(201).send(
        await services.teams.insertteams({
          name,
          initials,
        })
      );
    } catch ({ message }) {
      res.status(400).send({ error: message });
    }
  },
};
