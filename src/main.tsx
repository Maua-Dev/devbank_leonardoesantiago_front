import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Conta from './Conta.tsx'
import Depositar from './Depositar.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/depositar" element={<Depositar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
