import { FaStar ,FaCartArrowDown } from "react-icons/fa";
import { FaStarHalfStroke  ,FaCheck} from "react-icons/fa6";
import { FaRegHeart , FaShare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Products({item} ) {
    const navigate = useNavigate()

    const  {cartItems , addToCart , addToFav , favorites , removeFromFav} =  useContext(CartContext)
    const isInCart = cartItems.some( i => i.id === item.id)
    
    const handelAddToCart = () => {
        addToCart(item)
        toast.success(
        <div className="toast-wrapper">
            <img src={item.images[0]} alt={item.title} className="toast-img" />
            <div className="toast-content">
                <strong>{item.title}</strong>
                added to Cart
                <div>
                    <button className="btn" onClick={() => navigate("/cart")}>
                        View Cart
                    </button>
                </div>
            </div>
        </div>
        ,{duration : 3500}
    )}

    //Favorites
    const isInFav = favorites.some( i => i.id === item.id)
    const handelAddToFav = ( ) =>{
        if(isInFav){
            removeFromFav(item.id)
            toast.error(`${item.title} removed From favorites`)
        }
        else{
            addToFav(item)
            toast.success(`${item.title} added To favorites`)
        }
    }
    return (
    <div className={`products ${isInCart ? "in-cart" :"" }`}>
        <Link to={`/products/${item.id}`}>
        <span className="status-cart"> <FaCheck /> in Cart</span>
        <div className="img-product">
            <img src={item.images[0]} alt="smartphones" />
        </div>
        <p className="name-product">
            {item.title}
        </p>
        <div className="stars">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfStroke />
        </div>
        <p className="price">${item.price}</p>
        </Link>
        <div className="icons">
            <span className="btn-addtocart" onClick={handelAddToCart}><FaCartArrowDown /></span>
            <span className={`${isInFav ? "in-fav" : ""}`} onClick={handelAddToFav}><FaRegHeart /></span>
            <span><FaShare /></span>
        </div>
    </div>
    )
}
