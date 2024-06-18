import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Image from '../assets/left-arrow.png';


const NotePage = ( ) => {

    let [note, setNote] = useState({})
    const { id } = useParams();
     
    useEffect(() => {
        getNote()

    }, [id])
    
    let getNote = async () => {
        if (id === 'new') return;
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

    let createNote = async () => {
        console.log(note);
        await fetch('http://127.0.0.1:8000/api/notes/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: note.title,
                body: note.body
            }),
        })
    }

    let updateNote = async () => {
        console.log(note); 
        await fetch(`http://127.0.0.1:8000/api/notes/${id}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        })
    }

    let handleSubmit = async () => {
        console.log('NOTE:', note)
        if (id !== 'new' && note.body === '' && note.title === '') {
           await deleteNote()
        } else if (id !== 'new') {
            await updateNote()
        } else if (id === 'new' && note.body !== '' && note.title !== '') {
            await createNote()
        } else if (id === 'new' && note.body === '' && note.title === '') {
            await deleteNote()
        }
    
        window.location = '/';
    
    }




    let deleteNote = async () => {
        await fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        })
        window.location = '/';
    }


    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                        <img style={{ maxWidth: '30px' }} src={Image} alt='Back' onClick={handleSubmit}/>
                </h3>
                {id !== 'new' ? (
                    <button onClick={handleSubmit}>UPDATE</button>
                ) : (
                    <button onClick={handleSubmit}>SAVE</button>
                )
                }
                {id !== 'new' ? (
                    <button onClick={deleteNote}>DELETE</button>
                ) : (
                    <button onClick={deleteNote}>CANCEL</button>
                )
                }
            </div>
            <div className='note-header'>
                <input
                    type='text'
                    value={note?.title}
                    onChange={(e) => {setNote({...note, 'title': e.target.value})}}
                    className='note-input'
                    style={{ border: '2px solid lightblue', borderRadius: '5px', padding: '5px', backgroundColor: '#1f2124', color: ''}}
                />
            </div>
            <div className='note-body'>
                <textarea
                    onChange={(e) => {setNote({...note, 'body': e.target.value})}}
                    value={note?.body}
                    className='note-textarea'
                    style={{ border: '1px solid lightblue', borderRadius: '5px', padding: '5px' }}
                ></textarea>
            </div>
        </div>
    )
}

export default NotePage
