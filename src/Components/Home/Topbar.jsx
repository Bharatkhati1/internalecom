import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPhone } from '@fortawesome/free-solid-svg-icons';
function Topbar() {
return (
<div className="top-bar">
   <div className="container">
      <div className="top-bar-inner d-flex justify-content-between">
         <span className="top-info">
            <FontAwesomeIcon icon={faHouse} />
            Jagatpura Jaipur 185669
         </span>
         <span className="top-info">
            <FontAwesomeIcon icon={faPhone} className="pe-2" />
            1800333665
         </span>
      </div>
   </div>
</div>
);
}
export default Topbar;