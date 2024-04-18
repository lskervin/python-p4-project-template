import React from "react";
import { Link } from "react-router-dom";

function LeaseCard({ lease, onDelete }) {
  const tenant = lease.tenant
  // console.log(tenant)
  const landlord = lease.landlord
  // console.log(landlord)
  const suite = tenant.suite
  // console.log(suite)
  const lease_id = lease.id
  const properties = landlord.properties[0]


  return (
    <div className="table-row">
      <div className="table-data">{lease.start_date}</div>
      <div className="table-data">{landlord.name}</div>
      <div className="table-data">{properties.type}</div>
      <div className="table-data">{tenant.trade_name}</div>
      <div className="table-data">{suite.suite_number}</div>
      <div className="table-data"><Link to={`/leases/${lease_id}`}>click here
          </Link> </div>
      <div className="table-data"><span><strong onClick={() => onDelete(lease.id)}>X</strong></span></div>
    </div>
  );
}

export default LeaseCard;

