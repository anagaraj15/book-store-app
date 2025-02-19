import { NavLink } from "react-router";

function Header() {
    return (
        <header className="header-bar">
            <div style={{flexGrow: "2"}}>
            <img src="./src/assets/cart-icon.png" width="30px" alt="carticon" />
            <h2>Books Cart</h2>
            </div>
            <div style={{flexGrow: "8"}} className="dropdown">
                <h3 className="menu-header" style={{alignSelf: "center"}}>Book Menu</h3>
                <div className="dropdown-content">
                    <NavLink to="/create-book" className="NavlinkCls">Add New Book</NavLink>
                    <NavLink to="/" className="NavlinkCls">List of Books</NavLink>
                </div>
            </div>
            <div style={{flexGrow: "0"}}>
            <img src="./src/assets/user-icon.png" alt="usericon" />
            <div className="dropdown1">
                <h3 className="menu-header1" style={{alignSelf: "center"}}>Login</h3>
                <div className="dropdown-content1">
                    <NavLink to="/login" className="NavlinkCls1">LogOut</NavLink>
                </div>
            </div>
            </div>
        </header>
    )
}

export default Header;