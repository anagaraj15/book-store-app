import Header from "../Header";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

function CartList() {

    const navigate = useNavigate();
    const [cartdata,setCartData] = useState([]);
    const [cartdetails,setCartDetails] = useState([]);
    const [username,setUserName] = useState('');
    const [bookname,setBookName] = useState('');
    const [quantity,setQuantity] = useState(1);
    const [cartid,setCartID] = useState('');
    const [bookscartprice,setBooksCartPrice] = useState(0);
    const [finalcartprice,setFinalCartPrice] = useState(0);
    const [discountprice,setDiscountPrice] = useState(0);
    const [pricewithdcharge,setPricewithDCharge] = useState(0);
    const [addressdetails,setAddressDetails] = useState({});
    const [cookies,setCookie] = useCookies(['totalamount']);
    const myAddressId = Cookies.get('address');

    let mydata = [];

    let cartpriceval = 0,discountpriceval=0,pricewithdeliverycharge=0;
    const getCartList = async()=> {
        try {
            const response = await fetch("http://localhost:5000/api/cartlist");
            const data = await response.json();
            console.log(data);
            setCartDetails(data.cart);
            console.log(cartdetails);
            const cartarry = data.cart;
            setBooksCartPrice(PrevcartPrice => PrevcartPrice * 0);
            cartpriceval = 0,discountpriceval=0,pricewithdeliverycharge=0;
            mydata = [];
            cartarry.map((cartary)=> {
                console.log(cartary);
                setBooksCartPrice(cartary.price);
                setFinalCartPrice(PrevcartPrice => PrevcartPrice + cartary.price);
                cartpriceval = cartpriceval + cartary.price;
                
                mydata.push({
                    price:cartary.price,
                    quantity:1,
                    bookname:cartary.bookname,
                    cartid:cartary._id
                });

            });
            console.log(mydata);
            setCartData(mydata);
            //console.log(cartpriceval);
            discountpriceval = cartpriceval - (cartpriceval * 0.1);
            setDiscountPrice(discountpriceval);
            //console.log(discountpriceval);
            
            pricewithdeliverycharge = discountpriceval + 50;
            setPricewithDCharge(pricewithdeliverycharge);
            console.log(pricewithdeliverycharge);
            setCookie('totalamount',pricewithdeliverycharge);
        } catch(error) {
            console.log(error);
            alert("Server Issue: "+error);
        }
    }

    const getAddressDetails = async()=> {
        try {
            console.log(myAddressId);
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


    const QtyPlusFun = (e)=> {
        console.log(e);
        //console.log(cartdata);
        cartdata.find((data)=> {
            if(data.cartid == e.target.id) {
                data.price = data.price/data.quantity;
                data.quantity += 1;
                data.price = data.price * data.quantity;
                e.target.nextElementSibling.innerHTML = data.quantity;
                e.target.parentElement.nextElementSibling.firstChild.nextElementSibling.innerHTML = '&#8377;'+data.price;
            }
        })
        console.log(cartdata);
        setCartData(cartdata);
        let cartprice=0,discpriceval=0,pricedcval=0;
        cartdata.map((cdata)=> {
            cartprice += cdata.price;
            setFinalCartPrice(cartprice);
            discpriceval = cartprice - (cartprice * 0.1);
            setDiscountPrice(discpriceval);
            //console.log(discpriceval);
            pricedcval = discpriceval + 50;
            setPricewithDCharge(pricedcval);
            //console.log(pricedcval);
        })
        setCookie('totalamount',pricewithdcharge);
    }

    const QtyMinusFun = (e)=> {
        console.log(e);
        //console.log(e.target);
        cartdata.find((data)=> {
            if(data.cartid == e.target.id && data.quantity>1) {
                data.price = data.price/data.quantity;
                data.quantity -= 1;
                data.price = data.price * data.quantity;
                e.target.previousElementSibling.innerHTML = data.quantity;
                e.target.parentElement.nextElementSibling.firstChild.nextElementSibling.innerHTML = '&#8377;'+data.price;
            }
        })
        console.log(cartdata);
        setCartData(cartdata);
        let cartprice=0,discpriceval=0,pricedcval=0;
        cartdata.map((cdata)=> {
            cartprice += cdata.price;
            setFinalCartPrice(cartprice);
            discpriceval = cartprice - (cartprice * 0.1);
            setDiscountPrice(discpriceval);
            //console.log(discpriceval);
            pricedcval = discpriceval + 50;
            setPricewithDCharge(pricedcval);
            //console.log(pricedcval);
        })
        setCookie('totalamount',pricewithdcharge);
    }

    const PlaceOrderBtn = ()=> {
        navigate('/booksstore/payment');
    }

    //render() {
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
                    <div key={cart.cartid} className="form-container">
                        <div className="Imgdiv cart">
                            <img src="../src/assets/book_icon.jpg" width="100px" alt="bookimg" /><br />
                            <button className="QtyBtn" id={cart.cartid} onClick={(e)=> QtyPlusFun(e)}>+</button>
                            <span className="Qtyvalue">{cart.quantity}</span>
                            <button className="QtyBtn" id={cart.cartid} onClick={(e)=> QtyMinusFun(e)}>-</button>
                        </div>
                        <div className="formdiv cart">
                            <div><h4>{cart.bookname}</h4><br /></div>
                            <div>
                                <p >&#8377;{cart.price}</p><br />
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
                        <hr />
                    </div>
                    <div className="billingPriceDiv">
                        <p>&#8377;{finalcartprice}</p>
                        <p>&#8377;{discountprice}</p>
                        <p>&#8377;50</p>
                        <hr />
                        <h5>&#8377;{pricewithdcharge}</h5>
                        <hr />
                    </div>
                </div>

                <div className="orderdiv">
                    <div>
                        <h4>&#8377;{pricewithdcharge}</h4>
                    </div>
                    <div>
                        <button className="OrderBtn" onClick={PlaceOrderBtn}>Place Order</button>
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </div>
    )
    //}
}

export default CartList;