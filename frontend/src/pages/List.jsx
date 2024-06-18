import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import { Link } from 'react-router-dom'

const NotesList = () => {

  let [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
  }
  , [])

  let getNotes = async () => { 
    let response = await fetch('http://127.0.0.1:8000/api/notes/')
    let data = await response.json()
    setNotes(data)

    console.log(data)
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <Link to={`/note/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesList