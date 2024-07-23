// Import useState and useRef hooks from React
import React, { useEffect, useState } from "react";
import Api from "../../../api/Index";

import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
function List() {
  const [leadMedias, setleadMedias] = useState([]);
  const [channel, setChannel] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedias, setSelectedMedias] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    channel_id: "",
  });

  const fetchChannel = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api.get("/api/lead_channels", config);
      setChannel(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api.get("/api/lead_medias", config);
      setleadMedias(response.data.data);

      // If a medias is selected, fetch its details
      if (selectedMedias) {
        const detailResponse = await Api.get(
          `/api/lead_medias/${selectedMedias.id}`,
          config
        );
        setSelectedMedias(detailResponse.data); // Assuming API response structure
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
    setLoading(false);
  };
  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleEditButtonClick = (medias) => {
    setSelectedMedias(medias);
    setFormData({
      name: medias.name,
      channel_id: medias.channel_id,
    });
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let response;
      if (selectedMedias) {
        // Update existing medias
        response = await Api.put(
          `/api/lead_medias/${selectedMedias.id}`,
          formData,
          config
        );
      } else {
        // Add new medias
        response = await Api.post("/api/lead_medias", formData, config);
      }
      if (response.status === 201 || response.status === 200) {
        fetchData();
        setShowModal(false);
        setFormData({
          name: "",
          channel_id: "",
        });
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleDeleteButtonClick = async (medias) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await Api.delete(`/api/lead_medias/${medias.id}`, config);
      alert(`Berhasil menghapus ${medias.name}`);
      await fetchData();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchChannel();
  }, []);

  return (
    <>
    <div className="container">
        <div className="d-flex justify-content-between mb-3">
        <h3
                    className="text-black fw-bold"
                    style={{ fontSize: "20px" }}
                  >Lead media</h3>
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
          {leadMedias.map((item) => (
            <div className="col-lg-3 p-0 mx-1" key={item.id}>
              <div className="card border border-secondary-subtle shadow-none">
                <div className="card-body pb-0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="text-secondary m-0 my-3">{item.name}</p>
                      <p>{item.channel?.name}</p>
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
                {selectedMedias ? "Edit media" : "Add New media"}
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
                            onChange={handleChange}
                            value={formData.name}
                            className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">chanel</label>
                  <select
                            name="channel_id"
                            id="channel_id"
                            value={formData.channel_id} // Menyimpan nilai channel_id dari formData
                            onChange={handleChange}
                            className="form-control" >
                            <option value="">-select-</option>

                            {channel && channel.length > 0 ? (
                              channel.map((item, index) => (
                                <option
                                  key={index}
                                  value={item.id} // Mengatur value option sesuai dengan item.id
                                >
                                  {item.name}
                                </option>
                              ))
                            ) : (
                              <option disabled value="">
                                Tidak ada data
                              </option>
                            )}
                          </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  {selectedMedias ? "Update" : "Save"}
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
