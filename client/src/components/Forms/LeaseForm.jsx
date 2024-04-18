import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom';

export default function LeaseForm({
  onLeaseRequest,
  lease,
  edit,
  handleDelete,
  setFormTenant,
  handleSubmit
}) {
  const [formData, setFormData] = useState({
    start_date:'',
    landlord_id:1,
    property_id:1,
    tenant_id:'',
    guarantor_id:'',
    suite_id:'',
    state:'FL',
    country:'USA'
  });
  const [errors, setErrors] = useState([]);
  const stateCodes = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const { leases, properties, landlord, tenants} = useOutletContext();

  const [leaseData, setLeaseData] = useState(leases)

  async function handleSubmit(e) {
    e.preventDefault();
    const method = edit ? "PATCH" : "POST";
    const url = edit ? `/leases/${lease.id}` : "/leases";


    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch(url, config);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors.join(", "));
      }

      onLeaseRequest(data);
      setFormData({
        start_date:'',
        landlord_id:1,
        property_id:1,
        tenant_id:'',
        guarantor_id:'',
        suite_id:'',
        state:'FL',
        country:'USA'
      });
      setErrors([]);
    } catch (error) {
      setErrors([error.message]);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const landlordData = landlord[0]
  console.log(landlordData)
  return (
    <section>
      <form onSubmit={handleSubmit}>
      <div className="window-main-body-right">
				<section className="settings-section">
					<h2 className="section-title">Update Lease</h2>
          <div className="input-group">
						<label className="input-label">Select Landlord</label>
						<select>{landlord && landlord.map((item)=>{return(<option>{item.name}</option>)})}</select>
					</div>
          <div className="input-group">
						<label className="input-label">Property</label>
						<select>{properties && properties.map((property)=>{return(<option>{property.address}</option>)})}</select>
					</div>
					<div className="input-group">
						<label className="input-label">Tenant</label>
						<select id="tenant_id" onChange={(e) => {
                const selectedTenantId = e.target.value;
                setFormTenant(selectedTenantId);
                setFormData({ ...formData, tenant_id: selectedTenantId });
              }} value={formData.tenant_id}>
              {tenants && tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
              ))}
            </select>
					</div>
				</section>
				<section className="settings-section">
					<h2 className="section-title">Byline</h2>
					<div className="input-group">
          <label className="input-checkbox">
							<input type="checkbox" className="input-checkbox-box" />
							<span className="input-checkbox-toggle"></span>
							<span className="input-checkbox-label">Show author</span>
						</label>
						<label className="input-checkbox">
							<input type="checkbox" className="input-checkbox-box" />
							<span className="input-checkbox-toggle"></span>
							<span className="input-checkbox-label">Date created</span>
						</label>
						<label className="input-checkbox">
							<input type="checkbox" className="input-checkbox-box" />
							<span className="input-checkbox-toggle"></span>
							<span className="input-checkbox-label">Date edited</span>
						</label>
					</div>
				</section>
				<section className="settings-section">
					<h2 className="section-title">Actions</h2>
					<button onClick={handleDelete}className="button button--delete">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 11V20.4C19 20.7314 18.7314 21 18.4 21H5.6C5.26863 21 5 20.7314 5 20.4V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M10 17V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M14 17V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M21 7L16 7M3 7L8 7M8 7V3.6C8 3.26863 8.26863 3 8.6 3L15.4 3C15.7314 3 16 3.26863 16 3.6V7M8 7L16 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
						Move to trash
					</button>
				</section>
			</div>
        {errors.map((err, index) => (
          <p key={index} style={{ color: "red" }}>
            {err}
          </p>
        ))}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

