import { IoMenuSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";

const NavLinks =[
    { title:"Home" , link:"/" } ,
    { title:"About" , link:"/about" } ,
    { title:"Accessories" , link:"/accessories" } ,
    { title:"Blog" , link:"/blog" } ,
    { title:"Contact" , link:"/contact" } ,
] 

export default function BottomHeader() {

    const location = useLocation( )
    const[categories , setCategories]  = useState([])
    const[isCategoriesOpen , setIsCategoriesOpen]  = useState(false)

    useEffect(( ) =>{
        fetch('https://dummyjson.com/products/categories')
        .then(( res)=> res.json( ))
        .then((data)=> setCategories(data))
    },[] )
    useEffect(( ) =>{
        setIsCategoriesOpen(false)
    },[location] )

    return (
        <div className="bottom-header">
            <div className="container">
                <nav className="nav">
                    <div className="category-nav">
                        <div className="category-btn" onClick={( ) => setIsCategoriesOpen(!isCategoriesOpen)}>
                                <IoMenuSharp />
                                <p>Browser Category</p>
                                <IoMdArrowDropdown />
                        </div>
                        <div className={`category-nav-list ${isCategoriesOpen?"active" : "" }`}>
                            {categories.map((category ) => (
                                <Link key={category.slug} to={`/category/${category.slug.trim()}`}>{category.name}</Link>
                            
                            ))}
                        </div>
                    </div>
                    <div className="nav-links">
                        {NavLinks.map((item) => (
                            <li key={item.link} className={location.pathname === item.link? "active" : ""}><Link to={item.link}>{item.title}</Link></li>
                    ))}
                    </div>
                </nav>
                <div className="sign-regs-icon">
                    <Link to="/"><PiSignInBold /></Link>
                    <Link to="/"><FaUserPlus /></Link>
                </div>
            </div>
        </div>
    )
}

