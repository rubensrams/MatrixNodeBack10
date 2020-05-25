require("dotenv").config();

const PRODUCTION = require("./production");
const DEVELOPMENT = require("./development");
const { NODE_ENV } = process.env;

let currentEnv = DEVELOPMENT;

if (NODE_ENV === "prod") {
    currentEnv = PRODUCTION;
} else if (NODE_ENV === "dev") {
    currentEnv = DEVELOPMENT;
}

module.exports = currentEnv;