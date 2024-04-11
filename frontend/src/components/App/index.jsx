import { initAssistant } from './../../../utils/backend'
import { useEffect, useState } from 'react'
import './styles.css'

export default function App() {
    const [formData, setFormData] = useState({query: ''})
    const [testData, setTestData] = useState({})

    useEffect(() => {
    }, [testData])

    function handleInputChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        initAssistant(formData)
            .then(assistant => setTestData(assistant))
    }

    return (
        <>
            <h1>Hi, I'm Suresh</h1>
            <p>Tell me about your dating problems.</p>
            <form onSubmit={handleSubmit}>
                <textarea 
                    id="query"
                    name="query"
                    placeholder="query"
                    value={formData.query}
                    onChange={handleInputChange}></textarea>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}