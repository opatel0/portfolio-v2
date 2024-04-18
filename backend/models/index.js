require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODBURI)
const db = mongoose.connection

db.on('connected', () => {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})

module.exports = {
  openai: require('./openai'),
  Assistant: require('./assistant')
}