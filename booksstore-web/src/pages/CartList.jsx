import Header from "../Header";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Cookies from "js-cookie";

function CartList() {

    const [cartdata,setCartData] = useState([]);
    const [username,setUserName] = useState('');
    const [bookname,setBookName] = useState('');
    const [quantity,setQuantity] = useState(1);
    const [cartid,setCartID] = useState('');
    const [bookscartprice,setBooksCartPrice] = useState(0);
    const [discountprice,setDiscountPrice] = useState(0);
    const [pricewithdcharge,setPricewithDCharge] = useState(0);
    const [addressdetails,setAddressDetails] = useState({});
    const myAddressId = Cookies.get('address');

    let cartpriceval = 0,discountpriceval=0,pricewithdeliverycharge=0;
    const getCartList = async()=> {
        try {
            const response = await fetch("http://localhost:5000/api/cartlist");
            const data = await response.json();
            console.log(data);
            setCartData(data.cart);
            console.log(cartdata);
            const cartarry = data.cart;
            setBooksCartPrice(PrevcartPrice => PrevcartPrice * 0);
            cartpriceval = 0,discountpriceval=0,pricewithdeliverycharge=0;
            cartarry.map((cartary)=> {
                console.log(cartary);
                setBooksCartPrice(PrevcartPrice => PrevcartPrice + cartary.price);
                cartpriceval = cartpriceval + cartary.price;
            });
            //console.log(cartpriceval);
            discountpriceval = cartpriceval - (cartpriceval * 0.1);
            setDiscountPrice(discountpriceval);
            //console.log(discountpriceval);
            
            pricewithdeliverycharge = discountpriceval + 50;
            setPricewithDCharge(pricewithdeliverycharge);
            //console.log(pricewithdeliverycharge);
        } catch(error) {
            console.log(error);
            alert("Server Issue: "+error);
        }
    }

    const getAddressDetails = async()=> {
        try {
            const response = await fetch(`http://localhost:5000/api/address/${myAddressId}`);
            const data = await response.json();
            console.log(data);
            setAddressDetails(data.address);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        getCartList();
        getAddressDetails();
    },[]);

    const DeleteCartItem = async(cartidval)=> {
        console.log(cartidval);
        try {
            const response = await fetch(`http://localhost:5000/api/cartlist/${cartidval}`,{
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
            getCartList();
        } catch(error) {
            console.log(error);
            alert("Server Issue: "+error);
        }
    }

    
    const QtyPlusIconClick = (bkprcval,qtyval)=> {
        // console.log("Inside of Plus Function");
        // console.log(bkprcval);
        // console.log(qtyval);
        setQuantity(preval => preval + 1);
        qtyval = qtyval + 1;
        bkprcval = bkprcval * qtyval;
        //console.log(bkprcval);
        setBooksCartPrice(bkprcval);
        
        let discpriceval = bkprcval - (bkprcval * 0.1);
        setDiscountPrice(discpriceval);
        //console.log(discpriceval);
        
        let pricedcval = discpriceval + 50;
        setPricewithDCharge(pricedcval);
        //console.log(pricedcval);

    }

    const QtyMinusIconClick = (bkprcval,qtyval)=> {
        //console.log("Inside of Minus Click");
        //console.log(bkprcval);
        //console.log(qtyval);
        setQuantity(preval => preval > 1 ? preval - 1 : preval);
        
        if(qtyval > 1) {
            
            bkprcval = bkprcval/qtyval;
            qtyval = qtyval - 1;
            bkprcval = bkprcval * qtyval;
            setBooksCartPrice(bkprcval);
            console.log(bkprcval);

            let discpriceval = bkprcval - (bkprcval * 0.1);
            setDiscountPrice(discpriceval);
            //console.log(discpriceval);
            
            let pricedcval = discpriceval + 50;
            setPricewithDCharge(pricedcval);
            //console.log(pricedcval);
            
            
        }
        
    }

    return(
        <div>
            <Header></Header>
            <h2 className='title'>Cart List</h2>
            <div className="Addr-container">
                <h5>Delivery to</h5>
                <hr />
                <span>{addressdetails.firstname} {addressdetails.lastname}</span>&nbsp;<br />
                <span>{addressdetails.houseno},</span>&nbsp;
                <span>{addressdetails.areaname},</span>&nbsp;<br />
                <span>{addressdetails.landmark}</span>&nbsp;<br />
                <span>{addressdetails.city}-{addressdetails.pincode}</span>&nbsp;<br />
                <span>{addressdetails.state}</span>&nbsp;<br />
                <span>{addressdetails.mobileno}</span><br />
                <div className="AddrBtnsDiv">
                    <NavLink className="AddrLinkBtn" to={`/booksstore/editaddress/${myAddressId}`}>Edit</NavLink>
                    <NavLink className="AddrLinkBtn" to="/booksstore/addresses">Change</NavLink>
                    <NavLink className="AddrLinkBtn" to="/booksstore/newaddress">Add New</NavLink>
                </div>
            </div>
            <div>
            {cartdata ? (<div>
                {cartdata.map((cart)=> (
                    <div key={cart._id} className="form-container">
                        <div className="Imgdiv cart">
                            <img src="../src/assets/book_icon.jpg" width="100px" alt="bookimg" /><br />
                            <button className="QtyBtn" onClick={()=> QtyPlusIconClick(cart.price,quantity)}>+</button><span className="Qtyvalue">{quantity}</span><button className="QtyBtn" onClick={()=> bookscartprice?QtyMinusIconClick(bookscartprice,quantity):QtyMinusIconClick(cart.price,quantity)}>-</button>
                        </div>
                        <div className="formdiv cart">
                            <div><h4>{cart.bookname}</h4><br /></div>
                            <div>
                                <p >&#8377;{bookscartprice ? bookscartprice : cart.price}</p><br />
                            </div>
                            <div><button className="CartBtn" onClick={()=> {
                                    DeleteCartItem(cart._id);
                                }
                            }>Delete</button></div>
                        </div>
                    </div>
                    )
                )}
                
            </div>
            ) : (
                <div>
                    <p>Cart is Empty</p>
                </div>
            )}

                <div className="coupon-container">
                    <input type="text" className="TxtBox" placeholder="coupon"/>&nbsp;
                    <button className="ApplyBtn">Apply</button>
                    <p>Have coupon? Apply here</p>
                </div>

                <div className="cartBilling-container">
                    <div className="billingDetailsDiv">
                        <p>Actual Book Price:</p>
                        <p>Price After Discount:</p>
                        <p>Delivery Charge:</p>
                        <hr />
                        <h5>Total</h5>
                    </div>
                    <div className="billingPriceDiv">
                        <p>{bookscartprice}</p>
                        <p>{discountprice}</p>
                        <p>50</p>
                        <hr />
                        <h5>{pricewithdcharge}</h5>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
}

export default CartList;