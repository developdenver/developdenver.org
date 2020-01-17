require("dotenv").load();

module.exports = {
    development: {
        client: "pg",
        connection: `postgres:///${process.env.DEVELOPMENT_DATABASE_NAME}`,
    },
    test: {
        client: "pg",
        connection: `${process.env.TEST_DATABASE_URL}`,
    },
    staging: {
        client: "pg",
        connection: `${process.env.STAGING_DATABASE_URL}?ssl=true`,
    },
    production: {
        client: "pg",
        connection: `${process.env.PRODUCTION_DATABASE_URL}?ssl=true`,
    },
};
