const {
    configurePassport,
    configureSessions,
    bypassAuth
} = require("./auth");

module.exports = function(app){
    // const passport = configurePassport();
    // app = configureSessions(app);

    // app.use(passport.initialize());
    // app.use(passport.session());
    // app.set("passport", passport);

    // if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"){
    //     app.use(bypassAuth);
    // }

    return app;
}
