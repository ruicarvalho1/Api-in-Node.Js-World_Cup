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

  deletebyIDStages: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteStages = await services.stages.deletebyIDStages(id);
      res.status(200).json({
        success: true,
        data: deleteStages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
