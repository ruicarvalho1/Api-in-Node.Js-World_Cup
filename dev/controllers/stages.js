const services = require("../services");

module.exports = {
  getAll: async (req, res) => {
    return services.stages
      .getAll()
      .then((stages) => res.status(200).send(stages));
  },

  getById: async (req, res) => {
    try {
      let stages = await services.stages.getById(req.params.id);
      res.status(200).send(stages);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },
};
