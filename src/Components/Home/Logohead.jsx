import React from 'react'
import logoImage from '../../assets/images/company-logo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faHeart,faUser,faCartShopping,faBell } from '@fortawesome/free-solid-svg-icons';
function Logohead() {
return (
<div className='sec-heade'>
   <div className='container'>
      <div className="sec-heade-inner d-flex justify-content-between">
         <a href="" className="company-logo"><img className='logo-img' src={logoImage}/></a>
         <div className="sec-heade-center">
            <div className="search-box d-flex">
               <input type="text" placeholder="Search on product or category" className="form-control"/>
               <button className="btn search-btn">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
               </button>
            </div>
         </div>
         <div className="sec-heade-r d-flex align-items-center">
         <a className="Search-sec MobileViewIcon">
         <FontAwesomeIcon icon={faMagnifyingGlass} />
            </a>
            <a className="wish-sec">
               <FontAwesomeIcon icon={faHeart} />
            </a>
            <a className="cart-sec">
               <FontAwesomeIcon icon={faCartShopping} />
            </a>
            <a className="noti-sec">
               <small className="noti-text">1</small>
               <FontAwesomeIcon icon={faBell} />
            </a>
            <Dropdown className='dropdown user-drop-down '>
               <Dropdown.Toggle  id="dropdown-basic" className='btn  dropdown-toggle mt-0'>
                  <FontAwesomeIcon icon={faUser} />
               </Dropdown.Toggle>
               <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
         </div>
      </div>
   </div>
</div>
)
}
export default Logohead