const path = require("path");
const envPath = path.join(__dirname, "..", "..", ".env");
require("dotenv").config({ path: envPath });
//
const env = (key, def) => {
    const { [key]: val } = process.env;
    return val !== undefined ? val : def;
};
//
const name = env("DATABASE_NAME", "praktyki"),
    user = env("DATABASE_USERNAME", "postgres"),
    password = env("DATABASE_PASSWORD", "zaq1"),
    dialect = env("DATABASE_DIALECT", "postgres"),
    host = env("DATABASE_HOST", "localhost"),
    port = env("DATABASE_PORT", 5432);
//
const sequelize_logging = env("SEQUELIZE_LOGGING", console.log) == "false" ? false : console.log;
//
module.exports = {
    database: {
        name,
        user,
        password,
        dialect,
        host,
        url: `${dialect}://${user}:${password}@${host}:${port}/${name}`,
        sequelize_logging,
    },
    tokens: {
        access_secret: env("ACCESS_TOKEN_SECRET", "@%@#$%#@$@#_access_secret"),
        refresh_secret: env("REFRESH_TOKEN_SECRET", "&$%^#$@#!^$_refresh_secret"),
        access_expiration: env("ACCESS_TOKEN_EXPIRATION", "15m"),
        refresh_expiration: env("REFRESH_TOKEN_EXPIRATION", "3h"),
    },
    APP_PORT: env("APP_PORT", 3000),
};
