import { useContext } from "react";
import { FaRegHeart, FaShare, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { CartContext } from "../../components/context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductInfo({product}) {

    const  {cartItems , addToCart , addToFav , removeFromFav , favorites} =  useContext(CartContext)
    const navigate = useNavigate()
    //Cart
    const isInCart = cartItems.some( i => i.id === product.id)
    const handelAddToCart = () => {
        addToCart(product)
        toast.success(
        <div className="toast-wrapper">
            <img src={product.images[0]} alt={product.title} className="toast-img" />
            <div className="toast-content">
                <strong>{product.title}</strong>
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
    const isInFav = favorites.some( i => i.id === product.id)
    const handelAddToFav = ( ) =>{
        if(isInFav){
            removeFromFav(product.id)
            toast.error(`${product.title} removed From favorites`)
        }
        else{
            addToFav(product)
            toast.success(`${product.title} added To favorites`)
        }
    }
    return (
    <div className="details-item">
        <h1 className="name">{product.title}</h1>
        <div className="stars">
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaRegStarHalfStroke/>
        </div>
        <p className="price">${product.price}</p>
        <h5>
            Availability : <span>{product.availabilityStatus}</span>
        </h5>
        <h5>
            Brand : <span>{product.brand}</span>
        </h5>
        <p className="description">{product.description}</p>
        <h5 className="stock">
            <span>
                Hurry Up! Only {product.stock} products left in stock.
            </span>{""}
        </h5>
        <button 
            className={`btn ${isInCart ? "in-cart" :"" }`}
            onClick={handelAddToCart} >
            {isInCart ?" item in cart" :" Add to cart"  }   <TiShoppingCart/>
        </button>
        <div className="icons">
            <span className={`${isInFav ? "in-fav" : ""}`}
                onClick={handelAddToFav}>
                <FaRegHeart/>
            </span>
            <span>
                <FaShare/>
            </span>
        </div>
    </div>
    )
}
