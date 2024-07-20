import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Index";

import Api from "../../api/Index";

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

  const [channel, setChannel] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  }, []);
  return (
    <Layout>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="branch_office"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Branch Office
              </label>
              <select
                name="branch_office"
                value={formData.branch_office}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">- select -</option>
                <option value="GlobalXtreme Bali">GlobalXtreme Bali</option>
                <option value="GlobalXtreme Malang">GlobalXtreme Malang</option>
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
            <div>
              <label
                for="full_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="email@mail.com"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-45-678"
                required
              />
            </div>
            <div>
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your address here..."
              ></textarea>
            </div>
            <div>
              <label
                for="probability"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Probability
              </label>

              <select
                name="probability"
                value={formData.probability}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">- select -</option>
                {probability.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                for="lead_type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lead Type
              </label>

              <select
                name="lead_type"
                value={formData.lead_type}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">- select -</option>
                {leadtype.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                for="lead_channel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lead Channel
              </label>

              <select
                name="lead_channel"
                value={formData.lead_channel}
                onChange={handleChannelChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">- select -</option>
                {channel.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                for="lead_media"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lead media
              </label>

              <select
                name="lead_media"
                value={formData.lead_media}
                onChange={handleMediaChange}
                disabled={!formData.lead_channel}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div>
              <label
                for="lead source"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lead source
              </label>

              <select
                name="lead_source"
                value={formData.lead_source}
                onChange={handleChange}
                disabled={!formData.lead_media}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div>
              <label
                for="address"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                General Note
              </label>
              <textarea
                id="general_notes"
                name="general_notes"
                value={formData.general_notes}
                onChange={handleChange}
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your Note here..."
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
