import React from 'react'
import InnerBanner from '../Components/Header/InnerBanner'
import Accordion from 'react-bootstrap/Accordion';
function FAQ() {
return (
<div className='SectionFaq'>
   <InnerBanner  Name={'FAQ'}/>
   <div className='FAQinner'>
      <div className='container'>
         <div class="head-title">
            <h2>FAQ</h2>
         </div>
         <div>
            <Accordion defaultActiveKey="0">
               <Accordion.Item eventKey="0">
                  <Accordion.Header>Are there any special discounts or promotions available during the event?</Accordion.Header>
                  <Accordion.Body>
                     <p>Yes! We offer exclusive discounts and promotional offers during the event. Stay tuned for more details.</p>
                  </Accordion.Body>
               </Accordion.Item>
               <Accordion.Item eventKey="1">
                  <Accordion.Header>What are the dates and locations for the product launch events?</Accordion.Header>
                  <Accordion.Body>
                     <p>The product launch events are scheduled for March 15 in New York and March 20 in San Francisco.</p>
                  </Accordion.Body>
               </Accordion.Item>
               <Accordion.Item eventKey="2">
                  <Accordion.Header>Can I bring a guest with me to the product launch event?</Accordion.Header>
                  <Accordion.Body>
                     <p>Yes, you are allowed to bring one guest. Please ensure they are registered in advance.</p>
                  </Accordion.Body>
               </Accordion.Item>
               <Accordion.Item eventKey="3">
                  <Accordion.Header>Are there any special discounts or promotions available during the event?</Accordion.Header>
                  <Accordion.Body>
                     <p>Yes! We offer exclusive discounts and promotional offers during the event. Stay tuned for more details.</p>
                  </Accordion.Body>
               </Accordion.Item>
               <Accordion.Item eventKey="4">
                  <Accordion.Header>What are the dates and locations for the product launch events?</Accordion.Header>
                  <Accordion.Body>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                     minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                     aliquip ex ea commodo consequat. Duis aute irure dolor in
                     reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                     pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                     culpa qui officia deserunt mollit anim id est laborum.
                  </Accordion.Body>
               </Accordion.Item>
               <Accordion.Item eventKey="5">
                  <Accordion.Header>Can I bring a guest with me to the product launch event?</Accordion.Header>
                  <Accordion.Body>
                     <p>Yes, you are allowed to bring one guest. Please ensure they are registered in advance.</p>
                  </Accordion.Body>
               </Accordion.Item>
               <Accordion.Item eventKey="6">
                  <Accordion.Header>Are there any special discounts or promotions available during the event?</Accordion.Header>
                  <Accordion.Body>
                     <p>Yes! We offer exclusive discounts and promotional offers during the event. Stay tuned for more details.</p>
                  </Accordion.Body>
               </Accordion.Item>
               <Accordion.Item eventKey="7">
                  <Accordion.Header>What are the dates and locations for the product launch events?</Accordion.Header>
                  <Accordion.Body>
                     <p>The product launch events are scheduled for March 15 in New York and March 20 in San Francisco.</p>
                  </Accordion.Body>
               </Accordion.Item>
            </Accordion>
         </div>
      </div>
   </div>
</div>
)
}
export default FAQ