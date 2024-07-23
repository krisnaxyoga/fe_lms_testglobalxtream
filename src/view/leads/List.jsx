import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../Layout/Index";
import Api from "../../api/Index";
import { FaPlus } from "react-icons/fa6";

import SingleInputDateRange from "../../components/Daterange";
import { FiSearch } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

function List() {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
 

  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({
    searchText: "",
    dateRange: null, // Ubah dateFrom dan dateTo menjadi dateRange
    status: "",
    branchOffice: "",
  });
  const fetchleade = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          searchText: filters.searchText,
          dateFrom: filters.dateRange?.startDate,
          dateTo: filters.dateRange?.endDate,
          status: filters.status,
          branchOffice: filters.branchOffice,
        },
      };
      const response = await Api.get("/api/leads", config);
      setLeads(response.data.data);
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
  const toggleDropdown = (lead) => {
    setSelectedLead(lead);
    setShowDropdown(!showDropdown);
  };
  const handleDeleteButtonClick = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await Api.delete(`/api/leads/${id}`, config);
      fetchleade();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  const [status, setstatuse] = useState([]);
  const fetchstatuse = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api.get("/api/lead_statuses", config);
      setstatuse(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  useEffect(() => {
    fetchleade();
    fetchstatuse();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateRangeChange = (selectedRange) => {
    console.log(selectedRange);
    setFilters({
      ...filters,
      dateRange: selectedRange,
    });
  };
  // console.log(filters);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="card rounded border-0 shadow-none">
              <div className="card-header border-0 bg-white">
                <div className="d-flex justify-content-between">
                  <h3
                    className="text-black fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Lead Manage
                  </h3>
                  <Link
                    to={"/leads-create"}
                    className="btn btn-globalxtream d-flex justify-content-between"
                  >
                    <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                      Add New{" "}
                    </p>
                    <FaPlus style={{ width: "19px", marginLeft: "4px" }} />
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label htmlFor="" style={{ fontSize: "12px" }}>
                        Search Text
                      </label>
                      <input
                        type="text"
                        name="searchText"
                        placeholder="Search by Text"
                        value={filters.searchText}
                        onChange={handleFilterChange}
                        className="form-control form-control-custom"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="" style={{ fontSize: "12px" }}>
                        Date
                      </label>
                      <SingleInputDateRange onChange={handleDateRangeChange} />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <label htmlFor="" style={{ fontSize: "12px" }}>
                        Status
                      </label>
                      <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="form-control form-control-custom"
                      >
                        <option value="">Select Status</option>
                        {status.map((item) => (
                          <option key={item.id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label htmlFor="" style={{ fontSize: "12px" }}>
                        Select Office
                      </label>
                      <select
                        name="branchOffice"
                        value={filters.branchOffice}
                        onChange={handleFilterChange}
                        className="form-control form-control-custom"
                      >
                        <option value="">Select Branch Office</option>
                        <option value="GlobalXtreme Bali">
                          GlobalXtreme Bali
                        </option>
                        <option value="GlobalXtreme Malang">
                          GlobalXtreme Malang
                        </option>
                        <option value="GlobalXtreme Jakarta">
                          GlobalXtreme Jakarta
                        </option>
                        <option value="GlobalXtreme Balikpapan">
                          GlobalXtreme Balikpapan
                        </option>
                        <option value="GlobalXtreme Samarinda">
                          GlobalXtreme Samarinda
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <button
                      type="button"
                      className="btn btn-globalxtream d-flex my-4"
                      onClick={() => fetchleade()}
                    >
                      <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                        Search{" "}
                      </p>
                      <FiSearch style={{ width: "19px", marginLeft: "4px" }} />
                    </button>
                  </div>
                </div>
                <div className="relative overflow-x-auto">
                  <div
                    className="d-flex bg-grey py-3 px-3 mb-2 justify-content-between"
                    style={{ width: "1500px" }}
                  >
                    <div className="col-lg">
                      <p className="m-0 fs-6 fw-semibold text">#Lead</p>
                    </div>
                    <div className="col-lg">
                      <p className="m-0 fs-6 fw-semibold text">
                        Primary Contact
                      </p>
                    </div>
                    <div className="col-lg">
                      <p className="m-0 fs-6 fw-semibold text">Info</p>
                    </div>
                    <div className="col-lg">
                      <p className="m-0 fs-6 fw-semibold text">Info Source</p>
                    </div>
                    <div className="col-lg">
                      <p className="m-0 fs-6 fw-semibold text">Assigned To</p>
                    </div>
                  </div>
                  {loading ? (
                    <>
                      <tr>
                        <td colSpan={6} className="text-center p-5">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      {leads.map((lead) => (
                        <>
                          
                          <div
                            className="row border-bottom px-3 mb-2"
                            key={lead.id}
                            style={{ width: "1500px" }}
                          >
                            <div className="col">
                              <p className="fw-bold mb-1">{lead.fullname}</p>
                              <p className="mb-1">{lead.address}</p>
                              <p className="mb-1 fw-bold text-warning">
                                #{lead.lead_number}
                              </p>
                              <p className="m-0 fs-6 text text-secondary">
                                branch office
                              </p>
                              <p className="text-black mb-1 fs-6 text">
                                {" "}
                                {lead.branch_office}
                              </p>

                              <p className="m-0 fs-6 text text-secondary">
                                Created By
                              </p>
                              <div className="d-flex mb-5">
                                <div
                                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2"
                                  style={{ height: "40px", width: "40px" }}
                                >
                                  <p className="text-center text-white m-0 p-2">
                                    SU
                                  </p>
                                </div>
                                <div>
                                  <p
                                    className="mb-1"
                                    style={{ fontSize: "10px" }}
                                  >
                                    Super admin
                                  </p>
                                  <p
                                    className="mb-1"
                                    style={{ fontSize: "10px" }}
                                  >
                                    {new Date(
                                      lead.created_at
                                    ).toLocaleDateString("en-GB")}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <p className="text-black mb-1">{lead.email}</p>
                              <p className="text-secondary mb-1">
                                {lead.phone}
                              </p>
                            </div>
                            <div className="col">
                              <p className="text-secondary mb-1">
                                Probability:
                              </p>
                              {lead.lead_probability?.name === "Pending" ? (
                                <span className="badge rounded-pill text-bg-warning">
                                  {lead.lead_probability?.name}
                                </span>
                              ) : lead.lead_probability?.name === "Cancel" ? (
                                <span className="badge rounded-pill text-bg-danger">
                                  {lead.lead_probability?.name}
                                </span>
                              ) : (
                                <span className="badge rounded-pill text-bg-primary">
                                  {lead.lead_probability?.name}
                                </span>
                              )}
                              <FiEdit className="mx-2"/>
                              <p className="text-secondary mb-1">Status:</p>
                              <span className="badge rounded-pill bg-warning text-black">
                                {lead.lead_status?.name}
                              </span>
                              <FiEdit className="mx-2"/>
                              <p className="text-secondary mb-1">Notes:</p>
                              <p>{lead.general_notes}</p>
                            </div>
                            <div className="col">
                              <p className="text-secondary mb-1">Type:</p>
                              <p className="text-black mb-1">
                                {lead.lead_type?.name}
                              </p>
                              <p className="text-secondary mb-1">Channel:</p>
                              <p className="text-black mb-1">
                                {lead.lead_channel?.name}
                              </p>
                              <p className="text-secondary mb-1">Media:</p>
                              <p className="text-black mb-1">
                                {lead.lead_media?.name}
                              </p>
                              <p className="text-secondary mb-1">Source:</p>
                              <p className="text-black mb-1">
                                {lead.lead_source?.name}
                              </p>
                            </div>
                            <div className="col">
                              <div className="d-flex justify-content-between">
                                <Link to="" className="d-flex">
                                  <FiUser style={{ width: "20px" }} />{" "}
                                  <p
                                    className="text-decoration-underline"
                                    href="#"
                                    style={{ fontSize: "11px" }}
                                  >
                                    ADD ASSIGNE
                                  </p>
                                </Link>
                                <div>
                                  <Link
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      toggleDropdown(lead);
                                    }}
                                  >
                                    <FiMoreHorizontal
                                      style={{ width: "20px" }}
                                    />
                                  </Link>
                                  <ul
                                    className={`dropdown-menu dropdown-list dropdown-menu-end dropdown-menu-arrow profile ${
                                      showDropdown && selectedLead?.id === lead.id
                                        ? "show"
                                        : "hidden"
                                    }`}
                                  >
                                    <li>
                                      <Link
                                        to={`/leads-detail/${selectedLead?.id}`}
                                        className="dropdown-item d-flex align-items-center"
                                      >
                                        <i className="bi bi-person"></i>
                                        <span>Detail</span>
                                      </Link>
                                    </li>

                                    <li>
                                      <Link
                                        to={`/leads-update/${selectedLead?.id}`}
                                        className="dropdown-item d-flex align-items-center"
                                      >
                                        <i className="bi bi-gear"></i>
                                        <span>Edit</span>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        onClick={() =>
                                          handleDeleteButtonClick(selectedLead?.id)
                                        }
                                        className="dropdown-item d-flex align-items-center text-danger"
                                      >
                                        <i className="bi bi-gear"></i>
                                        <span>Delete</span>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default List;
