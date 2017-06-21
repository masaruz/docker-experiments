const mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.connect('mongodb://mongo:27017/leaderboard')
mongoose.tryModel = function (table, SCHEMA) {
  let Model = null
  // prevent overwriting once compiled
  try {
    Model = mongoose.model(table)
  } catch (err) {
    Model = mongoose.model(table, SCHEMA)
  }
  return Model
}
module.exports = mongoose