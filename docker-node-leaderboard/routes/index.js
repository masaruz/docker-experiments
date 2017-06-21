const express = require('express')
const router = express.Router()
const leaderboards = require('./leaderboards')

router.get('/leaderboards/:table', leaderboards.list)
router.get('/leaderboards/:table/save', leaderboards.save)

module.exports = router