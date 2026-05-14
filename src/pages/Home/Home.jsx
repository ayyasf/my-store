import { useEffect, useState } from "react";
import HeroSlider from "../../components/Header/HeroSlider";
import SlideProducts from "../../components/SlideProducts/SlideProducts";
import "./Home.css"
import SlideProductsLoading from "../../components/SlideProducts/SlideProductsLoading";
import PageTransition from "../../components/PageTransition";

const categories = [ 
    "smartphones" ,
    "mobile-accessories",
    "laptops",
    "sports-accessories",
    "tablets",
    "sunglasses"
]

export default function Home() {
    const [ products , setProducts] = useState({})
    const [ loading , setLoading] = useState(true)
    
    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const result = await Promise.all(
                    categories.map(async( category) => {
                        const res = await fetch (`https://dummyjson.com/products/category/${category}`)
                        const data = await res.json()
                        return {[category] : data.products }
                    })
                )
                const productsData = Object.assign([] ,...result)
                setProducts(productsData)

            } catch(error){
                console.log("Error Fetching" , error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    } , [])
    console.log(products)
    return (
        <PageTransition>
            <div>
            <HeroSlider/>
            {loading ? (
                categories.map((category) =>(
                    <SlideProductsLoading key={category} />
                ))
            ) : (
                categories.map((category) =>(
                <SlideProducts key={category} title ={category.replace("-" , " ")}  data ={products[category]}  />
            ))
            )}
            
            </div>
        </PageTransition>
    )
}
