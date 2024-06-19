import React from 'react'
import { Link } from 'react-router-dom'


let getTitle = ( note ) => {
  return note.title.length > 60 ? note.title.slice(0, 55) + '...' : note.title
}


let getTime = ( note ) => {
  return new Date(note.updated).toLocaleDateString()
}

let getBody = ( note ) => {
  let body = note.body.replaceAll('\n', ' ')
  return note.body.length > 45 ? note.body.slice(0, 45) + '...' : note.body
}


const ListItem = ({note}) => {
  return (
    <Link to={`/note/${note.id}`} className='note'>
      <div className='notes-list-item'>
        <h3>{getTitle(note)}</h3>
        
        <p><span>{getTime(note)}</span>{getBody(note)} </p>
        
      </div>
    </Link>

  )
}

export default ListItem