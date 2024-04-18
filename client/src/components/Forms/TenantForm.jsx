import React, { useState } from "react";

export default function TenantForm({
  onTenantRequest,
  tenant = {
    address:'',
    first_name: '',
    last_name: ''
  },
  edit,
}) {
  const [formData, setFormData] = useState(tenant);
  const [errors, setErrors] = useState([]);

  async function postTenant() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/tenants", config);
    if (res.ok) {
      const newTenant = await res.json();
      onTenantRequest(newTenant);
      setFormData({
        address:'',
        first_name: '',
        last_name: ''
      });
      setErrors([]);
    } else {
      const messages = await res.json();
      setErrors(messages.errors);
    }
  }

  async function updateTenant() {
    const updateData = {
      start_date: formData.address,
      first_name: formData.first_name,
      last_name:formData.last_name
    };
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    };
    const res = await fetch(`/tenants/${tenant.id}`, config);
    if (res.ok) {
      onTenantRequest();
      setFormData({
        address:'',
        first_name: '',
        last_name: ''
      });
      setErrors([]);
    } else {
      const messages = await res.json();
      setErrors(messages.errors);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (edit) {
      updateTenant();
    } else {
      postTenant();
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2>{tenant.last_name ? "Edit Tenant" : "Add New Tenant"}</h2>
        <div>
          <label htmlFor="first_name">Tenant First Name:</label>
        </div>
        <div>
          <input
            type="text"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Tenant Last Name:</label>
        </div>
        <div>
          <input
            type="text"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Tenant Address:</label>
        </div>
        <div>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        {errors.map((err) => (
          <p key={err} style={{ color: "red" }}>
            {err}
          </p>
        ))}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
