require('dotenv/config')
const openailib = require("openai")
const openai = new openailib.OpenAI({apiKey: process.env.OPENAI_API_KEY})

module.exports = {
  createAssistant: async function () { 
    const assistant = await openai.beta.assistants.create({
      name: "Dating Coach",
      instructions: "You are a dating coach. Respond to people's dating problems with advice and compassion.",
      model: "gpt-4-turbo-preview"
    })
    return assistant
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