import { useState } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import NotesList from './pages/List'

import './App.css'

function App() {
  return (
    <div className="App">
      <Header />

      <NotesList />
      MyApp
    </div>
  );
}

export default App
