// Import useState and useRef hooks from React
import React, { useEffect, useState, useRef } from "react";
import Api from "../../../api/Index";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

function List() {
  const [leadStatuses, setleadStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState(null);
  const nameRef = useRef();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api.get("/api/lead_statuses", config);
      setleadStatuses(response.data.data);

      // If a statuses is selected, fetch its details
      if (selectedStatuses) {
        const detailResponse = await Api.get(
          `/api/lead_statuses/${selectedStatuses.id}`,
          config
        );
        setSelectedStatuses(detailResponse.data); // Assuming API response structure
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
    setLoading(false);
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleEditButtonClick = (statuses) => {
    setSelectedStatuses(statuses);
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
      if (selectedStatuses) {
        // Update existing statuses
        response = await Api.put(
          `/api/lead_statuses/${selectedStatuses.id}`,
          { name: newName },
          config
        );
      } else {
        // Add new statuses
        response = await Api.post(
          "/api/lead_statuses",
          { name: newName },
          config
        );
      }
      if (response.status === 201 || response.status === 200) {
        fetchData();
        nameRef.current.value = "";
        setShowModal(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleDeleteButtonClick = async (status) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await Api.delete(`/api/lead_statuses/${status.id}`, config);
      alert(`Berhasil menghapus ${status.name}`);
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
          <h3 className="text-black fw-bold" style={{ fontSize: "20px" }}>
            Lead Status
          </h3>
          <Link
            onClick={handleAddButtonClick}
            className="btn btn-globalxtream d-flex justify-content-between"
          >
            <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
              Add New{" "}
            </p>
            <FaPlus style={{ width: "19px", marginLeft: "4px" }} />
          </Link>
        </div>
        <div className="row" style={{ marginRight: "1px", marginLeft: "-3px" }}>
          {loading && (
            <div class="d-flex justify-content-center my-5">
              <div
                class="spinner-grow text-warning"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {leadStatuses.map((item) => (
            <div className="col-lg-3 p-0 mx-1" key={item.id}>
              <div className="card border border-secondary-subtle shadow-none">
                <div className="card-body pb-0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="text-secondary m-0 my-3">{item.name}</p>
                    </div>
                    <div>
                      <button
                        className="btn btn-transparent"
                        onClick={() => handleEditButtonClick(item)}
                      >
                        <FiEdit className="text-secondary" />
                      </button>
                      <button
                        className="btn btn-transparent"
                        onClick={() => handleDeleteButtonClick(item)}
                      >
                        <FiTrash2 className="text-danger" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div
            className="modal-dialog"
            role="document"
            style={{ pointerEvents: "all" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedStatuses ? "Edit Lead type" : "Add New Lead type"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      ref={nameRef}
                      defaultValue={
                        selectedStatuses ? selectedStatuses.name : ""
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {selectedStatuses ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModalClose}
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
