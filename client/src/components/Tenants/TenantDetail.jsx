import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import TenantForm from "../Forms/TenantForm";


function TenantDetail() {
    const [{ data: tenant, error, status }, setTenant] = useState({
      data: null,
      error: null,
      status: "pending",
    });
    const [showEdit, setShowEdit] = useState(false);
  
    const { id } = useParams();

  
    const fetchTenant = useCallback(async () => {
      try {
        const res = await fetch(`/tenants/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch tenant");
        }
        const tenantJSON = await res.json();
        setTenant({ data: tenantJSON, error: null, status: "resolved" });
      } catch (error) {
        setTenant({ data: null, error: error.message, status: "rejected" });
      }
    }, [id]);
  
    useEffect(() => {
      fetchTenant().catch(console.error);
    }, [id]);
  
    console.log(tenant);
    function handleUpdateTenant() {
      fetchTenant();
      setShowEdit(false);
    }
  
    if (status === "pending") return <h2>Loading...</h2>;
    if (status === "rejected") return <h2>Error: {error}</h2>;
    if (!tenant) return <h2>No data available</h2>; // Add this check
    const guarantors = tenant.guarantors
    console.log(guarantors)
    return (
        <div>
            <h2>Tenant Details:</h2>
            <h3>Tenant ID: {tenant.id}</h3>
            <h4>Full Name: {tenant.name}</h4>
            <h5>Trade Name: {tenant.trade_name}</h5>
            <h5>Mailing Address: {tenant.mailing_address}</h5>
            <h5>Business: {tenant.business_number}</h5>
            <h5>Cell: {tenant.cell_number}</h5>
            <h5>Tenant Guarantor(s):</h5>
            {guarantors && guarantors.length > 0 ? (
                  guarantors.map((guarantor) => (
                      <div key={guarantor.id}>
                          <p>Full Name: {guarantor.full_name}</p>
                          <p>Date of Birth: {guarantor.date_of_birth}</p>
                          <p>SSN: {guarantor.ssn}</p>
                      </div>
                  ))
              ) : (
                  <p>No Guarantors</p>
              )}
            <button onClick={() => setShowEdit((showEdit) => !showEdit)}>
                Edit Lease
            </button>
            {showEdit && (
                <TenantForm
                tenant={tenant}
                onTenantRequest={handleUpdateTenant}
                edit={true}
                />
            )}
            <hr />
        </div>

      );
      
  }
  
export default TenantDetail;
  


