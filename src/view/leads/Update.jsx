import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Layout from "../../Layout/Index";

import Api from "../../api/Index";

export default function Update() {
    
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    branch_office: "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    status: "",
    probability: "",
    lead_type: "",
    lead_channel: "",
    lead_media: "",
    lead_source: "",
    general_notes: ""
  });

    const { id } = useParams();
  const [channel, setChannel] = useState([]);
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [filteredMedia, setFilteredMedia] = useState([]);

  const handleChannelChange = e => {
    const channelId = e.target.value;
    setFormData({ ...formData, lead_channel: channelId });

    // Filter media berdasarkan channel_id
    const mediaFiltered = media.filter(
      item => item.channel_id === Number(channelId)
    );
    setFilteredMedia(mediaFiltered);

    // Reset lead_media saat channel berubah
    setFormData(prevState => ({ ...prevState, lead_media: "" }));
  };

  const [filteredSources, setFilteredSources] = useState([]);

  const handleMediaChange = e => {
    const mediaId = e.target.value;
    setFormData({ ...formData, lead_media: mediaId });

    const sourceFiltered = sources.filter(
      item => item.media_id === Number(mediaId)
    );
    setFilteredSources(sourceFiltered);

    setFormData(prevState => ({ ...prevState, lead_source: "" }));
  };

  const fetchChannel = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
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

  const [media, setMedia] = useState([]);
  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await Api.get("/api/lead_medias", config);
      setMedia(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };
  const [sources, setSources] = useState([]);
  const fetchSources = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await Api.get("/api/lead_sources", config);
      setSources(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  const [status, setstatuse] = useState([]);
  const fetchstatuse = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
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

  const [probability, setProbability] = useState([]);
  const fetchProbability = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await Api.get("/api/lead_probabilities", config);
      setProbability(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  const [leadtype, setLeadtype] = useState([]);
  const fetchType = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await Api.get("/api/lead_types", config);
      setLeadtype(response.data.data);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };
  //define history
  const history = useNavigate();
  const handleFormSubmit = async e => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let response;

      // Add new medias
      response = await Api.put("/api/leads", formData, config);

      if (response.status === 201 || response.status === 200) {
        setFormData({
          branch_office: "",
          fullname: "",
          email: "",
          phone: "",
          address: "",
          status: "",
          probability: "",
          lead_type: "",
          lead_channel: "",
          lead_media: "",
          lead_source: "",
          general_notes: ""
        });
      }
      history("/leads");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const fetchleade = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await Api.get(`/api/leads/${id}`, config);
      setLeads(response.data.data);
      if(response.data.data){
        setFormData({
          branch_office: response.data.data.branch_office,
          fullname: response.data.data.fullname,
          email: response.data.data.email,
          phone: response.data.data.phone,
          address: response.data.data.address,
          status: response.data.data.status,
          probability: response.data.data.probability,
          lead_type: response.data.data.lead_type,
          lead_channel: response.data.data.lead_channel,
          lead_media: response.data.data.lead_media,
          lead_source: response.data.data.lead_source,
          general_notes: response.data.data.general_notes
        });
      }
      
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
    fetchChannel();
    fetchstatuse();
    fetchMedia();
    fetchSources();
    fetchProbability();
    fetchType();
  }, []);
  return (
    <Layout>
      <div className="container">
        <form
          onSubmit={handleFormSubmit}
          className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <label className="block">
            Branch Office:
            <select
              name="branch_office"
              value={formData.branch_office}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">- Branch Office</option>
              <option value="GlobalXtreme Bali">GlobalXtreme Bali</option>
              <option value="GlobalXtreme Malang">GlobalXtreme Malang</option>
              <option value="GlobalXtreme Jakarta">GlobalXtreme Jakarta</option>
              <option value="GlobalXtreme Balikpapan">
                GlobalXtreme Balikpapan
              </option>
              <option value="GlobalXtreme Samarinda">
                GlobalXtreme Samarinda
              </option>
            </select>
          </label>
          <label className="block">
            Fullname:
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label className="block">
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label className="block">
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label className="block">
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <label className="block">
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">- Status</option>
              {status.map(item =>
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              )}
            </select>
          </label>
          <label className="block">
            Probability:
            <select
              name="probability"
              value={formData.probability}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">- select -</option>
              {probability.map(item =>
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              )}
            </select>
          </label>
          <label className="block">
            Lead Type:
            <select
              name="lead_type"
              value={formData.lead_type}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">- Status</option>
              {leadtype.map(item =>
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              )}
            </select>
          </label>
          <label className="block">
            Lead Channel:
            <select
              name="lead_channel"
              value={formData.lead_channel}
              onChange={handleChannelChange}
              className="input-field"
            >
              <option value="">- channel</option>
              {channel.map(item =>
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              )}
            </select>
          </label>

          <label className="block">
            Lead Media:
            <select
              name="lead_media"
              value={formData.lead_media}
              onChange={handleMediaChange}
              className="input-field"
            >
              <option value="">- channel -</option>
              {filteredMedia.length > 0 &&
                filteredMedia.map(item =>
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )}
            </select>
          </label>
          <label className="block">
            Lead Source:
            <select
              name="lead_source"
              value={formData.lead_source}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">- channel -</option>
              {filteredSources.length > 0 &&
                filteredSources.map(item =>
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )}
            </select>
          </label>
          <label className="block">
            General Notes:
            <input
              type="text"
              name="general_notes"
              value={formData.general_notes}
              onChange={handleChange}
              className="input-field"
            />
          </label>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
