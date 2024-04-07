import React from 'react'
import ReactDOM from 'react-dom/client'
import { AdminProvider } from "./components/Context/AdminProvider"
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
    <App />
    </AdminProvider>
   
  </React.StrictMode>,
)
