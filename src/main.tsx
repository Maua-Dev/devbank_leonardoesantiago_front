import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Conta from './Conta.tsx'
import Depositar from './Depositar.tsx'
import Sacar from './Sacar.tsx' // Importe o componente Sacar
import Transacoes from './Transacoes.tsx' // Importe o componente Transacoes
import {TransacoesProvider} from './TransacoesProvider.tsx' // Importe o TransacoesProvider
import { SaldoProvider } from './SaldoContex.tsx' 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SaldoProvider> {/* Envolva o Router com o Provider */}
        <TransacoesProvider> {/* Envolva o Router com o Provider */}
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/conta" element={<Conta />} />
            <Route path="/depositar" element={<Depositar />} />
            <Route path="/sacar" element={<Sacar />} />
            <Route path="/transacoes" element={<Transacoes />} />
          </Routes>
        </TransacoesProvider> {/* Feche a tag corretamente */}
      </SaldoProvider> {/* Feche a tag corretamente */}
    </BrowserRouter>
  </React.StrictMode>,
)
