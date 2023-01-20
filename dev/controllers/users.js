const services = require("../services");

module.exports = {
  getAllusers: async (req, res) => {
    return services.users
      .getAllusers()
      .then((users) => res.status(200).send(users));
  },

  getByIdusers: async (req, res) => {
    try {
      let users = await services.users.getByIdusers(req.params.id);
      res.status(200).send(users);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  updatebyIDUsers: async (req, res) => {
    try {
      const { id } = req.params;
      const { username } = req.body;
      const { password } = req.body;
      const { role } = req.body;

      const updatedUsers = await services.users.updatebyIDUsers(
        id,
        username,
        password,
        role
      );
      res.status(200).json({
        success: true,
        data: updatedUsers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deletebyIDusers: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteUsers = await services.users.deletebyIDusers(id);
      res.status(200).json({
        success: true,
        data: deleteUsers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  insertusers: async (req, res) => {
    try {
      const { username, password, role } = req.body;

      res.status(201).send(
        await services.users.insertusers({
          username,
          password,
          role,
        })
      );
    } catch ({ message }) {
      res.status(400).send({ error: message });
    }
  },

  loginuser: async (req, res) => {
    try {
      let { name, password } = req.body;
      let user = await services.users.loginuser(name, password);
      if (user) {
        res.setHeader(user.role);
        res.status(200).send({ message: "Successfully logged in" });
      } else {
        res.status(401).send({ error: "You are not Logged, Unauthorized" });
      }
    } catch (error) {
      res.status(500).send({ error: "You are not Logged, Unauthorized" });
    }
  },
};
