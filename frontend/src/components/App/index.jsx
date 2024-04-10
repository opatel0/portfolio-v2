import { initAssistant } from './../../../utils/backend'
import { useEffect, useState } from 'react'

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
            <h1>Ojas Patel's Portfolio</h1>
            <p>Welcome to Ojas Patel's portfolio website. I am his virtual assistant. You can explore the website as you traditionally would, or explore my modules below.</p>
            <p>Simon says: {testData.result ? testData.result : 'loading...'}</p>
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