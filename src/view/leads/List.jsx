import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Index';

function List() {
  return (
    <Layout>

        <div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">Branch Name</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">Lead Name</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">Lead Address</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">LD23101129599</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">lead@example.com, 123456789</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">Open</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">70%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">Website, Email, Social Media</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">2022-01-01</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    
    </Layout>
  )
}

export default List