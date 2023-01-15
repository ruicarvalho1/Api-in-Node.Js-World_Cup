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
};
