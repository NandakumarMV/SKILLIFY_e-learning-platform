import React, { useState } from "react";
import {
  useAddDomainMutation,
  useDeleteDomainMutation,
} from "../../slices/adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDomain } from "../../slices/adminAuthSlice";

const DomainTable = () => {
  const [domainName, setDomainName] = useState("");
  const [seletedDomain, setSelectedDomain] = useState({});
  const [deleteDomain, setDeleteDomain] = useState("");
  const [editdomain, setEditDomain] = useState();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [deleteDomainMutation] = useDeleteDomainMutation();
  const domains = useSelector((state) => state.adminAuth.domains);
  // console.log(domains, "domains in tableeeeeeeee");
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [addDomain] = useAddDomainMutation();
  const handleAddDomain = async () => {
    const res = await addDomain({ domainName }).unwrap();
    console.log(res.domain, "responsee");

    dispatch(setDomain([...domains, res.domain]));
    closeModal();
  };
  const handleDeleteDomain = async (domainToDelete) => {
    const res = await deleteDomainMutation(domainToDelete).unwrap();

    const updatedDomains = domains.filter(
      (domain) => domain !== domainToDelete
    );
    dispatch(setDomain(updatedDomains));
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
                <td className="border px-4 py-2 text-center">{domain}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-red-600 w-16 rounded text-white ml-2"
                    onClick={() => handleDeleteDomain(domain)}
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
              className="w-full border p-2 mb-4"
              placeholder="Domain Name"
              name="domainName"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value.toUpperCase())}
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
    </>
  );
};

export default DomainTable;
