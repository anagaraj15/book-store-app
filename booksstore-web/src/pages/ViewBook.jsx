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
    const [isAdmin,setIsAdmin] = useState(0);
    const [goCart,setGoCart] = useState(0);
    const [idval,setIdval] = useState('1');
    const [username, setUserName] = useState('anagaraj');
    const [bookname, setBookName] = useState('JSP');
    const [bookprice, setBookPrice] = useState(0);

    const listbook = async()=> {
        try {
            const response= await fetch(`http://localhost:5000/api/books/${params.bookId}`);
            const data = await response.json();
            console.log(data);
            setTitleval(data.message);
            setBook(data.book);
        } catch(error) {
            console.log(error);
            alert("Server Issue: "+error);
        }

    }


    const DeleteBook = async()=> {
        try {
            const url = `http://localhost:5000/api/books/${params.bookId}`;
            const response = await fetch(
                url,{
                method:"DELETE"
            });
            const data = await response.json();
            console.log(data);
            //setBook(data.book);
        } catch(error) {
            console.log(error);
            alert("Servre Issue: "+error);
        }
        
    }


    useEffect(()=> {
        listbook();
    },[]);

    const AddCartFunc = async()=> {
        try {
            const url = 'http://localhost:5000/api/cartlist';
            setIdval(book._id);
            setUserName('anagaraj');
            setBookName(book.name);
            setBookPrice(book.price);
            
            console.log(idval);
            console.log(username);
            console.log(bookname);
            console.log(bookprice);
            const response = await fetch(
                url,{
                headers: {
                    "Content-type":"application/json",
                },
                method:"POST",
                body:JSON.stringify({
                    idval,
                    username,
                    bookname,
                    bookprice
                })
                
            });
            const data = await response.json();
            console.log(data);
        } catch(error) {
            console.log(error);
            alert("Servr Issue: "+error);
        }
        
    }

    const AddCartButton = ()=> {
        setGoCart(1);
        
        AddCartFunc();
    }

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
                {isAdmin ? (
                    <div>
                        <NavLink to={`/booksstore/books/edit/${book._id}`} className="linknav">Edit Book Details</NavLink><br />
                        <NavLink to="/booksstore/books" onClick={DeleteBook} className="linknav">Delete Book</NavLink>
                    </div>
                ) : (
                    <div>
                        {goCart ? (
                            <div>
                                <button className="AddBtn" ><NavLink to='/booksstore/books/cart' className="linknav" style={{color:"white"}}>Go Cart</NavLink></button>
                            </div>
                        ) : (
                            <div>
                                <button className="AddBtn" onClick={AddCartButton}>Add to Cart</button>
                            </div>
                        )}
                        <button className="AddBtn"><NavLink to='/booksstore/books/cart' className="linknav" style={{color:"white"}}>Buy Now</NavLink></button>
                    </div>
                )}
                
            </div>
            <Footer />
        </div>
    )

}

export default ViewBook;