import React, { useEffect } from "react";
import LeadChannel from "./lead_channels/List";
import LeadMedias from "./lead_medias/List";
import LeadPorbabilities from "./lead_probabilities/List";
import LeadStatuses from "./lead_status/List";
import LeadType from "./lead_types/List";
import LeadSources from "./lead_sources/List";
import Layout from "../../Layout/Index";

import { useNavigate } from 'react-router-dom';


export default function MasterData() {
const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history('/');
    }
  }, [history]);
  return (
    <Layout>
      <div className="lg:grid lg:grid-cols-2 gap-4">
        <div className="lg:col-span-1">
          <h2 className="text-lg font-bold">Lead Channels</h2>
          <LeadChannel />
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-lg font-bold">Lead Medias</h2>
          <LeadMedias />
        </div>
        <div className="lg:col-span-1">
          <div>
            <h2 className="text-lg font-bold">Lead Probabilities</h2>
            <LeadPorbabilities />
          </div>
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-lg font-bold">Lead Type</h2>
          <LeadType />
        </div>
        <div className="lg:col-span-1">
          <div>
            <h2 className="text-lg font-bold">Lead Statuses</h2>
            <LeadStatuses />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div>
            <h2 className="text-lg font-bold">Lead Sources</h2>
            <LeadSources />
          </div>
        </div>
      </div>
    </Layout>
  );
}
