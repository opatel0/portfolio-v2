const mongoose = require('mongoose')

const assistantSchema = new mongoose.Schema(
    {
        assistantId: String,
        assistantName: String,
        assistantInstructions: String,
        assistantFiles: [String]
    }
)

module.exports = mongoose.model('Assistant', assistantSchema)