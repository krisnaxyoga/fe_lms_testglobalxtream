// src/components/LeadDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Index";
import Api from "../../api/Index";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

import { FiHome } from "react-icons/fi";

function LeadDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLeadDetail = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api.get(`/api/leads/${id}`, config);
      setLead(response.data.data);
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

  useEffect(() => {
    fetchLeadDetail();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  if (!lead) {
    return (
      <Layout>
        <div className="text-center">Lead tidak ditemukan</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <div className="d-flex justify-content-between mb-4">
          <h3 className="text-black fw-bold" style={{ fontSize: "20px" }}>
            Lead Detail
          </h3>
          <div className="d-flex justify-content-between">
            <Link
              to={"/leads-create"}
              className="btn btn-globalxtream d-flex justify-content-between mx-3"
            >
              <span style={{ marginTop: "1px" }}>Add New </span>

              <FaPlus
                style={{ width: "33px", marginTop: "5px", marginBottom: "5px" }}
              />
            </Link>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow-none rounded">
              <div className="card-body">
                <div className="d-flex mt-3">
                  <div>
                    <p className="mb-1 text-warning fs-4 text">
                      #{lead.lead_number}
                    </p>
                  </div>
                  <div>
                    <Link
                      className="btn btn-secondary rounded-circle mx-3 border-0 text-secondary"
                      style={{ background: "#F0F0F5" }}
                    >
                      <FiEdit />
                    </Link>
                  </div>
                  <div>
                    <Link className="btn btn-globalxtream">
                      <FiHome style={{ width: "20px", marginBottom: "4px" }} />{" "}
                      {lead.branch_office}
                    </Link>
                  </div>
                </div>
                <p> {new Date(lead.created_at).toLocaleDateString("en-GB")}</p>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">
                          Primary Contact
                        </span>
                      </div>
                      <div className="col-lg-8">{lead.fullname}</div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">Address</span>
                      </div>
                      <div className="col-lg-8">{lead.address}</div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">Email</span>
                      </div>
                      <div className="col-lg-8">{lead.email}</div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">Phone No.</span>
                      </div>
                      <div className="col-lg-8">{lead.phone}</div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-5">
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">Status</span>
                      </div>
                      <div className="col-lg-8">
                        <span className="badge text-bg-secondary">
                          {lead.lead_status?.name}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">Probability</span>
                      </div>
                      <div className="col-lg-8">
                        <span className="badge text-bg-danger">
                          {lead.lead_probability?.name}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">Source</span>
                      </div>
                      <div className="col-lg-8">
                        <span className="text-black">{lead.source?.name}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">Media</span>
                      </div>
                      <div className="col-lg-8">
                        <span className="text-black">{lead.media?.name}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">Channel</span>
                      </div>
                      <div className="col-lg-8">
                        <span className="text-black">{lead.channel?.name}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <span className="text-secondary mb-3">Created</span>
                      </div>
                      <div className="col-lg-8">
                        <span className="text-black">
                          {new Date(lead.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LeadDetail;
