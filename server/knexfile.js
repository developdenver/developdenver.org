require("dotenv").load();

module.exports = {
    development: {
        client: "pg",
        connection: `postgres:///${process.env.DEVELOPMENT_DATABASE_NAME}`
    },
    test: {
        client: "pg",
        connection: `postgres:///${process.env.TEST_DATABASE_NAME}`,
        seeds: {
            directory: "./tests/seeds"
        }
    }
};
