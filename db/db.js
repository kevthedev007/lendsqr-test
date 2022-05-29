const knex = require("knex");
const config = require("../knexfile");
const environment = process.env.NODE_ENV || "development";
const envConfig = config[environment]

const db = knex(envConfig);
module.exports = db;

