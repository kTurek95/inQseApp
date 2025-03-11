import React from "react";
import "../styles/Document.css"

function Document({document, onDelete}) {
    const formattedDate = new Date(document.created_at).toLocaleDateString("en-US")
    return (
        <div className="document-container">
            <p className="document-title">{document.title}</p>
            <p className="document-content">{document.content}</p>
            <p className="document-delete">{ formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(document.id)}>
                Delete
            </button>
        </div>
    )
}

export default Document