module.exports = function(app){
    [
        "profiles",
        "images",
        "auth",
    ].forEach(route => {
        app.use(`/${route}`, require(`./routes/${route}`)(app));
    });

    return app;
}

