const path = require("path");
require("dotenv").config({
  path: `${path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "local"}`)}`,
});

module.exports = {
  local: {
    use_env_variable: "DATABASE_URL",
  },
  development: {
    use_env_variable: "DATABASE_URL",
  },
  staging: {
    use_env_variable: "DATABASE_URL",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    logging: false,
  },
};
