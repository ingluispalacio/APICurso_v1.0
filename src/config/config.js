require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
}

const configAuth = {
  secret: process.env.AUTH_SECRET || 'secret',
  expires: process.env.AUTH_EXPIRES || '1h',
  rounds:  process.env.AUTH_ROUNDS || 10
}

const passwordDesafultUser = {
  password: process.env.PASSWORD_DEFAULT_USER || '123',
}

module.exports = { config, configAuth, passwordDesafultUser };