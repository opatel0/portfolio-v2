require('dotenv/config')
const fs = require("fs")
const openailib = require("openai")
const openai = new openailib.OpenAI({apiKey: process.env.OPENAI_API_KEY})

module.exports = {
    retrieveAssistant: async function(assistantId) {
        const assistant = await openai.beta.assistants.retrieve(assistantId)
        return assistant
    },

    createAssistant: async function (name, instructions) { 
        const assistant = await openai.beta.assistants.create({
            name: name,
            instructions: instructions,
            model: "gpt-4-turbo-preview",
            tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
            file_ids: []
        })
        return assistant
    },

    createFile: async function (dir) {
        const file = await openai.files.create({
            file: fs.createReadStream(dir),
            purpose: "assistants"
        })
        return file
    },

    createAssistantFile: async function (assistantId, fileId) {
        const assistantFile = await openai.beta.assistants.files.create(
            assistantId,
            {
                file_id: fileId
            }
        )
        return assistantFile
    },
  
  createThread: async function () {
    const thread = await openai.beta.threads.create()
    return thread
  },
  
  addMessage: async function (thread, messageContent) {
    const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: messageContent
      }
    )
    return message
  },
  
  createRun: async function (thread, assistant) {
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id
    })
    return run
  },
  
  outputRunResult: async function (run) {
    const messages = await openai.beta.threads.messages.list(run.thread_id)
    return messages.data[0].content[0].text.value
  }
}