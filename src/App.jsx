import { Route, Routes} from "react-router-dom"
import BottomHeader from "./components/Header/BottomHeader"
import TopHeader from "./components/Header/TopHeader"
import Home from "./pages/Home/Home"
import ProductsDetails from "./pages/ProductsDetails/ProductsDetails"
import Cart from "./pages/Cart/Cart"
import { Toaster } from "react-hot-toast"
import useScrollToTop from "./components/useScrollToTop"
import { AnimatePresence } from "framer-motion"
import CategoryPage from "./pages/CategoryPage/CategoryPage"
import SearchResults from "./pages/SearchResults"
import Favorites from "./pages/Favorites/Favorites"


function App() {
  useScrollToTop()
  
  return (
    <>
    <div className="fixed">
        <TopHeader/>
        <BottomHeader/>
      </div>
      <Toaster
        position="bottom-right" 
        toastOptions={{
          style: {
              borderRadius: '5px',
              background: '#e9e9e9',
              padding: '14px'
          },
        }
        }/>
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/cart" element={ <Cart />} />
        <Route path="/favorites" element={ <Favorites />} />
        <Route path="/search" element={ <SearchResults />} />
        <Route path="/products/:id" element={ <ProductsDetails />} />
        <Route path="/category/:category" element={ <CategoryPage />} />
      </Routes>
    </AnimatePresence>
    </>
  )
}

export default App
