import React, { useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import feather from "feather-icons";
import GridLoader from "react-spinners/GridLoader";

function NavBar() {
  // Use useEffect to initialize Feather icons after the component renders
  useEffect(() => {
    // Initialize Feather icons
    feather.replace();
  }, []);
  return (
    <Suspense fallback={<GridLoader />}>
      <div className="nav-bar">  
        <nav className="navbar">
          <ul className="navbar__menu">
            <li className="navbar__item">
              <Link className="navbar__link" to="/leases/"><i data-feather="file-text"></i><span>View Leases</span></Link>       
            </li>
            <li className="navbar__item">
              <Link className="navbar__link" to="leases/new-lease/"><i data-feather="file-plus"></i><span>Add New Lease</span></Link>   
            </li>
            <li className="navbar__item">
              <Link className="navbar__link" to="/tenants/"><i data-feather="users"></i><span>View Tenants</span></Link>       
            </li>
            <li className="navbar__item">
              <Link className="navbar__link" to="tenants/new-tenant/"><i data-feather="user-plus"></i><span>Add New Tenant</span></Link>         
            </li>
          </ul>
        </nav>
      </div>
    </Suspense>
  );
};

export default NavBar;

