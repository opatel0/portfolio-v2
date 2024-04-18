const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', async (req, res) => {
    const resume = "/Users/ojaspatel/Documents/Github/suresh/public/resume.pdf"
    const name = "Suresh"
    const instructions = "You are the assistant of Ojas Patel. Users will provide input and you are to respond with honest evaluations of the input based on Ojas Patel's resume from your assistant files."

    await db.openai.createAssistant(name, instructions)
        .then(async assistant => await db.openai.createFile(resume)
        .then(async file => await db.openai.createAssistantFile(assistant.id, file.id)
        .then(file => db.Assistant.create({
            assistantId: assistant.id,
            assistantName: name,
            assistantInstructions: instructions,
            assistantFiles: [file.id]
        })
        .then(suresh => res.json(suresh))
        )))
})

module.exports = router