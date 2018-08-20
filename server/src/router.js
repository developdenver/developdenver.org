module.exports = function(app){
    [
        "profiles",
        "auth",
        "payments",
    ].forEach(route => {
        app.use(`/${route}`, require(`./routes/${route}`)(app));
    });

    return app;
}

