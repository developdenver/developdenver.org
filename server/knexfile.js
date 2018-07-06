require("dotenv").load();

module.exports = {
    development: {
        client: "pg",
        connection: `postgres://kylecoberly@localhost/${process.env.DEVELOPMENT_DATABASE_NAME}`
    }
};
