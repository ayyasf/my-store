import { Link } from "react-router-dom";
import Logo from "../../img/logo.png"
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import "./Header.css"
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import SearchBoox from "../SearchBox";

export default function TopHeader() {

    const {cartItems , favorites} = useContext(CartContext)
    return (
            <div className="top-header">
                <div className="container">
                    <Link to= "/"><img src={Logo} alt="logo" className="logo"></img> </Link>
                    <SearchBoox />
                    <div className="header-icons">
                        <div className="icon">
                            <Link to="/favorites">
                                <FaRegHeart  />
                                <span className="count">{favorites.length}</span>
                            </Link>
                        </div>
                        <div className="icon">
                            <Link to="/cart">
                                <TiShoppingCart />  
                                <span className="count">{cartItems.length}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> 
    )
}
