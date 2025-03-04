import Header from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import { useNavigate } from "react-router";

function AddAddress() {

    const navigate = useNavigate();
    const [firstname,setFirestName] = useState('');
    const [lastname,setLastName] = useState('');
    const [mobileno,setMobileNum] = useState('');
    const [houseno,setHouseNum] = useState('');
    const [areaname,setAreaName] = useState('');
    const [landmark,setLandmark] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [pincode,setPincode] = useState('');

    const AddAddressFunc = async()=> {
        try {
            const response = await fetch('http://localhost:5000/api/address',{
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    mobileno,
                    houseno,
                    areaname,
                    landmark,
                    city,
                    state,
                    pincode
                })
                
            });
            const data = await response.json();
            console.log(data);
            navigate('/booksstore/books/cart');
        } catch(error) {
            console.log(error);
        }
    }

    const AddAddressBtnClick = (e)=> {
        e.preventDefault();
        AddAddressFunc();
    }

    return(
        <div>
            <Header></Header>
            <h2 className='title'>New Address</h2>
            <div>
                <form className="Addrform-Container" onSubmit={AddAddressBtnClick}>
                    <div>
                        <label htmlFor="firtsname">First Name:</label><br />
                        <input type="text" className="Txt-Box" onChange={(e)=> setFirestName(e.target.value)} placeholder="Enter First Name"/><br />
                    </div>
                    
                    <div>
                        <label htmlFor="lastname">Last Name:</label><br />
                        <input type="text" className="Txt-Box" onChange={(e)=> setLastName(e.target.value)} placeholder="Enter Last Name"/><br /><br />
                    </div>

                    <div>
                        <label htmlFor="lastname">Mobile Number:</label><br />
                        <input type="text" className="Txt-Box" onChange={(e)=> setMobileNum(e.target.value)} placeholder="Enter Mobile Number"/><br />
                    </div>

                    <div>
                        <label htmlFor="houseno">House No.:</label><br />
                        <input type="text" className="Txt-Box" onChange={(e)=> setHouseNum(e.target.value)} placeholder="Enter House Number"/><br /><br />
                    </div>
                    
                    <div>
                        <label htmlFor="areaname">Area Name:</label><br />
                        <input type="text" className="Txt-Box" onChange={(e)=> setAreaName(e.target.value)} placeholder="Enter Area Name"/><br />
                    </div>
                    
                    <div>
                        <label htmlFor="landmark">LandMark:</label><br />
                        <input type="text" className="Txt-Box" onChange={(e)=> setLandmark(e.target.value)} placeholder="Enter Landmark"/><br /><br />
                    </div>
                    
                    <div>
                        <label htmlFor="city">City:</label><br />
                        <input type="text" className="Txt-Box" onChange={(e)=> setCity(e.target.value)} placeholder="Enter City Name"/><br />
                    </div>
                    
                    <div>
                        <label htmlFor="state">State:</label><br />
                        <input type="text" className="Txt-Box" onChange={(e)=> setState(e.target.value)} placeholder="Enter State Name"/><br /><br />
                    </div>
                    
                    <div>
                        <label htmlFor="pincode">Pincode:</label><br />
                        <input type="text" className="Txt-Box" onChange={(e)=> setPincode(e.target.value)} placeholder="Enter Pincode"/><br /><br />
                    </div>
                    
                    <div>
                        <button className="AddBtn">Add Address</button><br />
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default AddAddress;