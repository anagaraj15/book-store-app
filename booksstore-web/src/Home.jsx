import {useState, useEffect, Component} from 'react';
import { NavLink } from 'react-router';
import {instanceOf} from 'prop-types';
import {withCookies,Cookies, useCookies} from 'react-cookie';
import Header from './Header';
import Footer from './Footer';

function Home() {
//class Home extends Component {

  /*static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      username: cookies.get('username') || '',
    };
  }*/

  const [books,setBooks] = useState([]);
  const [titleval,setTitleval] = useState('');

  const listbooks = async()=> {
    try {
      const response = await fetch('http://localhost:5000/api/books');
      const data = await response.json();
      console.log(data);
      setBooks(data.books);
      setTitleval(data.message);
      console.log(data.message);
    } catch(error) {
      console.log(error);
      alert("Server issue: "+error);
    }
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
              <NavLink to={`/booksstore/books/${book._id}`} className="linknav">View Book Details</NavLink>
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
//export default withCookies(Home);