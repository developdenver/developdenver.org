module.exports = {
    deserializeUser,
    serializeUser,
    verify,
    buildStudentUrl,
    configurePassport,
    configureSessions,
    bypassAuth
};

function deserializeUser(email, next){
    // return require("node-fetch")(buildStudentUrl(email))
    //     .then(response => response.json())
    //     .then(({student}) => {
    //         next(null, student);
    //     }).catch(console.error)
}

function serializeUser(profile, next){
    // next(null, profile.user.email);
}

function verify(accessToken, refreshToken, profile, next){
    // console.log("verifying", profile.user.email, profile.user.id, profile);
    // Verify their information
    next(null, profile);
}

function buildStudentUrl(email){
    // return `${process.env.API_URL}/students/${encodeURIComponent(email)}`;
}

function configureSessions(app){
    // const session = require("express-session");
    // const KnexSessionStore = require("connect-session-knex")(session);
    // app.use(session({
    //     cookie: {
    //         // secure: process.env.NODE_ENV || false,
    //         // maxAge: process.env.NODE_ENV === "production" ? 1000 * 60 * 60 * 24 * 30 : null
    //     },
    //     resave: false,
    //     saveUninitialized: false,
    //     secret: process.env.COOKIE_SECRET,
    //     store: new KnexSessionStore({
    //         knex: require("../data/database_connection"),
    //         tablename: process.env.SESSION_TABLE_NAME
    //     })
    // }));

    // return app;
}

function configurePassport(){
    // const {Strategy} = require("passport-slack");
    // const passport = require("passport").use(new Strategy({
    //     clientID: process.env.SLACK_CLIENT_ID,
    //     clientSecret: process.env.SLACK_CLIENT_SECRET,
    //     callbackURL: process.env.OAUTH_CALLBACK
    // }, verify));

    // passport.serializeUser(serializeUser);
    // passport.deserializeUser(deserializeUser);

    // return passport;
}

function bypassAuth(request, response, next){
    // request.session.user = require("./fake-user");
    // request.user = request.session.user;
    // next();
}
