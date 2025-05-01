import React from 'react'
import InnerBanner from '../../Components/Header/InnerBanner'
function OrderSummary() {
return (
<div className='OrderSummaryMain'>
   <InnerBanner  Name={'Order Summary'}/>
   <div className='OrderSummaryBox'>
      <div className='container'>
         <div className='row'>
            <div className='col-md-8'>
               <div className='OrderSummaryInner'>
                  <div class="head-title">
                     <h2>Payment Method
                     </h2>
                  </div>
                  <div className='CheckListBox d-flex'>
                     <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                        <label class="form-check-label" for="flexRadioDefault1">
                        Card Payment
                        </label>
                     </div>
                     <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                        <label class="form-check-label" for="flexRadioDefault2">
                        UPI
                        </label>
                     </div>
                     <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked/>
                        <label class="form-check-label" for="flexRadioDefault3">
                        Cash On Delivery
                        </label>
                     </div>
                  </div>
                  <div className='MethodBox mt-4'>
                     <div className='row PaymentsM'>
                        <div className='form-box col-md-12 mb-4'>
                           <input src='' placeholder='Cardholder name' className='form-control'/>
                        </div>
                        <div className='form-box col-md-12 mb-4'>
                           <input src='' placeholder='Card Number' className='form-control'/>
                        </div>
                        <div className='col-md-12 '>
                           <div className='row'>
                              <div className='form-box col-md-6'>
                                 <input src='' placeholder='Exp (MM/YY)' className='form-control'/>
                              </div>
                              <div className='form-box col-md-6'>
                                 <input src='' placeholder='CVV' className='form-control'/>
                              </div>
                           </div>
                           <div className='UPIBox mt-4'>
                              <div className='form-box col-md-12 mb-4'>
                                 <input src='' placeholder='Enter UPI ID' className='form-control'/>
                              </div>
                           </div>
                           <div class="form-check mt-4">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                              <label class="form-check-label" for="flexCheckDefault">
                              I agree to the Terms and Conditions
                              </label>
                           </div>
                           <button className='btn btn-primary'>Proceed to Payment</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className='col-md-4'>
               <div className='OrderSummaryBg'>
                  <h4 className='mb-3'>Order Summary</h4>
                  <div className='Total Amount'>
                     <h3>Total Amount:</h3>
                     <b>₹63075.72</b>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
)
}
export default OrderSummary