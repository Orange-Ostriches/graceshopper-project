import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AdminPortal = ({ isAdmin }) => {
  if (isAdmin) {
    return (
      <div id="admin-portal" className="content">
        <h3>Administrator Portal</h3>
        <div id="admin-controls">
          <Link to="/admin-users">
            <button>See all registered users</button>
          </Link>
          <Link to="/admin-products">
            <button>View and edit products</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="content">
        <h3>You are not authorized to access this content.</h3>
        <Link to="/">
          <button>Return to the home page</button>
        </Link>
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
  };
};

export default connect(mapState)(AdminPortal);
