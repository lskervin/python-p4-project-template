import React from "react";
import { Link } from "react-router-dom";
import rocket from "../assets/logo.jpg";

function Header() {
  // const headerStyle = {
  //   backgroundImage: `url(${rocket})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   width: "100%",
  //   height: "200px", // Adjust the height as needed
  // };
  // style={headerStyle}
  // style={{ width: "155px", height: "43px" }}

  return (
    <div className="header-outer">
      <div className="header-inner responsive-wrapper">
        <div className="header-logo">
          {/* You can keep your logo here */}
          <img src={rocket} alt="Logo"  />
        </div>
        <nav className="header-navigation">
          <Link to="/">Home</Link>
          <a href="#">FAQs</a>
          <a href="#">Login</a>
          <a href="#">Sign-Up</a>
          <button>Menu</button>
        </nav>
      </div>
    </div>
      
  );
  
}

export default Header;
