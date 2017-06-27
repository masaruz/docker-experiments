const uuid = require('uuid/v4')
const mongoose = require('../models/Mongoose')
const Schema = mongoose.Schema
const SCHEMA = new Schema({ 
  name: String, 
  score: Number, 
  createdAt: {
    type: Date,
    expires: '604800s', // 1 week
    default: Date.now,
    index: true
  }
})
const TEMP_SCHEMA = new Schema({ 
  name: String, 
  score: Number, 
  createdAt: {
    type: Date,
    expires: '86400s', // 1 day
    default: Date.now,
    index: true
  }
})
module.exports = {
  /**
   * list all players in collection
   * @param {Express*} req 
   * @param {Express*} res 
   * @param {Express*} next 
   */
  list (req, res, next) {
    // param
    let table = req.params.table
    let limit = Number(req.query.limit) || 999
    // mongodb
    let schema = table === 'temps' ? TEMP_SCHEMA : SCHEMA // short or long ttl
    let Leaderboard = mongoose.tryModel(table, schema)
    let promise = Leaderboard
      .find()
      .sort({score: 1})
      .sort({createdAt: -1})
      .limit(limit)
    // await result
    promise
      .then(result => {
        res.send({
          data: result
        })
      })
      .catch(err => {
        res.send(err)
      })    
  },
  /**
   * save a player in collection
   * @param {Express*} req 
   * @param {Express*} res 
   * @param {Express*} next 
   */
  save (req, res, next) {
    // param
    let table = req.params.table
    let name = req.query.name || 'AAA'
    let score = Number(req.query.score) || 999999
    // mongodb
    let schema = table === 'temps' ? TEMP_SCHEMA : SCHEMA // short or long ttl
    let Leaderboard = mongoose.tryModel(table, schema)
    let lb = new Leaderboard({ 
      name: name, 
      score: score
    })
    const promise = lb.save()
    // await result
    promise
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send(err)
      })
  }
}