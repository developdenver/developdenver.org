require("dotenv").load();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJwt = require("passport-jwt");
const JWTStrategy = passportJwt.Strategy;
const bcrypt = require("bcrypt");
const profile = require("../models/profile");

passport.use(new LocalStrategy({ session: false }, verifyLogin));
passport.use(new JWTStrategy({
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKeyProvider: secretProvider,
}, verifyAccess));

async function secretProvider(request, rawJwt, next){
    const user = await profile.find(request.query.user_id);
    next(user.secret_key);
}

async function verifyLogin(username, password, next){
    const user = await profile.query({ email: username })
    const isMatchingPassword = await bcrypt
        .compare(password, user.hashed_password);
    isMatchingPassword
        ? next(null, user)
        : next(new Error("Incorrect password"))
}

async function verifyAccess(payload, next){
    const user = await profile.find(payload.id)
    return payload.sub
        ? next(null, user, payload)
        : next();
}

module.exports = (app) => {
    app.use(passport.initialize())
    return app;
};
