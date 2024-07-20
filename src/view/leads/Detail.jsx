// src/components/LeadDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Index';
import Api from '../../api/Index';

function LeadDetail() {
  const { id } = useParams(); // Mengambil id dari parameter URL
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLeadDetail = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api.get(`/api/leads/${id}`, config);
      setLead(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        console.error('Terjadi kesalahan:', error);
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
      <div className="container mx-auto my-4">
      <div>
            <h2 className="text-lg font-bold mb-4">Lead Detail</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="mt-4 p-4 border rounded-lg bg-white">
            <div className="mb-4">
              <p className="font-semibold">Branch Office Name:</p>
              <p>{lead.branch_office}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Lead Name:</p>
              <p>{lead.fullname}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Lead Address:</p>
              <p>{lead.address}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Lead Number:</p>
              <p>{lead.lead_number}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Lead Primary Contact:</p>
              <p>{lead.email}, {lead.phone}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Lead Status:</p>
              <p>{lead.lead_status?.name}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Lead Probability:</p>
              <p>{lead.lead_probability?.name}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Lead Channel, Media, Source:</p>
              <p>{lead.lead_channel?.name}, {lead.lead_media?.name}, {lead.lead_source?.name}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Created At:</p>
              <p>{new Date(lead.created_at).toLocaleDateString('en-GB')}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LeadDetail;
