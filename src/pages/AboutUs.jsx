import React from 'react'
import InnerBanner from '../Components/Header/InnerBanner'
import GridImg1 from '../assets/images/grid-img-1.jpg'
import GridImg2 from '../assets/images/grid-2.jpg'
import GridImg3 from '../assets/images/grid-3.jpg'
import ProductImg2 from '../assets/images/product-img-2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import OwlCarousel from "react-owl-carousel"
import IconIMG1 from '../assets/images/icon-1.png'
import IconIMG2 from '../assets/images/icon-2.png'
import IconIMG3 from '../assets/images/icon-3.png'
import IconIMG4 from '../assets/images/icon-4.png'
import TeamImg1 from '../assets/images/team1.jpg'
import TeamImg2 from '../assets/images/team2.jpg'
import TeamImg3 from '../assets/images/team3.jpg'
import TeamImg4 from '../assets/images/team4.jpg'


function AboutUs() {
return (
<div className='abouts-us-page'>
   <InnerBanner  Name={'About Us'}/>
   <div className='inner-page-about section-space'>
      <div className='container'>
         <div className='row InnerRowMain align-items-center'>
            <div className='col-md-6 InnerAboutLeft'>
               <div className='row about-sec-group'>
                  <div className='col-md-6 AboutSection1 AboutSectionLeft'>
                     <img src={GridImg1}/>
                  </div>
                  <div className='col-md-6 AboutSectionRight'>
                     <div className='row'>
                        <div className='col-md-12 AboutSection2'><img src={GridImg2}/></div>
                        <div className='col-md-12 AboutSection3'><img src={GridImg3}/></div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='col-md-6 InnerAboutRight'>
               <h2>Who We <span>Are?</span></h2>
               <p>We’re here to serve only the best products for you. Enriching your homes with the best essentials.</p>
               <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
               <p>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
               <ul className='InnerAboutList'>
                  <li>Lorem Ipsum is simply dummy.</li>
                  <li>Lorem Ipsum is simply dummy.</li>
                  <li>Lorem Ipsum is simply dummy.</li>
                  <li>Lorem Ipsum is simply dummy.</li>
                  <li>Lorem Ipsum is simply dummy.</li>
               </ul>
            </div>
         </div>
      </div>
   </div>
   <div className='WhyChooseUs'>
      <div className='container'>
         <div className='inner-title text-center'>
            <h2>Why Choose Us?</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
         </div>
         <div className='row pt-5'>
            <div className='col-md-3'>
               <div className='WhyCooseBox'>
                  <figure><img src={IconIMG1}/></figure>
                  <h3>High-Quality Digital Products</h3>
                  <p>We offer a carefully curated selection of top-tier digital products, ensuring you get the best value for your money.
                  </p>
               </div>
            </div>
            <div className='col-md-3'>
               <div className='WhyCooseBox'>
                  <figure><img src={IconIMG3}/></figure>
                  <h3> Access & Secure Downloads
                  </h3>
                  <p>No waiting—your purchases are available for instant download with a secure and seamless process.
                  </p>
               </div>
            </div>
            <div className='col-md-3'>
               <div className='WhyCooseBox'>
                  <figure><img src={IconIMG2}/></figure>
                  <h3>Easy & Secure Payments</h3>
                  <p>We support multiple payment options with top-notch security to keep your transactions safe.
                  </p>
               </div>
            </div>
            <div className='col-md-3'>
               <div className='WhyCooseBox'>
                  <figure><img src={IconIMG4}/></figure>
                  <h3>Excellent Customer Support</h3>
                  <p>Our dedicated team is here to assist you with any questions or technical issues, ensuring a smooth shopping experience.
                  </p>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div className='OurTeemMember'>
      <div className='container'>
         <div class="head-title ">
            <h2 className=' mb-4'>Our Team Members</h2>
         </div>
         <div className='MeetOurTeamsOwl'>
            <OwlCarousel 
            className='owl-theme'  
            margin={30} 
            nav={true}
            dots={false}
            autoplay
            items ={4}
            autoplayTimeout={3000}
            responsive={
            {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 5 },
            }
            }
            >
            <div className='item'>
               <figure>
                  <img src={TeamImg1}/>
               </figure>
               <figcaption>
                  <h4>Emma Welson</h4>
                  <span>Leader</span>
               </figcaption>
            </div>
            <div className='item'>
               <figure>
                  <img src={TeamImg2}/>
               </figure>
               <figcaption>
                  <h4>Emma Welson</h4>
                  <span>Leader</span>
               </figcaption>
            </div>
            <div className='item'>
               <figure>
                  <img src={TeamImg3}/>
               </figure>
               <figcaption>
                  <h4>Emma Welson</h4>
                  <span>Leader</span>
               </figcaption>
            </div>
            <div className='item'>
               <figure>
                  <img src={TeamImg4}/> 
               </figure>
               <figcaption>
                  <h4>Emma Welson</h4>
                  <span>Leader</span>  
               </figcaption>
            </div>
            <div className='item'>
               <figure>
                  <img src={TeamImg3}/> 
               </figure>
               <figcaption>
                  <h4>Emma Welson</h4>
                  <span>Leader</span>
               </figcaption>
            </div>
            <div className='item'>
               <figure>
                  <img src={TeamImg1}/> 
               </figure>
               <figcaption>
                  <h4>Emma Welson</h4>
                  <span>Leader</span>
               </figcaption>
            </div>
            </OwlCarousel>
         </div>
      </div>
   </div>
</div>
)
}
export default AboutUs