import {useState, useEffect} from 'react';
import { NavLink } from 'react-router';
import Header from './Header';
import Footer from './Footer';

function Home() {
  const [books,setBooks] = useState([]);
  const [titleval,setTitleval] = useState('');
  const listbooks = async()=> {
    const response = await fetch('http://localhost:5000/api/books');
    const data = await response.json();
    console.log(data);
    setBooks(data.books);
    setTitleval(data.message);
    console.log(data.message);
  }

  useEffect(()=> {
    listbooks();
  },[]);

  return (
    <div>
      <Header />
      <h2 className='title'>{titleval}</h2>
      {books ? (<div className='flex-container'>
        {books.map((book)=>(
          <div key={book._id} className='gridContainer'>
            <div>
              <img src="./src/assets/books.jpg" alt="book-img" />
            </div>
            <div>
              <h3>{book.name}</h3>
            </div>
            <div>
              <p>&#8377;{book.price}</p>
            </div>
            <div>
              <NavLink to={`/books/${book._id}`} className="linknav">View Book Details</NavLink>
            </div>
          </div>
        ))

        }</div>) : (<div><p>No Books Available</p></div>)
      }
      
      <Footer />
    </div>
  )
}

export default Home;