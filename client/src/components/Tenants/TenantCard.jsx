import React from "react";
import { Link } from "react-router-dom";

function TenantCard({ tenant }) {
  const suite = tenant.suite
  return (
    <div className="table-row">
      <div className="table-data">{tenant.name}</div>
      <div className="table-data">{tenant.trade_name}</div>
      <div className="table-data">{tenant.business_number}</div>
      <div className="table-data">{tenant.cell_number}</div>
      <div className="table-data">{suite.suite_number}</div>
      <div className="table-data"><Link to={`/tenants/${tenant.id}`}>
          click here
          </Link> </div>
    </div>
  );
}

export default TenantCard;
