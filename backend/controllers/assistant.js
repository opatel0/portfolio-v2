const express = require('express')
const router = express.Router()

const db = require('../models')

router.post('/test', async (req, res) => {
    await db.createAssistant()
        .then(async assistant => await db.createThread(assistant)
        .then(async thread => await db.addMessage(thread, req.body.query)
        .then(async message => await db.createRun(thread, assistant)
        .then(run => db.outputRunResult(run)
        .then(result => res.json({result: result}))
        ))))
})

module.exports = router