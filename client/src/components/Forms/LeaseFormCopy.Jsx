import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom';

export default function LeaseForm({
  onLeaseRequest,
  lease,
  edit,
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

  const { leases, properties, landlord} = useOutletContext();

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
      <form  style={{ width: "8.5in", height: "11in", padding: "0.5in" }}onSubmit={handleSubmit}>
        <div>
          <h1 style={{ textAlign: "center" }}>{landlordData? landlordData.name: "Loading..."} </h1>
          <p style={{ fontSize: "smaller", textAlign: "center" }}>201 South State Road 7, Plantation FL. 33317</p>
          <p style={{ fontSize: "smaller", textAlign: "center" }}>(754) 315-9683</p>
          <h1 style={{ textAlign: "center" }}>Lease Agreement </h1>
          <p>Shopping Mall
            <br/>
            Address: 201 South State Road 7, Plantation FL. 33317
          </p>
          <h4>LANDLORD: {landlordData? landlordData.name: "Loading..."} </h4>
          <label htmlFor="landlordAddress" className="block font-medium text-gray-700">
            Landlord Mailing Address: {landlordData? landlordData.mailing_address: "Loading..."}
          </label>
          <h4>TENANT: </h4>
          <label htmlFor="tenantTradeName" className="block font-medium text-gray-700">
            Tenant Trade Name:
          </label>
          <input
            type="text"
            id="tenantTradeName"
            name="tenantTradeName"
            className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
            placeholder="Enter Tenant Trade Name"
          />
          <br/>
          <label htmlFor="tenantAddress" className="block font-medium text-gray-700">
            Tenant Mailing Address:
          </label>
          <input
            type="text"
            id="tenantAddress"
            name="tenantAddress"
            className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
            placeholder="Enter Tenant Address"
          />
          <div>
            <p>Tenant Contact Number:
            <div style={{ display: 'flex', gap: '10px' }}>
              <label htmlFor="tenantBusiness" className="block font-medium text-gray-700">
                Business:
              </label>
              <input
                type="text"
                id="tenantBusiness"
                name="tenantBusiness"
                className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter Business Number"
              />
              <label htmlFor="tenantCell" className="block font-medium text-gray-700">
                Cell:
              </label>
              <input
                type="text"
                id="tenantCell"
                name="tenantCell"
                className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter Cell Number"
              />
            </div>
            </p>
          </div>
          <div>
          <p>Lease Premises:
            <div style={{ display: 'flex', gap: '10px' }}>
              <label htmlFor="squareFeet" className="block font-medium text-gray-700">
                Approximately
              </label>
              <input
                type="number"
                id="squareFeet"
                name="squareFeet"
                className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter Square Feet"
              />
              <label htmlFor="suite" className="block font-medium text-gray-700">
                Suite:
              </label>
              <input
                type="text"
                id="suite"
                name="suite"
                className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Enter Suite Number"
              />
            </div>
            </p>
          </div>
          <p>The area of such space is measured from the outside face of all exterior walls
            <br/>
            and/or storefront glass surface and if there are any shared interior demising
            <br/>
            walls, then the centerline of such wall. Both parties shall be in agreement
            <br/>
            with the leasable size of the premises within the Shoppoing Center. 
          </p>
          <p><h4>Guarantor(s):</h4> I/We authorized Brodward Presidential Center to obtain information
          <br/>
          requested, concerning statement made within this Lease Agreement. We and
          <br/>
          each of use do certify the we shall be individually and severally abide, responsible
          <br/>
          and obligated to the entire Lease Agreement.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <label htmlFor="printName" className="block font-medium text-gray-700">
              Print Name:
            </label>
            <input
              type="text"
              id="printName"
              name="printName"
              className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Enter Print Name"
            />
            <label htmlFor="dateOfBirth" className="block font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
            />
            <label htmlFor="socialSecurity" className="block font-medium text-gray-700">
              Social Security Number:
            </label>
            <input
              type="text"
              id="socialSecurity"
              name="socialSecurity"
              className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Enter SSN"
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <label htmlFor="printName" className="block font-medium text-gray-700">
              Print Name:
            </label>
            <input
              type="text"
              id="printName"
              name="printName"
              className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Enter Print Name"
            />
            <label htmlFor="dateOfBirth" className="block font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
            />
            <label htmlFor="socialSecurity" className="block font-medium text-gray-700">
              Social Security Number:
            </label>
            <input
              type="text"
              id="socialSecurity"
              name="socialSecurity"
              className="border-b border-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="Enter SSN"
            />
          </div>
          <p>been duly authorized and approved by all necessary Corporate, Partnership, or
          <br/>
            Limited Liablity Company.
          <br/>
          <br/>
          (F) This lease shall be deemed to have been executed in the state of <select>
            {stateCodes.map((stateCode) => (
              <option key={stateCode} value={stateCode}>
                {stateCode}
              </option>
            ))}
          </select>
          <br/>
          and the interpretation, construction and performance of this lease shall be
          <br/>
          governed by the law of the state.
          </p>
          <p>(G) This lease shall be executed by the parties hereto by original signatures.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <p>55 In Witness Whereof: The Parties hereto have duly executed this lease in 
              <br/>
              duplicate, indivually or through their authorized officers, agents or attorney and
              <br/>
              have their respective seals to be affixed hereto.
            </p>
          </div>
          <p/>
          <div style={{ display: 'flex', gap: '10px' }} >
            <div className="-signature-box">
              <label htmlFor="signature">56. Executed by:</label>
              <input
                type="text"
                id="signature"
                name="signature"
                placeholder="Sign here"
              />
            </div>
            <div className="-date-box">
              <label htmlFor="signature">Date:</label>
              <input
                type="date"
                id="date-signed"
                name="date-signed"
                placeholder="Select Date"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }} >
            <div className="signature-box">
              <label htmlFor="signature">Witness:</label>
              <input
                type="text"
                id="signature"
                name="signature"
                placeholder="Sign here"
              />
            </div>
            <div className="date-box">
              <label htmlFor="signature">Date:</label>
              <input
                type="date"
                id="date-signed"
                name="date-signed"
                placeholder="Select Date"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }} >
            <div className="tenant-signature-box">
              <label htmlFor="signature">Executed by:</label>
              <input
                type="text"
                id="signature"
                name="signature"
                placeholder="Sign here"
              />
            </div>
            <div className="tenant-date-box">
              <label htmlFor="signature">Date:</label>
              <input
                type="date"
                id="date-signed"
                name="date-signed"
                placeholder="Select Date"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }} >
            <div className="signature-box">
              <label htmlFor="signature">Witness:</label>
              <input
                type="text"
                id="signature"
                name="signature"
                placeholder="Sign here"
              />
            </div>
            <div className="date-box">
              <label htmlFor="signature">Date:</label>
              <input
                type="date"
                id="date-signed"
                name="date-signed"
                placeholder="Select Date"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }} >
            <div className="notary-signature-box">
              <label htmlFor="signature">Notary:</label>
              <input
                type="text"
                id="signature"
                name="signature"
                placeholder="Sign here"
              />
            </div>
            <div className="tenant-date-box">
              <label htmlFor="signature">Date:</label>
              <input
                type="date"
                id="date-signed"
                name="date-signed"
                placeholder="Select Date"
              />
            </div>
          </div>        
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

