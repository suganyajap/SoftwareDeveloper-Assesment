import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Screen1 from './Pages/Screen1';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApiDetail from './Pages/ApiDetail';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Screen1 />} />
        <Route path="/api-detail" element={<ApiDetail />} />
      </Routes>
    </Router>
  )
}

export default App
