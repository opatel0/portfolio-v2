const express = require('express')
const router = express.Router()

const db = require('../models')

router.post('/test', async (req, res) => {
    await db.Assistant.findOne({assistantName: "Suresh"})
        .then(async document => db.openai.retrieveAssistant(document.assistantId)
        .then(async assistant => await db.openai.createThread(assistant)
        .then(async thread => await db.openai.addMessage(thread, req.body.query)
        .then(async message => await db.openai.createRun(thread, assistant)
        .then(run => db.openai.outputRunResult(run)
        .then(result => res.json({result: result}))
        )))))
})

module.exports = router