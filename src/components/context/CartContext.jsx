import {  createContext, useEffect, useState } from "react"

export const CartContext  = createContext()

export default function CartProvider({children}) {
    //Favorites
    const [favorites, setFavorites] = useState(() => {
        const savedFav = localStorage.getItem("favoritesItems")
        return savedFav ? JSON.parse(savedFav) : [] 
    } )

    const addToFav = (item )=> {
        setFavorites((prev) => {
            if(prev.some((i) => i.id === item.id)) return prev
            return [...prev,item] 
        })
    }

    useEffect(() =>{
        localStorage.setItem("favoritesItems" , JSON.stringify(favorites))
    } ,[favorites])

    const removeFromFav = (id) => {
        setFavorites((prev) => prev.filter((i) => i.id != id))
    }

     //Cart
    const [cartItems , setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems")
        return savedCart ? JSON.parse(savedCart) : [] 
    } )
    // increasedQuantity
    const increasedQuantity = (id) =>{
        setCartItems(prevItem => prevItem.map(item => 
            item.id == id  ?  {...item , quantity: item.quantity + 1 } : item
        ))
    }
    // decreasedQuantity
    const decreasedQuantity = (id) =>{
        setCartItems(prevItem => prevItem.map(item => 
            item.id == id  && item.quantity > 1 ?  {...item , quantity: item.quantity - 1 } : item
        ))
    }
    // Remove From Cart 
    const  removeFromCart = (id) =>{ 
        setCartItems( prevItem => prevItem.filter(item => item.id !== id ) )
    }

    const addToCart = (item ) => { 
        setCartItems((prevItem) => [...prevItem ,{...item , quantity : 1} ])
    }
    useEffect(()  =>  {
        localStorage.setItem("cartItems" ,JSON.stringify(cartItems))
    } ,[cartItems]  )

    return (
        <CartContext.Provider 
        value={{
        cartItems, 
        addToCart , 
        increasedQuantity , 
        decreasedQuantity , 
        removeFromCart ,
        favorites ,
        addToFav ,
        removeFromFav
        }}
        >
            {children}
        </CartContext.Provider>
        
    )
}
