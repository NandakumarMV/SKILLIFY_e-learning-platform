import React, { useState } from "react";

const TutorTable = ({ tutor }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState({
    id: "",
    name: "",
    email: "",
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const tutorfilter = tutor.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(search.toLowerCase()) ||
      tutor.email.toLowerCase().includes(search.toLowerCase())
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
            <th className="px-4 py-2">Experience</th>
            <th className="px-4 py-2">Qualification</th>

            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tutorfilter.map((tutor, index) => (
            <tr key={index} className=" hover:bg-slate-400 ">
              <td className="border px-4 py-2 ">{index + 1}</td>
              <td className="border px-4 py-2 ">{tutor.name.toUpperCase()}</td>
              <td className="border px-4 py-2 ">{tutor.email}</td>
              <td className="border px-4 py-2 ">{tutor.experience}</td>
              <td className="border px-4 py-2 ">{tutor.qualifications}</td>

              <td className="border px-4 py-2">
                {tutor.isBlocked ? (
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

export default TutorTable;
