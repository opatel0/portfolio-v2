import { initAssistant } from './../../../utils/backend'
import { useEffect, useState } from 'react'
import './styles.css'

export default function App() {
    const [formData, setFormData] = useState({query: ''})
    const [counter, setCounter] = useState(0)
    const [loading, setLoading] = useState(false)
    const [testData, setTestData] = useState([])

    useEffect(() => {
        setLoading(false)
    }, [testData])

    function handleInputChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)
        let messages = []
        for (let message of testData) {
            messages.push(message)
        }
        messages.push(<p key={'suresh-'+counter}>{formData.query}</p>)
        await initAssistant(formData)
            .then(async assistant => {
                messages.push(<p key={'user-'+counter}>{assistant.result}</p>)
                setCounter(counter+1)
                setTestData(messages)
            })
    }

    return (
        <div key='1'>
            <h1>Hi, I'm Suresh</h1>
            <p>Ask me anything related to Ojas Patel's qualifications for your open role.</p>
            {loading ? 'loading...' : testData}
            <form onSubmit={handleSubmit}>
                <textarea 
                    id="query"
                    name="query"
                    placeholder="query"
                    value={formData.query}
                    onChange={handleInputChange}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}