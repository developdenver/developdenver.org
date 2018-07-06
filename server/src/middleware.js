const path = require("path");

module.exports = function(app){
    app.use(require("morgan")("dev"));
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(require("cookie-parser")());

    return app;
}
