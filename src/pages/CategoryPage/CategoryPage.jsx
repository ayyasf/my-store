import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../../components/SlideProducts/Products";
import "./categorypage.css"
import SlideProductsLoading from "../../components/SlideProducts/SlideProductsLoading";
import PageTransition from "../../components/PageTransition";

export default function CategoryPage() {
    const { category } = useParams();
    const [loading, setLoading] = useState(true);
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        console.log("category from URL:", category);

        fetch(`https://dummyjson.com/products/category/${category}`)
            .then((res) => res.json())
            .then((data) => {
                setCategoryProducts(data.products);
                console.log(data);
            })
            .catch((error) => console.error("Error fetching data:", error))
            .finally(() => setLoading(false));
    }, [category]);

    return (
        <PageTransition key={category}>
            <div className="category-products">
                {loading ?
                    <SlideProductsLoading />
                    :
                    <div className="container">
                        <div className="top-slide">
                            <h2>{category} : {categoryProducts.length}</h2>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia.</p>
                        </div>
                        <div className="category-grid">
                            {categoryProducts.map((item, index) => (
                                <Products item={item} key={index} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </PageTransition>
    );
}
