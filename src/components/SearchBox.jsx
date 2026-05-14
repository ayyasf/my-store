import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SearchBox() {
    const [search, setSearch] = useState("");
    const [suggestion, setSuggestion] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?query=${encodeURIComponent(search.trim())}`);
        }
        setSuggestion([]);
    };

    useEffect(() => {
        const fetchSuggest = async () => {
            if (!search.trim()) {
                setSuggestion([]);
                return;
            }
            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
                const data = await res.json();
                setSuggestion(data.products.slice(0, 5) || []);
            } catch (error) {
                console.log("Search Error:", error);
                setSuggestion([]);
            }
        };

        const debounce = setTimeout(() => {
            fetchSuggest();
        }, 300);

        return () => clearTimeout(debounce);
    }, [search]);

    useEffect(() => {
        setSuggestion([]);
    }, [location]);

    return (
        <div className="search-box">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search For Product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete="off"
                />
                <button type="submit"><FaSearch /></button>
            </form>

            {suggestion.length > 0 && (
                <ul className="suggestions">
                    {suggestion.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={`/products/${item.id}`}
                                onClick={() => setSuggestion([])}
                            >
                                <img src={item.images[0]} alt={item.title} />
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
