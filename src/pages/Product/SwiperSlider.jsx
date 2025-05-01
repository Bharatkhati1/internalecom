
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductImg1 from '../../assets/images/blog-img-4.jpg'

// import required modules
import { FreeMode, Thumbs } from 'swiper/modules';

function SwiperSlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
<>
<Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src={ProductImg1}/>
        </SwiperSlide>
        <SwiperSlide>
        <img src={ProductImg1}/>
        </SwiperSlide>
        <SwiperSlide>
        <img src={ProductImg1}/>
        </SwiperSlide>
        <SwiperSlide>
        <img src={ProductImg1}/>
        </SwiperSlide>
 
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
        <img src={ProductImg1}/>
        </SwiperSlide>
        <SwiperSlide>
        <img src={ProductImg1}/>
        </SwiperSlide>
        <SwiperSlide>
        <img src={ProductImg1}/>
        </SwiperSlide>

        <SwiperSlide>
        <img src={ProductImg1}/>
        </SwiperSlide>
   
      </Swiper>
      </>
 
  )
}

export default SwiperSlider