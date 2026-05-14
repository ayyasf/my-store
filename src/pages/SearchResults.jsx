import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import SlideProductsLoading from "../components/SlideProducts/SlideProductsLoading"
import Products from "../components/SlideProducts/Products"
import PageTransition from "../components/PageTransition"

export default function SearchResults() {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const query = new URLSearchParams(useLocation().search).get("query")

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
                const data = await res.json()
                setResults(data.products || [])
            } catch (error) {
                console.log("Search Error:", error)
            } finally {
                setLoading(false)
            }
        }

        if (query) fetchResults()  
    }, [query])

    return (
        <PageTransition key={query}>
            <div className="category-products">
                {loading ?(
                <SlideProductsLoading key={query} />
                )
                : results.length > 0 ? (
                <div className="container">
                    <div className="top-slide">
                        <h2>Results for :  {query} </h2>
                    </div>
                <div className="category-grid">
                    {results.map((item, index) => (
                    <Products item={item} key={index} />
                    ))}
                </div>
                </div>
                ) : <div className="container">
                    <p> No Results found.</p>
                </div> 
                }
            </div>
        </PageTransition>
    )
}
