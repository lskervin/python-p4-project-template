import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import LeaseForm from "../Forms/LeaseForm";
import { useOutletContext } from 'react-router-dom';

function LeaseDetail() {
  const [lease, setLease] = useState(null);
  const [leaseError, setLeaseError] = useState(null);
  const [leaseStatus, setLeaseStatus] = useState("pending");
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formTenant, setFormTenant] = useState("pending")
const [error, setError] = useState(null);
  const { id } = useParams();
  const { leases, setLeases, guarantors, tenants } = useOutletContext();

  function handleDelete(id) {
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

  const fetchLease = useCallback(async () => {
    try {
      const res = await fetch(`/leases/${id}`);
      if (res.ok) {
        const leaseJSON = await res.json();
        setLease(leaseJSON);
        setLeaseError(null);
        setLeaseStatus("resolved");
      } else {
        const leaseErr = await res.json();
        setLeaseError(leaseErr);
        setLeaseStatus("rejected");
      }
    } catch (error) {
      console.error(error);
      setLeaseError({ error: error.message });
      setLeaseStatus("rejected");
    }
  }, [id]);

  useEffect(() => {
    fetchLease();
  }, [id, fetchLease]);


  if (leaseStatus === "pending") {
    return <h2>Loading...</h2>;
  }

  if (leaseStatus === "rejected") {
    return <h2>Error: {leaseError ? leaseError.error : "Unknown error"}</h2>;
  }

  if (!lease) {
    return <h2>No lease data available</h2>;
  }

  
  console.log(formTenant)
  
  const landlord = lease.landlord;
  const properties = landlord.properties[0];
  const tenant = showEdit? tenants.filter((tenant)=> tenant.name === formTenant) :lease.tenant;
  const tenant_guarantors = guarantors.length > 0
    ? guarantors.filter((guarantor) => guarantor.tenant_id === lease.tenant_id)
    : [];
  const suite = tenant.suite || {};
  console.log(tenant.name)

  return (
    <main className="window-main">
      <div className="window-main-header">
        <ol className="breadcrumbs">
          <li className="breadcrumbs-item">
            <a href="#">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M9.75 9.75V21" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 9.75H21" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Lease
            </a>
          </li>
          <li className="breadcrumbs-item current">
            <a href="#">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 21.4V2.6C4 2.26863 4.26863 2 4.6 2H16.2515C16.4106 2 16.5632 2.06321 16.6757 2.17574L19.8243 5.32426C19.9368 5.43679 20 5.5894 20 5.74853V21.4C20 21.7314 19.7314 22 19.4 22H4.6C4.26863 22 4 21.7314 4 21.4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M8 10L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 18L16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 14L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {tenant? tenant.trade_name: "pending"}
            </a>
          </li>
        </ol>
        <div className="publish-actions">
          <div className="publish-info">
            <span>LAST EDITED<br />2 minutes ago</span>
          </div>
          <button onClick={() => setShowEdit(!showEdit)} className="button button--edit">
          {showEdit ? (
    <div>
        {/* SVG Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 17l5-5-5-5M19.8 12H9M10 3H4v18h6"/></svg>

        <span>Cancel</span>
        
    </div>
) : (
    <div>
        {/* SVG Icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 7H18M6 11H18M6 15H18M6 19H11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {/* Label */}
        <span>Edit</span>
    </div>
)}
          </button>        
        
        {showEdit && (<button className="button button--edit">
          <div> 
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 19V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8.6 9H15.4C15.7314 9 16 8.73137 16 8.4V3.6C16 3.26863 15.7314 3 15.4 3H8.6C8.26863 3 8 3.26863 8 3.6V8.4C8 8.73137 8.26863 9 8.6 9Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 13.6V21H18V13.6C18 13.2686 17.7314 13 17.4 13H6.6C6.26863 13 6 13.2686 6 13.6Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {/* Label */}
        <span>Save</span>
          </div></button>)}
        </div>
      </div>
      <div className="window-main-body">
        <form className="editor">
          <div className="editor-toolbar">
          <button class="editor-toolbar-item icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5 9.5C8.5 9.5 11.5 9.5 15 9.5C15.1615 9.5 19 9.5 19 13.5C19 18 15.2976 18 15 18C12 18 10 18 7 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M8.5 13C7.13317 11.6332 6.36683 10.8668 5 9.5C6.36683 8.13317 7.13317 7.36683 8.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>

					</button>
					<button class="editor-toolbar-item icon">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 9.5C15.5 9.5 12.5 9.5 9 9.5C8.83847 9.5 5 9.5 5 13.5C5 18 8.70237 18 9 18C12 18 14 18 17 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M15.5 13C16.8668 11.6332 17.6332 10.8668 19 9.5C17.6332 8.13317 16.8668 7.36683 15.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
					<span class="separator"></span>
					<button class="editor-toolbar-item dropdown">
						<span>Paragraph</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<polyline points="208 96 128 176 48 96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
						</svg>
					</button>
					<span class="separator"></span>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<path d="M64,120h88a40,40,0,0,1,0,80l-88.00586-.00488v-152L140,48a36,36,0,0,1,0,72" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
						</svg>
					</button>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="151.99414" y1="55.99512" x2="103.99414" y2="199.99512" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="63.99414" y1="199.99512" x2="143.99414" y2="199.99512" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="111.99414" y1="55.99512" x2="191.99414" y2="55.99512" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
						</svg>

					</button>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<g>
								<path d="M76.334,96.00294A25.48209,25.48209,0,0,1,75.11111,88c0-22.09139,21.96094-40,52.88889-40,23.77865,0,42.25677,10.58606,49.529,25.52014" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
								<path d="M72,168c0,22.09139,25.07205,40,56,40s56-17.90861,56-40c0-23.76634-21.62275-32.97043-45.59723-40.00076" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
							</g>
						</svg>

					</button>
					<span class="separator"></span>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<rect x="40" y="40" width="176" height="176" rx="8" stroke-width="16" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" fill="none"></rect>
							<path d="M215.99982,159.99982l-42.343-42.343a8,8,0,0,0-11.3137,0l-44.6863,44.6863a8,8,0,0,1-11.3137,0l-20.6863-20.6863a8,8,0,0,0-11.3137,0L40,176" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
							<circle cx="100" cy="92" r="12"></circle>
						</svg>
					</button>

					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="94.05511" y1="161.93204" x2="161.93736" y2="94.04979" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<path d="M144.96473,178.9102l-28.28427,28.28427a48,48,0,0,1-67.88225-67.88225L77.08248,111.028" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
							<path d="M178.91069,144.96424,207.195,116.68a48,48,0,0,0-67.88225-67.88225L111.02844,77.082" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
						</svg>
					</button>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<path d="M200,224.00005H55.99219a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8L152,32l56,56v128A8,8,0,0,1,200,224.00005Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
							<polyline points="152 32 152 88 208.008 88" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
							<line x1="96" y1="136" x2="160" y2="136" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="96" y1="168" x2="160" y2="168" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
						</svg>
					</button>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<rect x="44" y="44" width="168" height="168" rx="8" stroke-width="16" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" fill="none"></rect>
							<line x1="128" y1="44" x2="128" y2="212" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="212" y1="128" x2="44" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
						</svg>
					</button>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<path d="M24,60H152a32,32,0,0,1,32,32v96a8,8,0,0,1-8,8H48a32,32,0,0,1-32-32V68A8,8,0,0,1,24,60Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
							<polyline points="184 112 240 80 240 176 184 144" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
						</svg>
					</button>
					<span class="separator"></span>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<polyline points="64 88 16 128 64 168" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
							<polyline points="192 88 240 128 192 168" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
							<line x1="160" y1="40" x2="96" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
						</svg>
					</button>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<path d="M108,144H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8h60a8,8,0,0,1,8,8v88a40,40,0,0,1-40,40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
							<path d="M224,144H156a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8h60a8,8,0,0,1,8,8v88a40,40,0,0,1-40,40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
						</svg>
					</button>
					<span class="separator"></span>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="88" y1="64" x2="216" y2="64" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="88.00614" y1="128" x2="216" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="88.00614" y1="192" x2="216" y2="192" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<circle cx="44" cy="64" r="12"></circle>
							<circle cx="44" cy="128" r="12"></circle>
							<circle cx="44" cy="192" r="12"></circle>
						</svg>
					</button>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="104" y1="128" x2="215.99902" y2="128" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="104" y1="64" x2="215.99902" y2="64" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="103.99902" y1="192" x2="215.99902" y2="192" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<polyline points="40 60 56 52 56 107.994" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
							<path d="M41.10018,152.55059A14.00226,14.00226,0,1,1,65.609,165.82752L40,200H68" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
						</svg>
					</button>
					<span class="separator"></span>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="40" y1="68" x2="216" y2="68" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="40" y1="108" x2="168" y2="108" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="40.00614" y1="148" x2="216" y2="148" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="40.00614" y1="188" x2="168" y2="188" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
						</svg>
					</button>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="40" y1="68" x2="216" y2="68" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="64" y1="108" x2="192" y2="108" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="40.00307" y1="148" x2="215.99693" y2="148" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="64.00307" y1="188" x2="191.99693" y2="188" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
						</svg>
					</button>
					<button class="editor-toolbar-item icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="40" y1="68" x2="216" y2="68" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="88" y1="108" x2="216" y2="108" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="40.00614" y1="148" x2="216" y2="148" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
							<line x1="88.00614" y1="188" x2="216" y2="188" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>
						</svg>
					</button>
          </div>
          <div className="editor-content" contentEditable="true">
          <div class="editor-textarea">
					<div class="editor-textarea-editable" contentEditable spellCheck="false">
          <h1 style={{ textAlign: "center" }} className="center-text">{landlord.name}</h1>
          <p style={{ fontSize: "smaller", textAlign: "center" }} className="smaller-text center-text">{properties.address}</p>
          <p style={{ fontSize: "smaller", textAlign: "center" }} className="smaller-text center-text">{landlord.contact_number}</p>
          <h1 style={{ textAlign: "center" }} className="center-text">Lease Agreement</h1>
          <p>{properties.type}<br />Address: {properties.address}</p>

          <h4>LANDLORD: {landlord.name}</h4>
          <label htmlFor="landlordAddress">Landlord Mailing Address: {landlord.mailing_address}</label>

          <h4>TENANT:  {tenant.name}</h4>
          <label htmlFor="tenantTradeName">Tenant Trade Name: {tenant.trade_name}</label>
          <br />
          <label htmlFor="tenantAddress">Tenant Mailing Address: {tenant.mailing_address}</label>

          <div>
            <p>Tenant Contact Number:</p>
            <div className="contact-number-row">
              <label htmlFor="tenantBusiness">Business: {tenant.business_number}</label>
              <label htmlFor="tenantCell">Cell: {tenant.cell_number}</label>
            </div>
          </div>

          <div>
            <p>Lease Premises:</p>
            <div className="lease-premises-row">
              <label htmlFor="squareFeet">Approximately {suite.square_feet} Square feet, </label>
              <label htmlFor="suite"> Suite: {suite.suite_number}</label>
            </div>
          </div>

          <p>
            The area of such space is measured from the outside face of all exterior walls and/or storefront glass surface and if there are any shared interior demising walls, then the centerline of such wall. Both parties shall be in agreement with the leasable size of the premises within the Shopping Center.
          </p>

          {tenant_guarantors.length > 0 ? (
            <div>
                <h4>Guarantor(s):</h4>
                <p>I/We authorize Broward Presidential Center to obtain information requested, concerning the statements made within this Lease Agreement. We, each of us, certify that we shall be individually and severally responsible for and obligated to the entire Lease Agreement.</p>
                <div>
                    {tenant_guarantors.map((item, index) => (
                        <div key={index} className="guarantor-info-row">
                            <label htmlFor="printName">Print Name: <span className="guarantor-info-box">{item.full_name}</span></label>
                            <label htmlFor="dateOfBirth">Date of Birth: <span className="guarantor-info-box">{item.date_of_birth}</span></label>
                            <label htmlFor="socialSecurity">Social Security Number: <span className="guarantor-info-box">{item.ssn}</span></label>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            null
        )}
          <p>
            <span className="declaration">Been duly authorized and approved by all necessary Corporate, Partnership, or Limited Liability Company.</span>
            <span className="declaration"> This lease shall be deemed to have been executed in the state of {lease.state} and the interpretation, construction, and performance of this lease shall be governed by the law of the state.</span>
          </p>

          <p>This lease shall be executed by the parties hereto by original signatures.</p>

          <div className="witness-section">
            <p>In Witness Whereof: The Parties hereto have duly executed this lease in duplicate, individually or through their authorized officers, agents, or attorney, and have their respective seals affixed hereto.</p>
          </div>
            <div className="signature-section">
              <div className="signature-row">
                <div className="landlord-signature-box">
                  <label htmlFor="signature">Executed by:</label>
                  <input type="text" id="signature" name="signature" placeholder="Sign here" />
                </div>
                <div className="landlord-date-box">
                  <label htmlFor="date-signed">Date:</label>
                  <input type="date" id="date-signed" name="date-signed" placeholder="Select Date" />
                </div>
              </div>

              <div className="signature-row">
                <div className="signature-box">
                  <label htmlFor="signature">Witness:</label>
                  <input type="text" id="signature" name="signature" placeholder="Sign here" />
                </div>
                <div className="date-box">
                  <label htmlFor="date-signed">Date:</label>
                  <input type="date" id="date-signed" name="date-signed" placeholder="Select Date" />
                </div>
              </div>

              <div className="signature-row">
                <div className="tenant-signature-box">
                  <label htmlFor="signature">Executed by:</label>
                  <input type="text" id="signature" name="signature" placeholder="Sign here" />
                </div>
                <div className="tenant-date-box">
                  <label htmlFor="date-signed">Date:</label>
                  <input type="date" id="date-signed" name="date-signed" placeholder="Select Date" />
                </div>
              </div>

              <div className="signature-row">
                <div className="signature-box">
                  <label htmlFor="signature">Witness:</label>
                  <input type="text" id="signature" name="signature" placeholder="Sign here" />
                </div>
                <div className="date-box">
                  <label htmlFor="date-signed">Date:</label>
                  <input type="date" id="date-signed" name="date-signed" placeholder="Select Date" />
                </div>
              </div>

              <div className="signature-row">
                <div className="notary-signature-box">
                  <label htmlFor="signature">Notary:</label>
                  <input type="text" id="signature" name="signature" placeholder="Sign here" />
                </div>
                <div className="date-box">
                  <label htmlFor="date-signed">Date:</label>
                  <input type="date" id="date-signed" name="date-signed" placeholder="Select Date" />
                </div>
              </div>
            </div>
      </div>
    </div>
          </div>
        </form>
        {showEdit && <LeaseForm  formTenant={formTenant} setFormTenant={setFormTenant} lease={lease} handleDelete={handleDelete} edit={true} />}
      </div>
    </main>
  );
  
}

export default LeaseDetail;

