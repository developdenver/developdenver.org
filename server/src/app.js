require("dotenv").load();

module.exports = [
    "./middleware",
    "./auth/auth-middleware",
    "./router",
    "./error-handling"
].reduce((app, component) => require(component)(app), require("express")());
