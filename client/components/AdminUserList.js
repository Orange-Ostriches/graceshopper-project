import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminUserList = () => {
  const { auth } = useSelector((state) => state);
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

  if (auth.isAdmin === true) {
    return (
      <div id="all-users" className="content">
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

export default AdminUserList;
