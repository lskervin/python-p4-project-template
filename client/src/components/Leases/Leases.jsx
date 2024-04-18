import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import LeaseCard from "./LeaseCard";

export default function Leases() {
    const [currentPage, setCurrentPage] = useState(1);
    const [leasesPerPage] = useState(4); // Number of leases to display per page

      // Use context to access leases and setLeases
    const { leases, setLeases } = useOutletContext();
    // Get current leases
    const indexOfLastLease = currentPage * leasesPerPage;
    const indexOfFirstLease = indexOfLastLease - leasesPerPage;
    const currentLeases = leases.slice(indexOfFirstLease, indexOfLastLease);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function handleDeleteLease(id) {
        fetch(`/leases/${id}`, { method: "DELETE" })
            .then((response) => {
                if (response.ok) {
                    setLeases((leases) => leases.filter((lease) => lease.id !== id));
                } else {
                    throw new Error("Failed to delete lease");
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
                    <div className="header__item"><a id="name" className="filter__link" href="#">Start Date</a></div>
                    <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">Landlord</a></div>
                    <div className="header__item"><a id="draws" className="filter__link filter__link--number" href="#">Property Type</a></div>
                    <div className="header__item"><a id="losses" className="filter__link filter__link--number" href="#">Tenant</a></div>
                    <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Suite</a></div>
                    <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">View Lease</a></div>
                    <div className="header__item"><a id="total" className="filter__link filter__link--number" href="#">Remove Lease</a></div>
                </div>
            <div className="table-content">
                {currentLeases.map((lease) => (
                    <LeaseCard
                        key={lease.id}
                        lease={lease}
                        onDelete={handleDeleteLease}
                    />
                ))}
            </div>
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(leases.length / leasesPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))}
            </div>
        </div>
    );
}
