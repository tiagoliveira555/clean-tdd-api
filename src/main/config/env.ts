export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://admin:docker@localhost:27017',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'PasswordSecret'
}
