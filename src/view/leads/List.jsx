import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../Layout/Index";
import Api from "../../api/Index";
import { FaPlus } from "react-icons/fa6";

import SingleInputDateRange from "../../components/Daterange";
import { FiSearch } from "react-icons/fi";

function List() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleNavigate = () => {
    navigate("/leads-create");
  };

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
                    <FaPlus style={{width:'19px',marginLeft: "4px"}}/>
                    
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-2">
                    <div className="form-group">
                      <label htmlFor="" style={{ fontSize:'12px' }}>Search Text</label>
                    <input
                        type="text"
                        name="searchText"
                        placeholder="Search by Name or Number"
                        value={filters.searchText}
                        onChange={handleFilterChange}
                        className="form-control form-control-custom"
                      />
                    </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="form-group">
                    <label htmlFor="" style={{ fontSize:'12px' }}>Date</label>
                    <SingleInputDateRange onChange={handleDateRangeChange} />
                      </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="form-group">
                    <label htmlFor="" style={{ fontSize:'12px' }}>Status</label>
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
                    <label htmlFor="" style={{ fontSize:'12px' }}>Branch Office</label>
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
                    className="btn btn-globalxtream d-flex my-4" onClick={()=>fetchleade()}
                  >
                    <p className="m-0 fw-bold" style={{ fontSize: "12px" }}>
                      Search{" "}
                    </p>
                    <FiSearch style={{width:'19px',marginLeft: "4px"}}/>
                    
                  </button>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-grey">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Branch Office Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lead Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lead Address
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lead Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lead Primary Contact
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lead Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lead Probability
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lead Channel, Media , Source
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody>
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
                            <tr key={lead.id}>
                              <td className="px-6 py-4">
                                <Link
                                  to={`/leads-detail/${lead.id}`}
                                  className="mt-3 w-full inline-flex justify-center rounded-2xl border shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="size-4"
                                  >
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Link>
                                <Link
                                  className="mt-3 w-full inline-flex justify-center rounded-2xl border shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                  to={`/leads-update/${lead.id}`}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="size-4"
                                  >
                                    <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                                    <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
                                  </svg>
                                </Link>
                                <button
                                  className="mt-3 w-full inline-flex justify-center  rounded-2xl border shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                  onClick={() =>
                                    handleDeleteButtonClick(lead.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="size-4"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </td>
                              <td className="px-6 py-4">
                                {lead.branch_office}
                              </td>
                              <td className="px-6 py-4">{lead.fullname}</td>
                              <td className="px-6 py-4">{lead.address}</td>
                              <td className="px-6 py-4">{lead.lead_number}</td>
                              <td className="px-6 py-4">
                                {lead.email}, {lead.phone}
                              </td>
                              <td className="px-6 py-4">
                                {lead.lead_status?.name}
                              </td>
                              <td className="px-6 py-4">
                                {lead.lead_probability?.name}
                              </td>
                              <td className="px-6 py-4">
                                {lead.lead_channel?.name},{" "}
                                {lead.lead_media?.name},{" "}
                                {lead.lead_source?.name}
                              </td>
                              <td className="px-6 py-4">
                                {new Date(lead.created_at).toLocaleDateString(
                                  "en-GB"
                                )}
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
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
