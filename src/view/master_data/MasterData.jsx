import React, { useState, useEffect } from "react";
import LeadChannel from "./lead_channels/List";
import LeadMedias from "./lead_medias/List";
import LeadPorbabilities from "./lead_probabilities/List";
import LeadStatuses from "./lead_status/List";
import LeadType from "./lead_types/List";
import LeadSources from "./lead_sources/List";
import Layout from "../../Layout/Index";

import { useNavigate } from "react-router-dom";

export default function MasterData() {
  const history = useNavigate();
  const [activeTab, setActiveTab] = useState("lead-type");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history("/");
    }
  }, [history]);

  return (
    <Layout>
      <div className="container">
      <h3
                    className="text-black fw-bold"
                    style={{ fontSize: "20px" }}
                  >
                    Lead Setting
                  </h3>
        <div className="card shadow-none rounded">
          <div className="card-header border-0 m-0">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "lead-type" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("lead-type")}
                  id="lead-type-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#lead-type"
                  type="button"
                  role="tab"
                  aria-controls="lead-type"
                  aria-selected={activeTab === "lead-type" ? "true" : "false"}
                >
                  Type
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "lead-channels" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("lead-channels")}
                  id="lead-channels-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#lead-channels"
                  type="button"
                  role="tab"
                  aria-controls="lead-channels"
                  aria-selected={
                    activeTab === "lead-channels" ? "true" : "false"
                  }
                >
                  Channel
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "lead-medias" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("lead-medias")}
                  id="lead-medias-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#lead-medias"
                  type="button"
                  role="tab"
                  aria-controls="lead-medias"
                  aria-selected={activeTab === "lead-medias" ? "true" : "false"}
                >
                  Media
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "lead-sources" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("lead-sources")}
                  id="lead-sources-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#lead-sources"
                  type="button"
                  role="tab"
                  aria-controls="lead-sources"
                  aria-selected={
                    activeTab === "lead-sources" ? "true" : "false"
                  }
                >
                  Source
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "lead-probabilities" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("lead-probabilities")}
                  id="lead-probabilities-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#lead-probabilities"
                  type="button"
                  role="tab"
                  aria-controls="lead-probabilities"
                  aria-selected={
                    activeTab === "lead-probabilities" ? "true" : "false"
                  }
                >
                  Probability
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "lead-statuses" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("lead-statuses")}
                  id="lead-statuses-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#lead-statuses"
                  type="button"
                  role="tab"
                  aria-controls="lead-statuses"
                  aria-selected={
                    activeTab === "lead-statuses" ? "true" : "false"
                  }
                >
                  Status
                </button>
              </li>
              
            </ul>
          </div>
          <div className="card-body p-4">
            <div className="tab-content" id="myTabContent">
            <div
                className={`tab-pane fade ${
                  activeTab === "lead-type" ? "show active" : ""
                }`}
                id="lead-type"
                role="tabpanel"
                aria-labelledby="lead-type-tab"
              >
                
                <LeadType />
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "lead-statuses" ? "show active" : ""
                }`}
                id="lead-statuses"
                role="tabpanel"
                aria-labelledby="lead-statuses-tab"
              >
               
                <LeadStatuses />
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "lead-probabilities" ? "show active" : ""
                }`}
                id="lead-probabilities"
                role="tabpanel"
                aria-labelledby="lead-probabilities-tab"
              >
                <h3
                    className="text-black fw-bold"
                    style={{ fontSize: "20px" }}
                  >Lead Probabilities</h3>
                <LeadPorbabilities />
              </div>
            
              <div
                className={`tab-pane fade ${
                  activeTab === "lead-channels" ? "show active" : ""
                }`}
                id="lead-channels"
                role="tabpanel"
                aria-labelledby="lead-channels-tab"
              >
                <h3
                    className="text-black fw-bold"
                    style={{ fontSize: "20px" }}
                  >Lead Channels</h3>
                <LeadChannel />
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "lead-medias" ? "show active" : ""
                }`}
                id="lead-medias"
                role="tabpanel"
                aria-labelledby="lead-medias-tab"
              >
                <h3
                    className="text-black fw-bold"
                    style={{ fontSize: "20px" }}
                  >Lead Medias</h3>
                <LeadMedias />
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "lead-sources" ? "show active" : ""
                }`}
                id="lead-sources"
                role="tabpanel"
                aria-labelledby="lead-sources-tab"
              >
                <h3
                    className="text-black fw-bold"
                    style={{ fontSize: "20px" }}
                  >Lead Sources</h3>
                <LeadSources />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
