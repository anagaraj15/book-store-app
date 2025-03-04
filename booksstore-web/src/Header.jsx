import { NavLink } from "react-router";
import Cookies from 'js-cookie';

function Header() {

    const myCookie = Cookies.get('username');
    

    return (
        <header className="header-bar">
            <div style={{flexGrow: "2"}}>
            <img src="./src/assets/cart-icon.png" width="30px" alt="carticon" />
            <h2>Books Cart</h2>
            </div>
            <div style={{flexGrow: "8"}} className="dropdown">
                <h3 className="menu-header" style={{alignSelf: "center"}}>Book Menu</h3>
                <div className="dropdown-content">
                    <NavLink to="/booksstore/books/create-book" className="NavlinkCls">Add New Book</NavLink>
                    <NavLink to="/booksstore/books" className="NavlinkCls">List of Books</NavLink>
                </div>
            </div>
            <div style={{flexGrow: "0"}}>
            <img src="./src/assets/user-icon.png" alt="usericon" />
            <div className="dropdown1">
                <h3 className="menu-header1" style={{alignSelf: "center"}}>{myCookie}</h3>
                <div className="dropdown-content1">
                    <NavLink to="/booksstore/login" className="NavlinkCls1">LogOut</NavLink>
                </div>
            </div>
            </div>
        </header>
    )
}

export default Header;