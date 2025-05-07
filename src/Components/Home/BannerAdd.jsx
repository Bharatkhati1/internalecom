import React from "react";
import OwlCarousel from "react-owl-carousel";
import OfferBanner from '../../assets/images/offer-banner.png'

function BannerAdd() {
return (
<div className="banner-add-sec">
   <div className="container">
      <OwlCarousel 
         className='owl-theme' 
         loop 
         margin={0} 
         nav
         autoplay
         items ={1}
         autoplayTimeout={3000}
         responsive={
            {
               0: { items: 1 },
               600: { items: 1 },
               1000: { items: 1 },
            }
         }
      >
      <div className='item'>
         <span className="shape-1"></span>
         <span className="shape-2"></span>
         <img src={OfferBanner}/>
         <figcaption className="banner-sec-content">
            <span>Style Accessories Get 30% Off</span>
            <h3>Move with the music</h3>
            <a className="btn-banner shine-btn">Shop Now</a>
         </figcaption>
      </div>
      </OwlCarousel>
   </div>
</div>
)
}
export default BannerAdd