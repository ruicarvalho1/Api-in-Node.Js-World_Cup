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
    url: "competitions/:id/stages",
    cb: controllers.competitions.updatebyIDCompetitions,
  },

  {
    method: "delete",
    url: "competitions/:id",
    cb: controllers.competitions.deletebyIDCompetitions,
  },

  //get all stadiums && getById Stadiums
  { method: "get", url: "stadiums", cb: controllers.stadiums.getAll },
  { method: "get", url: "stadiums/:id", cb: controllers.stadiums.getById },
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

  //get all teams && getById teams
  { method: "get", url: "teams", cb: controllers.teams.getAll },
  { method: "get", url: "teams/:id", cb: controllers.teams.getById },
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

  //get all games && getById games
  { method: "get", url: "games", cb: controllers.games.getAll },
  { method: "get", url: "games/:id", cb: controllers.games.getById },

  {
    method: "delete",
    url: "games/:id",
    cb: controllers.games.deletebyIDGames,
  },

  //get all stages && getById stages
  { method: "get", url: "stages", cb: controllers.stages.getAll },
  { method: "get", url: "stages/:id", cb: controllers.stages.getById },

  {
    method: "delete",
    url: "stages/:id",
    cb: controllers.stages.deletebyIDStages,
  },

  //{ method: "post", url: "recipes", cb: controllers.competitions.insert },

  /*
  {
    method: "get",
    url: "competitions/:id",
    cb: controllers.competitions.getById,
  },
  {
    method: "get",
    url: "recipes/:id/ingredients",
    cb: controllers.recipes.getIngredientsByRecipeId,
  },
  {
    method: "get",
    url: "recipes/:id/ingredients/condiments",
    cb: controllers.recipes.getCondimentsByRecipeId,
  },
  */
].forEach(({ method, url, cb }) => {
  app[method](apiUrl(url), cb);
});

app.listen(config.port, () => {
  console.log(`api is listening on port ${config.port}!`);
});
