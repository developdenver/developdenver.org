module.exports = function(app){
    [
        "profiles",
        "auth",
        "payments",
        "talks",
        "votes",
        "events",
    ].forEach(route => {
        app.use(`/${route}`, require(`./routes/${route}`)(app));
    });

    return app;
}

