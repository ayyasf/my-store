import { useContext } from "react"
import { CartContext } from "../../components/context/CartContext"
import PageTransition from "../../components/PageTransition"
import Products from "../../components/SlideProducts/Products"

export default function Favorites() {
    const { favorites } = useContext(CartContext)
    return (
        <PageTransition>
            <div className="category-products favoritesPage">
                <div className="container">
                    <div className="top-slide">
                        <h2>Your Favorites</h2>
                    </div>
                    {favorites.length === 0 ?(
                        <p>No Favorites Products Yet. </p>
                    ) : (
                        <div className="category-grid">
                            {favorites.map(item =>(
                                <Products item={item} key={item.id} />
                            ) )}
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    )
}
