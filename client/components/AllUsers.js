import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
// import { fetchUsers } from "../store/users";

const AllUsers = () => {
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
    </div>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(AllUsers);
