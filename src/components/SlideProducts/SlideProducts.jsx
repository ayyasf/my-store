import Products from "./Products";
import "./SlideProducts.css"

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper , SwiperSlide } from "swiper/react";

export default function SlideProducts( { data ,title } ) {
    console.log(data);
    
    return (
    <div className="slide-products slide">
        <div className="container">
            <div className="top-slide">
                <h2>{title}</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia.</p>
            </div>
            <Swiper  loop={true}
                navigation={true}  
                modules={[Navigation , Autoplay]}   
                className='mySwiper'  
                slidesPerView={3}
                spaceBetween={20}>
                    {data.map((item) => {
                        return(
                        <SwiperSlide> <Products item ={item}/> </SwiperSlide>
                        )
                    })} 
            </Swiper>
        </div>
    </div>
    )
}
