import Header from "../Header";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';

function AddressList() {

    const [addresses,setAddresses] = useState([]);
    const [cookie, setCookie] = useCookies(['address']);
    //const [checked,setChecked] = useState(0);
    const myAddress = Cookies.get('address');
    
    const getAddressList = async()=> {
        try {
            const response = await fetch('http://localhost:5000/api/address');
            const data = await response.json();
            console.log(data);
            const dataResp = data.addresses;
            setAddresses(dataResp);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getAddressList();
    },[]);

    const RemoveAddress = async(AddrId)=> {
        try {
            const response = await fetch(`http://localhost:5000/api/address/${AddrId}`,{
                method:"DELETE"

            });
            const data = await response.json();
            console.log(data);
            getAddressList();
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <div>
            <Header></Header>
            
            <div className="NewAddrDiv">
                <NavLink className="AddrNavLink" to="/booksstore/newaddress">+ Add New Address</NavLink>
            </div>
            <h2 className="Addrtitle">Address List</h2>
            <div >
                {addresses ? (
                    <div className="CoverDiv">
                        {addresses.map((address)=> (
                                <div key={address._id} className="AddrDiv-Container">
                                    <h5>{address.firstname} {address.lastname}</h5>
                                    <p>{address.houseno}, {address.areaname}</p>
                                    <p>{address.landmark}</p>
                                    <p>{address.city}-{address.pincode}</p>
                                    <p>{address.state}</p>
                                    <p>{address.mobileno}</p>
                                    <input type="radio" name="usethis" id={address._id} checked={myAddress==address._id?"checked":""} onChange={()=> setCookie('address',address._id)} />
                                    <label htmlFor={address._id}>Use this</label><br />
                                    <div className="BtnsDiv">
                                        <NavLink className="AddrLinkBtn" to={`/booksstore/editaddress/${address._id}`}>Edit</NavLink>
                                        <NavLink className="AddrLinkBtn" to="/booksstore/addresses" onClick={()=> RemoveAddress(address._id)}>Remove</NavLink>
                                    </div>
                                </div>
                            )
                        )}
                        
                    </div>
                    
                ) : (
                    <div>
                        <p>No Addresses Available</p>
                    </div>
                )}


            </div>
            <Footer></Footer>
        </div>
    )
}

export default AddressList;