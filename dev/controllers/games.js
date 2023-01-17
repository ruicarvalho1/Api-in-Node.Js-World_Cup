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

  getGoalsTeamHouseById: async (req, res) => {
    try {
      let games = await services.games.getGoalsTeamHouseById(req.params.id);
      res.status(200).send(games);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getGoalsTeamAwayById: async (req, res) => {
    try {
      let games = await services.games.getGoalsTeamAwayById(req.params.id);
      res.status(200).send(games);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getWinConditionById: async (req, res) => {
    try {
      let games = await services.games.getWinConditionById(req.params.id);
      res.status(200).send(games);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getHalfTimeHomeGoalsById: async (req, res) => {
    try {
      let games = await services.games.getHalfTimeHomeGoalsById(req.params.id);
      res.status(200).send(games);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getHalfTimeAwayGoalsById: async (req, res) => {
    try {
      let games = await services.games.getHalfTimeAwayGoalsById(req.params.id);
      res.status(200).send(games);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getRefereeById: async (req, res) => {
    try {
      let games = await services.games.getRefereeById(req.params.id);
      res.status(200).send(games);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getAssistant1Byid: async (req, res) => {
    try {
      let games = await services.games.getAssistant1Byid(req.params.id);
      res.status(200).send(games);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  getAssistant2ById: async (req, res) => {
    try {
      let games = await services.games.getAssistant2ById(req.params.id);
      res.status(200).send(games);
    } catch ({ message }) {
      res.status(404).send({ error: message });
    }
  },

  updatebyIDGames: async (req, res) => {
    try {
      const { id } = req.params;
      const { goals_team_house } = req.body;
      const { goals_team_away } = req.body;
      const { win_condition } = req.body;
      const { half_time_home_goals } = req.body;
      const { half_time_away_goals } = req.body;
      const { referee } = req.body;
      const { assistant_1 } = req.body;
      const { assistant_2 } = req.body;
      const { num_spectators } = req.body;

      const updatedGames = await services.games.updatebyIDGames(
        id,
        goals_team_house,
        goals_team_away,
        win_condition,
        half_time_home_goals,
        half_time_away_goals,
        referee,
        assistant_1,
        assistant_2,
        num_spectators
      );
      res.status(200).json({
        success: true,
        data: updatedGames,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
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
