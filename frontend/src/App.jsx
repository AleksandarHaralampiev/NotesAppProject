import { useState } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import NotesList from './pages/List'

import './App.css'

function App() {
  return (
    <div className="App">
      <NotesList />
    </div>
  );
}

export default App
