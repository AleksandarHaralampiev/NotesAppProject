import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const NotePage = () => {
    let [note, setNote] = useState({})
    const { id } = useParams();
     
    useEffect(() => {
        getNote()
    }, [id])
    
    let getNote = async () => {
        let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`)
        let text = await response.text();
        console.log(text);
        try {
            let data = JSON.parse(text);
            setNote(data);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }

    return (
        <div>
            <h2>{note?.title}</h2>
            <p>{note?.body}</p>
        </div>
    )
}

export default NotePage