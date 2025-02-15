import { NavLink } from "react-router";
import Footer from "../Footer";
import Header from "../Header";
import { useState,useEffect } from "react";
import { useParams } from "react-router";

function ViewBook() {
    const params = useParams();
    //console.log(params.bookId);
    const [book,setBook] = useState({});
    const [titleval,setTitleval] = useState('');
    const listbook = async()=> {
        const response= await fetch(`http://localhost:5000/api/books/${params.bookId}`);
        const data = await response.json();
        console.log(data);
        setTitleval(data.message);
        setBook(data.book);

    }


    const DeleteBook = async()=> {
        const url = `http://localhost:5000/api/books/${params.bookId}`;
        const response = await fetch(
            url,{
            method:"DELETE"
        });
        const data = await response.json();
        console.log(data);
        //setBook(data.book);
        
    }


    useEffect(()=> {
        listbook();
    },[]);

    return (
        <div>
            <Header />
            <h2 className='title'>{titleval}</h2>
            <div className="view-container">
                <img src="../src/assets/book_icon.jpg" width="100px" alt="bookimg" />
                <h3>{book.name}</h3>
                <p>{book.description}</p>
                <p>{book.author}</p>
                <p>&#8377;{book.price}</p>
                <NavLink to={`/books/edit/${book._id}`} className="linknav">Edit Book Details</NavLink><br />
                <NavLink to="/" onClick={DeleteBook} className="linknav">Delete Book</NavLink>
            </div>
            <Footer />
        </div>
    )

}

export default ViewBook;