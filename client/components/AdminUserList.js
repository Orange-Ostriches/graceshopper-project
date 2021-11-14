import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data: users } = await axios.get("/api/users/", {
        headers: {
          Authorization: window.localStorage.token,
        },
      });
      setUsers(users);
    };
    getUsers();
  }, []);

  return (
    <div id="all-users">
      <h1>Registered Users</h1>
      <div id="users">
        {users.map((user) => (
          <div key={user.id} id="user">
            {user.username}
          </div>
        ))}
      </div>
      <Link to="/admin-portal">
        <button>Back to Administrator Portal</button>
      </Link>
    </div>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(AdminUserList);
