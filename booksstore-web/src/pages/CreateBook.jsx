import { NavLink } from "react-router";
import { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

function CreateBook() {
    const [name,setBookName] = useState('');
    const [description,setDescription] = useState('');
    const [author,setAuthorName] = useState('');
    const [price,setBookPrice] = useState(0);
    const [book,setBook] = useState({});
    const AddBook = async()=> {
        //e.preventdefault();
        console.log("Inside of Submit");
        const url = "http://localhost:5000/api/books";
        const response = await fetch(
            url,{
            headers:{
                "Content-type" : "application/json",
            },
            method:"POST",
            body:JSON.stringify({
                name,
                description,
                author,
                price
            })
        });
        /*
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle data
            })
            .catch((err) => {
                console.log(err.message);
            });
        */
        const data = await response.json();
        console.log(data);
        setBook(data.book);
        
    }

    /*const RestFormFields = (ev)=> {
        ev.preventDefault();
        ev.reset();
    }*/

    const AddBookButton = (e)=> {
        e.preventDefault();
        console.log(name);
        console.log(description);
        console.log(author);
        console.log(price);
        AddBook();
    }

    return (
        <div>
            <Header />
            <h2 className='title'>Create Book</h2>
                <div>
                    <form onSubmit={AddBookButton} className="form-container">
                        <div className="Imgdiv">
                            <img src="../src/assets/314.jpg" className="createImgBook" alt="booksimg" />
                        </div>
                        <div className="formdiv">
                            {/* <label htmlFor="bookname">Book Name:</label><br /> */}
                            <input type="text" onChange={(e)=> setBookName(e.target.value)} className="txtbox" name="bookname" placeholder="Enter Book Name"/>
                            <br />
                            {/* <label htmlFor="bookauthor">Author Name:</label><br /> */}
                            <input type="text" onChange={(e)=> setAuthorName(e.target.value)} className="txtbox" name="bookauthor" placeholder="Enter Book Aauthor"/>
                            <br />
                            {/* <label htmlFor="bookprice">Price:</label><br /> */}
                            <input type="number" onChange={(e)=> setBookPrice(e.target.value)} className="txtbox" name="bookprice" placeholder="Enter Book Price"/>
                            <br />
                            {/* <label htmlFor="bookdescrip">Book Description:</label><br /> */}
                            <textarea onChange={(e)=> setDescription(e.target.value)} className="txtbox" name="bookdescrip" placeholder="Enter Book Description"/>
                            <br />
                            <button className="AddBtn">Add Book</button>
                            {/* <button className="AddBtn" onClick={RestFormFields}>Reset</button> */}
                        </div>
                        
                    </form>    
                </div>
            <Footer />
        </div>
    )
}

export default CreateBook;