import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

 
// Here, we display our Navbar
function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light" >
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
           <button className="navbarBtn">File</button>
           <button className="navbarBtn">Edit</button>
            <button className="navbarBtn">View</button>
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
} export default Navbar