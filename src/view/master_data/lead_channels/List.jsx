// Import useState and useRef hooks from React
import React, { useEffect, useState, useRef } from "react";
import Api from "../../../api/Index";

function List() {
  const [leadChannels, setLeadChannels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const nameRef = useRef();
  
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api.get("/api/lead_channels", config);
      setLeadChannels(response.data.data);

      // If a channel is selected, fetch its details
      if (selectedChannel) {
        const detailResponse = await Api.get(
          `/api/lead_channels/${selectedChannel.id}`,
          config
        );
        setSelectedChannel(detailResponse.data); // Assuming API response structure
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
    setLoading(false);
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleEditButtonClick = (channel) => {
    setSelectedChannel(channel);
    setShowModal(true);
  };

  

  const handleDeleteButtonClick = async (channel) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await Api.delete(`/api/lead_channels/${channel.id}`, config);
      alert(`Berhasil menghapus lead channel ${channel.name}`);
      await fetchData();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newName = nameRef.current.value;
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let response;
      if (selectedChannel) {
        // Update existing channel
        response = await Api.put(`/api/lead_channels/${selectedChannel.id}`, { name: newName }, config);
      } else {
        // Add new channel
        response = await Api.post('/api/lead_channels', { name: newName }, config);
      }
      if (response.status === 201 || response.status === 200) {
        fetchData();
        nameRef.current.value = '';
        setShowModal(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <div className="overflow-x-auto">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddButtonClick}
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
                Name
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
            {loading ? <>
              <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>
              </td>
            </> :<>
            {leadChannels.map((channel) => (
              <tr key={channel.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{channel.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold w-30 p-1 rounded-md mx-3"
                    onClick={() => handleEditButtonClick(channel)}
                  >
                    Edit
                  </button>
                  <button
                     className="bg-red-500 hover:bg-red-700 text-white font-bold w-30 p-1 rounded-md"
                   onClick={()=>handleDeleteButtonClick(channel)}>
                    delete
                  </button>
                  
                </td>
              </tr>
            ))}
            </>}
           
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block p-4 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {selectedChannel ? "Edit Lead Channel" : "Add New Lead Channel"}
              </h3>
              <form onSubmit={handleFormSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            ref={nameRef}
                            defaultValue={
                              selectedChannel ? selectedChannel.name : ""
                            }
                            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {selectedChannel ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default List;
