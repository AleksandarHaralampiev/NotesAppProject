import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Image from '../assets/left-arrow.png';


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
        <div className='note'>
            <div className='note-header'>
                <h3><Link to='/'>
                    <img style={{ maxWidth: '30px' }} src={Image} alt='Back' />
                </Link></h3>
            </div>
            <div className='note-header'>
                <h3>{note?.title}</h3>
            </div>
            <div className='note-body'>
                <textarea defaultValue={note?.body}></textarea>
            </div>
        </div>
    )
}

export default NotePage