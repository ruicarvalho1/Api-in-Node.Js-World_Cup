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
};
