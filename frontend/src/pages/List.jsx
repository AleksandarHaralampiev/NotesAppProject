import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'


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
      <ul style={{listStyleType: 'none', padding: 0}}>
        {notes.map((note, index) => (
          <li key={note.id} style={{marginBottom: '10px'}}>
            <ListItem key={index} note={note} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesList