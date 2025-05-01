import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import sliderImage from '../../assets/images/main-banner.jpg'
import TopBannerImg1 from '../../assets/images/TopBanner-01.jpg'
import TopBannerImg2 from '../../assets/images/TopBanner-02.jpg'
import TopBannerImg3 from '../../assets/images/TopBanner-03.jpg'
import TopBannerImg4 from '../../assets/images/TopBanner-04.jpg'
function Slider() {
return (
<>
<section className='banner-sec'>
   <div className='container'>
      <div className='row'>
         <div className='col-md-6 banner-sec-left'>
            <Carousel>
               <Carousel.Item>
                  {/* 
                  <ExampleCarouselImage text="First slide" />
                  */}
                  <img src={sliderImage}/>
                  <figcaption className='main-slider-content'>
                     <span>Supercharged for pros.</span>
                     <h3>iPad S13+ Pro.</h3>
                     <p>From $999.00 or $41.62/mo. <br/>for 24 mo. Footnote*</p>
                     <a className="slider-btn">Add to cart</a>
                  </figcaption>
               </Carousel.Item>
               <Carousel.Item>
                  {/* 
                  <ExampleCarouselImage text="Second slide" />
                  */}
                  <img src={sliderImage}/>
                  <figcaption className='main-slider-content'>
                     <span>Supercharged for pros.</span>
                     <h3>iPad S13+ Pro.</h3>
                     <p>From $999.00 or $41.62/mo. <br/>for 24 mo. Footnote*</p>
                     <a className="slider-btn">Add to cart</a>
                  </figcaption>
               </Carousel.Item>
               <Carousel.Item>
                  <img src={sliderImage}/>
                  {/* 
                  <ExampleCarouselImage text="Third slide" />
                  */}
                  <figcaption className='main-slider-content'>
                     <span>Supercharged for pros.</span>
                     <h3>iPad S13+ Pro.</h3>
                     <p>From $999.00 or $41.62/mo. <br/>for 24 mo. Footnote*</p>
                     <a className="slider-btn">Add to cart</a>
                  </figcaption>
               </Carousel.Item>
            </Carousel>
         </div>
         <div className='col-md-6 banner-sec-right'>
            <div className='row'>
               <div className='col-md-6'>
                  <div className="banner-content">
                     <figure><img src={TopBannerImg1}/></figure>
                     <figcaption className="br-sub-content">
                        <span>Best sale</span>
                        <h3>Laptops Max </h3>
                        <p>From $1699.00 or <br/>$64.62/mo.
                        </p>
                     </figcaption>
                  </div>
               </div>
               <div className='col-md-6'>
                  <div className="banner-content">
                     <figure><img src={TopBannerImg2}/></figure>
                     <figcaption className="br-sub-content">
                        <span>Best sale</span>
                        <h3>Laptops Max </h3>
                        <p>From $1699.00 or <br/>$64.62/mo.
                        </p>
                     </figcaption>
                  </div>
               </div>
               <div className='col-md-6'>
                  <div className="banner-content">
                     <figure><img src={TopBannerImg3}/></figure>
                     <figcaption className="br-sub-content">
                        <span>Best sale</span>
                        <h3>Laptops Max </h3>
                        <p>From $1699.00 or <br/>$64.62/mo.
                        </p>
                     </figcaption>
                  </div>
               </div>
               <div className='col-md-6'>
                  <div className="banner-content">
                     <figure><img src={TopBannerImg4}/></figure>
                     <figcaption className="br-sub-content">
                        <span>Best sale</span>
                        <h3>Laptops Max </h3>
                        <p>From $1699.00 or <br/>$64.62/mo.
                        </p>
                     </figcaption>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
</>
)
}
export default Slider