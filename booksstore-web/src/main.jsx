import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ViewBook from './pages/ViewBook.jsx'
import CreateBook from './pages/CreateBook.jsx'
import EditBook from './pages/EditBook.jsx'
import { BrowserRouter,Route,Routes } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/' element={<Header />} />
        <Route path='/' element={<Footer />} />
        <Route path='/books/:bookId' element={<ViewBook />} />
        <Route path='/create-book' element={<CreateBook />} />
        <Route path='/books/edit/:bookId' element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
