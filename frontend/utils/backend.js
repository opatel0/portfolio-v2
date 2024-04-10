import axios from 'axios'

export async function initAssistant(message) {
    const data = await axios.post('/api/assistant/test', message)
    return data.data
}