import { useContext } from "react"
import { CartContext } from "../../components/context/CartContext"
import { FaTrashAlt } from "react-icons/fa"
import "./cart.css"
import PageTransition from "../../components/PageTransition"

export default function Cart() {

    const { cartItems , increasedQuantity  , decreasedQuantity , removeFromCart} = useContext(CartContext)
    
    const total = cartItems.reduce((acc , item ) => acc + item.price * item.quantity , 0)

    return (
        <PageTransition>
            <div className="chekout">
            <div className="order-summary">
                <h1>Order Summary</h1>
                <div className="items">
                    {cartItems.length === 0 ? (
                        <p>Your Cart  Is Empty.</p>
                    ): (
                        cartItems.map((item ,index ) =>(
                            <div className="item-cart" key={index}>
                                    <div className="img-name">
                                        <div className="img-item">
                                            <img src={item.images[0]} alt={item.title}></img>
                                            </div>
                                        <div className="content">
                                            <h4>{item.title}</h4>
                                            <p className="price">${item.price}</p>
                                            <div className="quantity-control">
                                                <button onClick={() => decreasedQuantity(item.id)} >-</button>
                                                <span className="quantity">{item.quantity}</span>
                                                <button onClick={() => increasedQuantity(item.id)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="delete-item" onClick={() => removeFromCart(item.id)}>
                                            <FaTrashAlt />
                                        </button>
                            </div>
                        ))
                    ) }
                </div>
                <div className="bottom-summary">
                    <div className="shop-table">
                        <p>Total :</p>
                        <span className="total-checkout">${total.toFixed(2)}</span>
                    </div>
                    <div className="button-div">
                        <button type="submit">Place Order</button>
                    </div>
                </div>
            </div>
            </div>
        </PageTransition>
    )
}
