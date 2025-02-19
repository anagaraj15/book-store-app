import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ViewBook from './pages/ViewBook.jsx'
import CreateBook from './pages/CreateBook.jsx'
import EditBook from './pages/EditBook.jsx'
import Home from './home.jsx'
import Register from './Register.jsx'
import CartList from './pages/CartList.jsx'
import { BrowserRouter,Route,Routes,Navigate } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<App />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path='/' element={<Header />} />
        <Route path='/' element={<Footer />} />
        <Route path='/books/:bookId' element={<ViewBook />} />
        <Route path='/create-book' element={<CreateBook />} />
        <Route path='/books/edit/:bookId' element={<EditBook />} />
        <Route path='/cart' element={<CartList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
