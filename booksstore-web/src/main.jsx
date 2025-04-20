import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ViewBook from './pages/ViewBook.jsx'
import CreateBook from './pages/CreateBook.jsx'
import EditBook from './pages/EditBook.jsx'
import Home from './Home.jsx'
import Register from './Register.jsx'
import CartList from './pages/CartList.jsx'
import AddAddress from './pages/AddAddress.jsx'
import AddressList from './pages/AddressList.jsx'
import EditAddress from './pages/EditAddress.jsx'
import { BrowserRouter,Route,Routes,Navigate } from 'react-router'
import { CookiesProvider } from 'react-cookie'
import PaymentComponent from './PaymentComponent.jsx'
import CheckoutForm from './CheckoutForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider  defaultSetOptions={{ path: '/' }}>
      <BrowserRouter>
        <Routes>
          
          <Route path='/booksstore/books' element={<Home />} />
          <Route path='/booksstore/books' element={<Header />} />
          <Route path='/booksstore/books' element={<Footer />} />
          <Route path='/booksstore/login' element={<App />} />
          <Route path='/booksstore/register' element={<Register />} />
          <Route path='/booksstore/books/:bookId' element={<ViewBook />} />
          <Route path='/booksstore/create-book' element={<CreateBook />} />
          <Route path='/booksstore/books/edit/:bookId' element={<EditBook />} />
          <Route path='/booksstore/books/cart' element={<CartList />} />
          <Route path="*" element={<Navigate to="/booksstore/login" />} />  
          <Route path='/booksstore/newaddress' element={<AddAddress />} />      
          <Route path='/booksstore/editaddress/:addrId' element={<EditAddress />} />      
          <Route path='/booksstore/addresses' element={<AddressList />} />   
          <Route path='/booksstore/payment' element={<PaymentComponent />} />   
          <Route path='/booksstore/checkout' element={<CheckoutForm />} />   
          
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>,
)
