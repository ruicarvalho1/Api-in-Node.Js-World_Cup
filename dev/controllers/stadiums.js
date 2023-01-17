const services = require("../services");

module.exports = {
  getAll: async (req, res) => {
    return services.stadiums
      .getAll()
      .then((stadiums) => res.status(200).send(stadiums));
  },

  getById: async (req, res) => {
    try {
      let stadiums = await services.stadiums.getById(req.params.id);
      res.status(200).send(stadiums);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getCityById: async (req, res) => {
    try {
      let stadiums = await services.stadiums.getCityById(req.params.id);
      res.status(200).send(stadiums);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getNameById: async (req, res) => {
    try {
      let stadiums = await services.stadiums.getNameById(req.params.id);
      res.status(200).send(stadiums);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  updatebyIDStadiums: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const { city } = req.body;

      const updatedStadiums = await services.stadiums.updatebyIDStadiums(
        id,
        name,
        city
      );
      res.status(200).json({
        success: true,
        data: updatedStadiums,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deletebyIDStadiums: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteStadiums = await services.stadiums.deletebyIDStadiums(id);
      res.status(200).json({
        success: true,
        data: deleteStadiums,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
