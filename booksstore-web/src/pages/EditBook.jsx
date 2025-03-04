import { NavLink, useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

function EditBook() {
    const params = useParams();
    //console.log(params.bookId);
    const [name,setBookName] = useState('');
    const [description,setDescription] = useState('');
    const [author,setAuthorName] = useState('');
    const [price,setBookPrice] = useState(0);
    const [book,setBook] = useState({});
    const UpdateBook = async()=> {
        try {
            console.log("Inside of Submit");
            const url = `http://localhost:5000/api/books/${params.bookId}`;
            const response = await fetch(
                url,{
                headers:{
                    "Content-type" : "application/json",
                },
                method:"PUT",
                body:JSON.stringify({
                    name,
                    description,
                    author,
                    price
                })
            });
            const data = await response.json();
            console.log(data);
            //setBook(data.book);
        } catch(error) {
            console.log(error);
            alert("Server Issue: "+error);
        }
    }

    const UpdateBookButton = (e)=> {
        e.preventDefault();
        console.log(name);
        console.log(description);
        console.log(author);
        console.log(price);
        UpdateBook();
    }

    const getBookDetails = async()=> {
        try {
            const response = await fetch(`http://localhost:5000/api/books/${params.bookId}`);
            const data = await response.json();
            console.log(data);
            setBook(data.book);
            setDescription(book.description)
            setAuthorName(book.author)
            setBookPrice(book.price)
            setBookName(book.name)
        } catch(error) {
            console.log(error);
            alert("Servr issue: "+error);
        }
    }

    useEffect(()=> {
        getBookDetails();
    },[]);

    return (
        <div>
            <Header />
            <h2 className='title'>Edit Book Details</h2>
                <div>
                <form onSubmit={UpdateBookButton} className="form-container">
                        <div className="Imgdiv">
                            <img src="../../src/assets/314.jpg" className="createImgBook" alt="booksimg" />
                        </div>
                        <div className="formdiv">
                            
                            <input type="text" defaultValue={book.name} onChange={(e)=> setBookName(e.target.value)} className="txtbox" name="bookname" placeholder="Enter Book Name"/>
                            <br />
                            
                            <input type="text" defaultValue={book.author} onChange={(e)=> setAuthorName(e.target.value)} className="txtbox" name="bookauthor" placeholder="Enter Book Aauthor"/>
                            <br />
                            
                            <input type="number" defaultValue={book.price} onChange={(e)=> setBookPrice(e.target.value)} className="txtbox" name="bookprice" placeholder="Enter Book Price"/>
                            <br />
                            
                            <textarea defaultValue={book.description} onChange={(e)=> setDescription(e.target.value)} className="txtbox" name="bookdescrip" placeholder="Enter Book Description"/>
                            <br />
                            <button className="AddBtn">Update Book</button>
                            {/* <button className="AddBtn" onClick={RestFormFields}>Reset</button> */}
                        </div>
                        
                    </form>  
                </div>
            <Footer />
        </div>
    )
}

export default EditBook;