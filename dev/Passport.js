const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "dfsafafsafsafasf",
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  // aqui você pode verificar o payload do token JWT
  // para verificar se o usuário está autenticado e qual é o seu nível de permissão
  // por exemplo, você pode buscar o usuário no banco de dados a partir do ID no payload
  // e verificar as permissões dele
  User.findById(payload.id)
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((error) => done(error, false));
});

passport.use(jwtStrategy);
