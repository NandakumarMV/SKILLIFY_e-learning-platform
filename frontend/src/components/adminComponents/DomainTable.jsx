import React, { useState } from "react";
import {
  useAddDomainMutation,
  useDeleteDomainMutation,
} from "../../slices/adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDomains } from "../../slices/domainSlice";

const DomainTable = () => {
  const [domainName, setDomainName] = useState("");
  const [seletedDomain, setSelectedDomain] = useState({});
  const [deleteDomain, setDeleteDomain] = useState("");
  const [err, setErr] = useState("");
  const [domainErr, setDomainErr] = useState("");
  const [editdomain, setEditDomain] = useState();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [deleteDomainMutation] = useDeleteDomainMutation();
  const domains = useSelector((state) => state.domains.domains);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [addDomain] = useAddDomainMutation();
  const handleAddDomain = async () => {
    if (domains.includes(domainName)) {
      setErr("Domain must have to be unique");
      return;
    }
    try {
      const res = await addDomain({ domainName }).unwrap();
      dispatch(setDomains([...domains, res.domain]));
      closeModal();
    } catch (error) {
      setErr("Domain already exists");
    }
  };
  const handleDeleteDomain = async (domainToDelete) => {
    try {
      const res = await deleteDomainMutation(domainToDelete).unwrap();

      const updatedDomains = domains.filter(
        (domain) => domain._id !== domainToDelete
      );

      dispatch(setDomains(updatedDomains));
    } catch (error) {
      setDomainErr("Domain have associated courses");
    }
  };
  return (
    <>
      <div>
        <div className="mb-4">
          <button
            className="bg-gray-600 text-white py-2 px-4 hover:bg-blue-500"
            onClick={openModal}
          >
            Add Domain
          </button>
        </div>
      </div>
      <div>
        <table className="min-w-full mx-auto border-collapse table-auto">
          <thead className="bg-slate-400">
            <tr>
              <th className="px-4 py-2 text-center">Index</th>
              <th className="px-4 py-2 text-center">Domain</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((domain, index) => (
              <tr key={index} className="hover:bg-slate-400">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  {domain.domainName}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-red-600 w-16 rounded text-white ml-2"
                    onClick={() => handleDeleteDomain(domain._id)}
                  >
                    Delete
                  </button>
                  {/* <button className="bg-blue-600 w-16 rounded text-white ml-2">
                    Edit
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Add Domain</h2>
            <input
              type="text"
              className={"w-full border p-2 mb-4 "}
              placeholder={`Domain Name ${err ? "already exits " : ""}`}
              name="domainName"
              value={err ? "" : domainName}
              onChange={(e) => {
                setErr("");
                setDomainName(e.target.value.toUpperCase());
              }}
            />
            <div className="text-right">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                onClick={handleAddDomain}
              >
                Add
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {domainErr && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-xl mb-4">Can't Delete</h2>
            <p>{domainErr}</p>
            <div className="text-right">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setDomainErr("")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DomainTable;
