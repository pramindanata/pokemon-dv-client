const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  env: {
    APP_URL: process.env.APP_URL,
    APP_PORT: process.env.APP_PORT,
    API_URL: process.env.API_URL,
  },
}
