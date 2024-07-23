// Import useState and useRef hooks from React
import React, { useEffect, useState, useRef } from "react";
import Api from "../../../api/Index";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
function List() {
  const [leadTypes, setleadTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [SelectType, setSelectType] = useState(null);
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api.get("/api/lead_types", config);
      setleadTypes(response.data.data);

      // If a type is selected, fetch its details
      if (SelectType) {
        const detailResponse = await Api.get(
          `/api/lead_types/${SelectType.id}`,
          config
        );
        setSelectType(detailResponse.data); // Assuming API response structure
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
    setLoading(false);
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleEditButtonClick = (type) => {
    setSelectType(type);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newName = nameRef.current.value;
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let response;
      if (SelectType) {
        // Update existing type
        response = await Api.put(`/api/lead_types/${SelectType.id}`, { name: newName }, config);
      } else {
        // Add new type
        response = await Api.post('/api/lead_types', { name: newName }, config);
      }
      if (response.status === 201 || response.status === 200) {
        fetchData();
        nameRef.current.value = '';
        setShowModal(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const handleDeleteButtonClick = async (type) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await Api.delete(`/api/lead_types/${type.id}`, config);
      alert(`Berhasil menghapus ${type.name}`);
      await fetchData();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div className="container">
    <div className="d-flex justify-content-between mb-3">
          <h3
                    className="text-black fw-bold"
                    style={{ fontSize: "20px" }}
                  >Lead Type</h3>
                  <Link
                    to=''
                    className="btn btn-globalxtream d-flex justify-content-between"
                  >
                    <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                      Add New{" "}
                    </p>
                    <FaPlus style={{ width: "19px", marginLeft: "4px" }} />
                  </Link>
          </div>
      <div className="row" style={{    marginRight: '1px',
    marginLeft: '-3px'}}>
      {leadTypes.map((type) => (
        <div className="col-lg-3 p-0 mx-1">
          <div className="card border border-secondary-subtle shadow-none">
            <div className="card-body pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-secondary m-0 my-3">{type.name}</p>
                  
                </div>
                <div>
                <button
                    className="btn btn-transparant"
                    onClick={() => handleEditButtonClick(type)}
                  >
                    <FiEdit className="text-secondary"/>
                  </button>
                  <button
                     className="btn btn-transparant"
                   onClick={()=>handleDeleteButtonClick(type)}>
                   <FiTrash2 className="text-danger"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
         ))}
      </div>
    </div>
      <div className="overflow-x-auto">
        <button
          className="btn btn-globalxtream"
          onClick={handleAddButtonClick}
        >
          Add
        </button>
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {loading ? <>
              <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
              </td>
            </> :<>
            {leadTypes.map((type) => (
              <tr key={type.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{type.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold w-30 p-1 rounded-md mx-3"
                    onClick={() => handleEditButtonClick(type)}
                  >
                    Edit
                  </button>
                  <button
                     className="bg-red-500 hover:bg-red-700 text-white font-bold w-30 p-1 rounded-md"
                   onClick={()=>handleDeleteButtonClick(type)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}</>
          }
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 p-5">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block p-5 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {SelectType ? "Edit Lead type" : "Add New Lead type"}
              </h3>
              <form onSubmit={handleFormSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            ref={nameRef}
                            defaultValue={
                              SelectType ? SelectType.name : ""
                            }
                            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {SelectType ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default List;
