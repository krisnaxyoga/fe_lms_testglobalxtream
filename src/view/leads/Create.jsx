import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Index";

import Api from "../../api/Index";
import { FiHome } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { FiInfo } from "react-icons/fi";

export default function Create() {
  const [formData, setFormData] = useState({
    branch_office: "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    status: 1,
    probability: "",
    lead_type: "",
    lead_channel: "",
    lead_media: "",
    lead_source: "",
    general_notes: "",
  });
  const [open, setOpen] = useState(false);
  const [openother, setOpenOther] = useState(false);
  const [channel, setChannel] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleCollapse = () => {
    setOpen(!open);
  };

  const toggleCollapseOther = () => {
    setOpenOther(!openother);
  };
  const [filteredMedia, setFilteredMedia] = useState([]);

  const handleChannelChange = (e) => {
    const channelId = e.target.value;
    setFormData({ ...formData, lead_channel: channelId });

    // Filter media berdasarkan channel_id
    const mediaFiltered = media.filter(
      (item) => item.channel_id === Number(channelId)
    );
    setFilteredMedia(mediaFiltered);

    // Reset lead_media saat channel berubah
    setFormData((prevState) => ({ ...prevState, lead_media: "" }));
  };
  const [media, setMedia] = useState([]);
  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
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
  const [filteredSources, setFilteredSources] = useState([]);

  const handleMediaChange = (e) => {
    const mediaId = e.target.value;
    setFormData({ ...formData, lead_media: mediaId });

    const sourceFiltered = sources.filter(
      (item) => item.media_id === Number(mediaId)
    );
    setFilteredSources(sourceFiltered);

    setFormData((prevState) => ({ ...prevState, lead_source: "" }));
  };

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

 

  const [probability, setProbability] = useState([]);
  const fetchProbability = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
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
  const [leadtype, setLeadtype] = useState([]);
  const fetchType = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
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
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let response;

      // Add new medias
      response = await Api.post("/api/leads", formData, config);

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
          general_notes: "",
        });
      }

      history("/leads");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  useEffect(() => {
    fetchChannel();
    fetchMedia();
    fetchSources();
    fetchProbability();
    fetchType();
    fetchstatuse();
  }, []);
  return (
    <Layout>
      <form onSubmit={handleFormSubmit}>
        <div className="container">
          <h3 className="text-black fw-bold" style={{ fontSize: "20px" }}>
            Lead Manage
          </h3>
          <div className="row">
            <div className="col-lg-12">
              <div className="card shadow-none rounded">
                <div className="card-header border-0 d-flex justify-content-between">
                  <div>
                    <span className="d-flex text-black fw-semibold">
                      <FiHome
                        style={{
                          marginRight: "10px",
                          marginTop: "5px",
                          marginBottom: "5px",
                          width: "20px",
                          height: "20px",
                        }}
                      />{" "}
                      <p className="m-0 mt-1">General</p>
                    </span>
                  </div>
                  <Link
                    type="button"
                    onClick={toggleCollapse}
                    aria-expanded={open}
                    aria-controls="collapseExample"
                  >
                    <IoIosArrowDown
                      style={{
                        color: "black",
                        transform: open ? "rotate(180deg)" : "",
                      }}
                    />
                  </Link>
                </div>
                <div
                  className={`collapse card-body ${open ? "show" : ""}`}
                  id="collapseExample"
                >
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label
                        for="branch_office"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Branch Office
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        name="branch_office"
                        value={formData.branch_office}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">- select -</option>
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
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      {" "}
                      <label
                        for="full_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Full name
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label
                        for="address"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your address
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="4"
                        class="form-control"
                        placeholder="e.g Jl Raya Kerobokan"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      {" "}
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="email@mail.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <label
                        for="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone number
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="081-092..."
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card shadow-none rounded">
                <div className="card-header border-0 d-flex justify-content-between">
                  <div>
                    <span className="d-flex text-black fw-semibold">
                      <FiInfo
                        style={{
                          marginRight: "10px",
                          marginTop: "5px",
                          marginBottom: "5px",
                          width: "20px",
                          height: "20px",
                        }}
                      />{" "}
                      <p className="m-0 mt-1">Other Information</p>
                    </span>
                  </div>
                  <Link
                    type="button"
                    onClick={toggleCollapseOther}
                    aria-expanded={openother}
                    aria-controls="collapseExample"
                  >
                    <IoIosArrowDown
                      style={{
                        color: "black",
                        transform: openother ? "rotate(180deg)" : "",
                      }}
                    />
                  </Link>
                </div>
                <div
                  className={`collapse card-body ${openother ? "show" : ""}`}
                >
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label
                        for="visitors"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Status
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">- select -</option>
                        {status.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label
                        for="probability"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Probability
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        name="probability"
                        value={formData.probability}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">- select -</option>
                        {probability.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label
                        for="lead_type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Lead Type
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        name="lead_type"
                        value={formData.lead_type}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="">- select -</option>
                        {leadtype.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label
                        for="lead_channel"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Lead Channel
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        name="lead_channel"
                        value={formData.lead_channel}
                        onChange={handleChannelChange}
                        className="form-control"
                      >
                        <option value="">- select -</option>
                        {channel.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label
                        for="lead_media"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Lead media
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        name="lead_media"
                        value={formData.lead_media}
                        onChange={handleMediaChange}
                        disabled={!formData.lead_channel}
                        className="form-control"
                      >
                        <option value="">- select -</option>
                        {filteredMedia.length > 0 &&
                          filteredMedia.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label
                        for="lead source"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Lead source
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        name="lead_source"
                        value={formData.lead_source}
                        onChange={handleChange}
                        disabled={!formData.lead_media}
                        className="form-control"
                      >
                        <option value="">- select -</option>
                        {filteredSources.length > 0 &&
                          filteredSources.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label
                        for="address"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        General Note
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <textarea
                        id="general_notes"
                        name="general_notes"
                        value={formData.general_notes}
                        onChange={handleChange}
                        rows="4"
                        class="form-control"
                        placeholder="Write your Note here..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed-bottom" style={{ zIndex: "888" }}>
          <div className="card mb-0">
            <dic className="card-body">
              <div className="d-flex justify-content-between p-2">
                <div className="d-flex" style={{ marginLeft: "20%" }}>
                <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="keepSignedIn"
                    />
                    <label className="form-check-label mx-3" htmlFor="keepSignedIn">
                    I hereby certify that the information above is true and
                    accurate.
                    </label>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-dark mx-5">cancel</button>
                  <button type="submit" className="btn btn-globalxtream">
                    Save
                  </button>
                </div>
              </div>
            </dic>
          </div>
        </div>
      </form>
    </Layout>
  );
}
