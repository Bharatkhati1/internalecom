import React from 'react'
import InnerBanner from '../Components/Header/InnerBanner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faEnvelope,faHouse } from '@fortawesome/free-solid-svg-icons';
import ContactBg from '../assets/images/contact-us-bg.png'
export default function ContactU() {
return (
<div className=''>
   <InnerBanner  Name={'Contact Us'}/>
   <div className='ContactUsInner'>
      <div className='container'>
         <div className='row'>
            <div className='col-md-6 ContactUsInnerLeft'>
               <div className='ContactUsInnerLeftBg'>
                  <div class="head-title">
                     <h2>Leave us a Message</h2>
                  </div>
                  <div className='row'>
                     <div className='col-md-6 mb-4'>
                        <label>Name</label>
                        <input type='text' placeholder='Enter Your Name' className='form-control' />
                     </div>
                     <div className='col-md-6 mb-4'>
                        <label>Email</label>
                        <input type='email' placeholder='Enter Your Email' className='form-control' />
                     </div>
                     <div className='col-md-12 mb-4'>
                        <label>Subject</label>
                        <input type='email' placeholder='Enter Your Subject' className='form-control' />
                     </div>
                     <div className='col-md-12 textarea-box'>
                        <label>Message</label>
                        <textarea className='form-control'/>
                     </div>
                     <div className='btn-box'> <button className='btn btn-primary'>Submit</button></div>
                  </div>
               </div>
            </div>
            <div className='col-md-6 ContactUsInnerRight'>
               <div className='ContactUsInnerRightBg'>
                  <ul className='contact-info-list'>
                     <li>
                        <a href='tel:+1-800-123-4567'>
                           <FontAwesomeIcon icon={faPhone} />
                           <span>+91-800-123-4567</span>
                        </a>
                     </li>
                     <li>
                        <a href='mailto:sales@glowify.com'>
                           <FontAwesomeIcon icon={faEnvelope} />
                           <span>Sales@glowify.com</span>
                        </a>
                     </li>
                     <li>
                        <a>
                           <FontAwesomeIcon icon={faHouse} />
                           <span>123 Stree New York City , United States Of America NY 750065.</span>
                        </a>
                     </li>
                  </ul>
                  <div className='ContactBottomBg'>
                     <figure><img src={ContactBg}/></figure>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div className='frame-box'>
      <iframe
      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d28489.80408919635!2d75.86119679999999!3d26.8009472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m1!3e6!5e0!3m2!1sen!2sin!4v1743596572115!5m2!1sen!2sin"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
   </div>
</div>
)
}