import React, { useEffect,useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import Layout from "../../Layout/Index";

import Api from "../../api/Index";

function List() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/leads-create");
  };

  const [leads, setLeads] = useState([]);
  const fetchleade = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
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
  };


  const handleDeleteButtonClick = async (lead) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await Api.delete(`/api/leads/${lead.id}`, config);
      alert(`Berhasil menghapus ${lead.fullname}`);
      await fetchleade();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchleade();
  }, []);

  return (
    <Layout>
      <div className="overflow-x-auto">
      
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNavigate}
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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{lead.branch_office}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{lead.fullname}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{lead.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{lead.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{lead.email}, {lead.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{lead.lead_status?.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{lead.lead_probability?.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{lead.lead_channel?.name}, {lead.lead_media?.name}, {lead.lead_source?.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <div className="truncate">{new Date(lead.created_at).toLocaleDateString('en-GB')}</div>
                </td>
                <td>
                  <Link to={`/leads-update/${lead.id}`}>Edit</Link>
                  <button
                     className="text-red-600 hover:text-indigo-900"
                   onClick={()=>handleDeleteButtonClick(lead)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default List;
