import { Sequelize } from "sequelize";
import * as config from "../config";

import userModel from "./user";

const env = process.env.NODE_ENV || "development";

const dbConfig = config[env];
/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @type {Sequelize}
 */
let sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
  pool: {
    acquire: 600000,
  },
  dialectOptions: {
    // statement_timeout: 2000,
    // idle_in_transaction_timeout: 5000,
  },
});

const db = {
  sequelize,
  Sequelize,
  user: userModel(sequelize, Sequelize.DataTypes),
};

for (const model in db) {
  if (typeof db[model].associate === "function") db[model].associate(db);
}
export default db;
