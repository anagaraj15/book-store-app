import Header from "../Header";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function EditAddress() {

    const params = useParams();
    const navigate = useNavigate();
    const [addressdetails,setAddressDetails] = useState({});
    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [mobileno,setMobileNum] = useState('');
    const [houseno,setHouseNum] = useState('');
    const [areaname,setAreaName] = useState('');
    const [landmark,setLandmark] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [pincode,setPincode] = useState('');

    const getAddressDetails = async()=> {
        try {
            const response = await fetch(`http://localhost:5000/api/address/${params.addrId}`);
            const data = await response.json();
            console.log(data);
            const DataResp = data.address;
            setAddressDetails(DataResp);

            setFirstName(DataResp.firstname);
            setLastName(DataResp.lastname);
            setMobileNum(DataResp.mobileno);
            setHouseNum(DataResp.houseno);
            setAreaName(DataResp.areaname);
            setLandmark(DataResp.landmark);
            setCity(DataResp.city);
            setState(DataResp.state);
            setPincode(DataResp.pincode);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getAddressDetails();
    },[]);


    const UpdateAddress = async()=> {
        try {
            const response = await fetch(`http://localhost:5000/api/address/${params.addrId}`,{
                method:"PUT",
                headers: {
                    "Content-Type":"application/json"
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
            navigate('/booksstore/addresses');
        } catch(error) {
            console.log(error);
        }
    }

    const UpdateAddressClick = (e)=> {
        e.preventDefault();
        UpdateAddress();
    }

    return(
        <div>
            <Header></Header>
            <h2 className="title">Edit Address</h2>
            <div>
                <form className="Addrform-Container" onSubmit={UpdateAddressClick}>
                    <div>
                        <label htmlFor="firstname">First Name</label><br />
                        <input type="text" name="firstname" className="Txt-Box" value={firstname} defaultValue={addressdetails.firstname} onChange={(e)=> setFirstName(e.target.value)}/><br />
                    </div>
                    <div>
                        <label htmlFor="lastname">Last Name</label><br />
                        <input type="text" name="lastname" className="Txt-Box" value={lastname} defaultValue={addressdetails.lastname} onChange={(e)=> setLastName(e.target.value)}/><br /><br />
                    </div>
                    <div>
                        <label htmlFor="mobileno">Mobile No.</label><br />
                        <input type="text" name="mobileno" className="Txt-Box" value={mobileno} defaultValue={addressdetails.mobileno} onChange={(e)=> setMobileNum(e.target.value)}/><br />
                    </div>
                    <div>
                        <label htmlFor="houseno">House No.:</label><br />
                        <input type="text" name="houseno" className="Txt-Box" value={houseno} defaultValue={addressdetails.houseno} onChange={(e)=> setHouseNum(e.target.value)}/><br /><br />
                    </div>
                    <div>
                        <label htmlFor="areaname">Area Name:</label><br />
                        <input type="text" name="areaname" className="Txt-Box" value={areaname} defaultValue={addressdetails.areaname} onChange={(e)=> setAreaName(e.target.value)}/><br />
                    </div>
                    <div>
                        <label htmlFor="landmark">Landmark:</label><br />
                        <input type="text" name="landmark" className="Txt-Box" value={landmark} defaultValue={addressdetails.landmark} onChange={(e)=> setLandmark(e.target.value)}/><br /><br />
                    </div>
                    <div>
                        <label htmlFor="city">City:</label><br />
                        <input type="text" name="city" className="Txt-Box" value={city} defaultValue={addressdetails.city} onChange={(e)=> setCity(e.target.value)}/><br />
                    </div>
                    <div>
                        <label htmlFor="state">State:</label><br />
                        <input type="text" name="state" className="Txt-Box" value={state} defaultValue={addressdetails.state} onChange={(e)=> setState(e.target.value)}/><br /><br />
                    </div>
                    <div>
                        <label htmlFor="pincode">Pincode:</label><br />
                        <input type="text" name="pincode" className="Txt-Box" value={pincode} defaultValue={addressdetails.pincode} onChange={(e)=> setPincode(e.target.value)}/><br />
                    </div>
                    <div>
                        <button className="AddBtn">Update Address</button>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default EditAddress;