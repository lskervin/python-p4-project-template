import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import TenantCard from "./TenantCard";

export default function Tenants() {
    const [currentPage, setCurrentPage] = useState(1);
    const [tenantsPerPage] = useState(4); // Number of tenants to display per page

    const { tenants, setTenants } = useOutletContext();

    // Get current tenants
    const indexOfLastTenant = currentPage * tenantsPerPage;
    const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
    const currentTenants = tenants.slice(indexOfFirstTenant, indexOfLastTenant);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function handleDeleteTenant(id) {
        fetch(`/tenants/${id}`, { method: "DELETE" })
            .then((response) => {
                if (response.ok) {
                    setTenants((tenants) => tenants.filter((tenant) => tenant.id !== id));
                } else {
                    throw new Error("Failed to delete tenant");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className='contaner'>
            <div className="table">
                <div className="table-header">
                    <div className="header__item"><a id="name" className="filter__link" href="#">Name</a></div>
                    <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">Trade Name</a></div>
                    <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">Business Number</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Cell Number</a></div>
                    <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Suite</a></div>
                    <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">View Tenant</a></div>
                </div>
            <div className="table-content">
            <div className="tenant-list">
                {currentTenants.map((tenant) => (
                    <TenantCard
                        key={tenant.id}
                        tenant={tenant}
                        onDelete={handleDeleteTenant}
                    />
                ))}
            </div>
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(tenants.length / tenantsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))}
            </div>
        </div>
    </div>
    );
}
