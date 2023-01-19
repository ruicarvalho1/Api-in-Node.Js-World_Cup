const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const bodyParser = require("body-parser");

const config = require("./config");
const swaggerConfig = {
  ...require("./doc/swagger.json"),
  host: `${config.hostname}:${config.port}`,
  basePath: `${config.baseUrl}`,
};

const apiUrl = require("./api-url");
const controllers = require("./controllers");
const swaggerDocument = require("./doc/swagger.json");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(bodyParser.urlencoded({ extended: false }));

[
  //get version
  { method: "get", url: "version", cb: controllers.version.get },

  //get all competitions && getbyId competitions || put->UpdateWithBodyID || delete-> deletebyIDCompetitions
  { method: "get", url: "competitions", cb: controllers.competitions.getAll },
  {
    method: "get",
    url: "competitions/:id",
    cb: controllers.competitions.getById,
  },
  {
    method: "put",
    url: "competitions/:id",
    cb: controllers.competitions.updatebyIDCompetitions,
  },

  {
    method: "delete",
    url: "competitions/:id",
    cb: controllers.competitions.deletebyIDCompetitions,
  },

  {
    method: "post",
    url: "competitions",
    cb: controllers.competitions.insertcompetitions,
  },
  //get all stadiums && getById Stadiums
  { method: "get", url: "stadiums", cb: controllers.stadiums.getAll },
  { method: "get", url: "stadiums/:id", cb: controllers.stadiums.getById },
  {
    method: "get",
    url: "stadiums/:id/name",
    cb: controllers.stadiums.getNameById,
  },

  {
    method: "put",
    url: "stadiums/:id",
    cb: controllers.stadiums.updatebyIDStadiums,
  },
  {
    method: "delete",
    url: "stadiums/:id",
    cb: controllers.stadiums.deletebyIDStadiums,
  },

  {
    method: "post",
    url: "stadiums",
    cb: controllers.stadiums.insertstadiums,
  },

  //get all teams && getById teams
  { method: "get", url: "teams", cb: controllers.teams.getAll },
  { method: "get", url: "teams/:id", cb: controllers.teams.getById },
  {
    method: "get",
    url: "teams/:id/initials",
    cb: controllers.teams.getInitialsById,
  },
  {
    method: "put",
    url: "teams/:id",
    cb: controllers.teams.updatebyIDTeams,
  },

  {
    method: "delete",
    url: "teams/:id",
    cb: controllers.teams.deletebyIDTeams,
  },

  {
    method: "post",
    url: "teams",
    cb: controllers.teams.insertteams,
  },
  //get all games && getById games
  { method: "get", url: "games", cb: controllers.games.getAll },
  { method: "get", url: "games/:id", cb: controllers.games.getById },

  {
    method: "put",
    url: "games/:id",
    cb: controllers.games.updatebyIDGames,
  },

  {
    method: "delete",
    url: "games/:id",
    cb: controllers.games.deletebyIDGames,
  },

  {
    method: "get",
    url: "games/:id/assistant_1",
    cb: controllers.games.getAssistant1ById,
  },
  {
    method: "post",
    url: "games",
    cb: controllers.games.insertgames,
  },
].forEach(({ method, url, cb }) => {
  app[method](apiUrl(url), cb);
});

app.listen(config.port, () => {
  console.log(`api is listening on port ${config.port}!`);
});
