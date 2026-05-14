import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductsDetails.css";
import SlideProducts from "../../components/SlideProducts/SlideProducts";
import ProductsDetailsLoading from "./ProductsDetailsLoading";
import SlideProductsLoading from "../../components/SlideProducts/SlideProductsLoading";
import ProductInfo from "./ProductInfo";
import PageTransition from "../../components/PageTransition";

export default function ProductsDetails() {
    
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [loadingRelatedProduct, setLoadingRelatedProduct] = useState(true);


    useEffect(() => {
    const fetchProduct = async () => {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setMainImage(data.images[0]);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
    };
    fetchProduct();
    }, [id]);

    useEffect(() => {
    if (!product) return;
    fetch(`https://dummyjson.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((data) => {
        setRelatedProduct(data.products);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoadingRelatedProduct(false));
    }, [product?.category]);

    if (!product) return <p>Product Not Found</p>;

    return (
    <PageTransition key={id}>
        <div>
    {loading? (
            <ProductsDetailsLoading />
        ) : (
        <div className="item-details">
            <div className="container">
                <div className="image-item">
                    <div className="big-img">
                        <img src={mainImage} alt={product.title} />
                    </div>
            <div className="small-img">
                {product.images.map((img, index) => (
                <div className="small-div-img" key={index}>
                    <img
                    src={img}
                    alt={product.title}
                    onClick={() => setMainImage(img)}
                    />
                </div>
                ))}
            </div>
            </div>
            <ProductInfo  product = {product} />
        </div>
        </div>
        )}
        {loadingRelatedProduct ? (
            <SlideProductsLoading />
        ) : (
        <SlideProducts
            key={product.category}
            data={relatedProduct}
            title={product.category.replace("-", " ")}
        />
        )}
        </div>
    </PageTransition>
    );
}