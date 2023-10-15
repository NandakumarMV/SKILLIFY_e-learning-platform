import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        withCredentials: true,
      });
      console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1 className="mb-5 font-semibold">USERS in Skillify</h1>
      <UsersTable users={users} />
    </div>
  );
};

export default UsersList;
