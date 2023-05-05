import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.scss'
import { AuthContextProvider } from './context/AuthContext'
import { ChatContextProvider } from './context/chatContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
)
