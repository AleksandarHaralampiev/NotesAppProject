import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NotesList from './pages/List'
import NotePage from './pages/NotePage'


import './App.css'

function App() {
  return (
    <Router>
      <div className="container">
        <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App