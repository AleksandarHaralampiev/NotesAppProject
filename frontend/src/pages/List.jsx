import React, {useState, useEffect} from 'react'

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
      List
    </div>
  )
}

export default NotesList