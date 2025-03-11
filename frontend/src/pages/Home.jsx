import { useState, useEffect } from "react"
import api from "../api"
import Document from "../components/Documents";
import "../styles/Home.css"

function Home() {
    const [documents, setDocuments] = useState([]);
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getDocuments();
    }, [])

    const getDocuments = () => {
        api
            .get("/api/documents/")
            .then((res) => res.data)
            .then((data) => {setDocuments(data); console.log(data)})
            .catch((err) => alert(err));
    };

    const deleteDocument = (id) => {
        api.delete(`/api/documents/delete/${id}/`)
            .then((res) => {
            if (res.status === 204) alert("Document deleted!")
            else alert("Failed to delete document.")
            getDocuments();
            })
            .catch((error) => alert(error))
    }

    const createDocument = (e) => {
        e.preventDefault()
        api.post("/api/documents/", {content, title}).then((res) => {
            if(res.status === 201) alert("Document created!")
            else alert("Failed to make note.")
            getDocuments();
            }).catch((error) => alert(error))
    }

    return <div>
        <div>
            <h2>Documents</h2>
            {documents.map((document) => (
                <Document document={document} onDelete={deleteDocument} key={document.id} />
                ))}
        </div>
        <h2>Create a document</h2>
        <form onSubmit={createDocument}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
}

export default Home