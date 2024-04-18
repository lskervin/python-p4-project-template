import React from 'react';

function SelectTenant({ tenants, onSelectTenant }) {
  // Handle the change event for the select element
  const handleChange = (event) => {
    const selectedTenantId = event.target.value; // Get the selected tenant's ID
    const selectedTenant = tenants.find((tenant) => tenant.id === parseInt(selectedTenantId, 10));
    onSelectTenant(selectedTenant); // Call the callback function with the selected tenant
  };

  return (
    <div>
      <label htmlFor="tenantSelect" className="block font-medium text-gray-700">
        Select a Tenant:
      </label>
      <select
        id="tenantSelect"
        name="tenantSelect"
        className="border border-gray-400 p-2 rounded"
        onChange={handleChange}
      >
        {/* Add an option for each tenant in the list */}
        <option value="">-- Please select a tenant --</option> {/* Placeholder option */}
        {tenants.map((tenant) => (
          <option key={tenant.id} value={tenant.id}>
            {tenant.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectTenant;