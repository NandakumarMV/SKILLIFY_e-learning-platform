import React, { useState } from "react";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../slices/adminApiSlice";

const UsersTable = ({ users }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleBlockuser = async (userId) => {
    await blockUser({ userId });

    window.location.reload();
  };

  const userfilter = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search....."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border w-64"
          />
        </div>
      </div>
      <table className="min-w-full table-auto">
        <thead className="bg-slate-400">
          <tr>
            <th className="px-4 py-2 ">Index</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>

            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userfilter.map((user, index) => (
            <tr key={index} className=" hover:bg-slate-400 ">
              <td className="border px-4 py-2 ">{index + 1}</td>
              <td className="border px-4 py-2 ">{user.name.toUpperCase()}</td>
              <td className="border px-4 py-2 ">{user.email}</td>

              <td className="border px-4 py-2">
                {user.isBlocked ? (
                  <button className=" bg-green-600 w-16 rounded text-white ml-2">
                    UnBlock
                  </button>
                ) : (
                  <button className=" bg-red-600 w-16 rounded text-white ml-2">
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
