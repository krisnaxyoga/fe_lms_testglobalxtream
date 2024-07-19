// Import useState and useRef hooks from React
import React, { useEffect, useState } from "react";
import Api from "../../../api/Index";

function List() {
  const [leadSources, setleadSources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [SelectSource, setSelectSource] = useState(null);
  
  const [media, setMedia] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    media_id: "",
  });

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
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await Api.get("/api/lead_sources", config);
      setleadSources(response.data.data);

      // If a sourches is selected, fetch its details
      if (SelectSource) {
        const detailResponse = await Api.get(
          `/api/lead_sources/${SelectSource.id}`,
          config
        );
        setSelectSource(detailResponse.data); // Assuming API response structure
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
console.log(leadSources);
  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleEditButtonClick = (type) => {
    setSelectSource(type);
    setFormData({
      name: type.name,
      channel_id: type.channel_id,
    });
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let response;
      if (SelectSource) {
        // Update existing type
        response = await Api.put(`/api/lead_sources/${SelectSource.id}`, formData, config);
      } else {
        // Add new type
        response = await Api.post('/api/lead_sources', formData, config);
      }
      if (response.status === 201 || response.status === 200) {
        fetchData();
        setFormData({
          name: "",
          media_id: "",
        });
        setShowModal(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleDeleteButtonClick = async (sources) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await Api.delete(`/api/lead_sources/${sources.id}`, config);
      alert(`Berhasil menghapus ${sources.name}`);
      await fetchData();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMedia();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
                media
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
            {leadSources.map((sourches) => (
              <tr key={sourches.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{sourches.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="truncate">{sourches.media?.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  
                  
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold w-30 p-1 rounded-md mx-3"
                    onClick={() => handleEditButtonClick(sourches)}
                  >
                    Edit
                  </button>
                  <button
                     className="bg-red-500 hover:bg-red-700 text-white font-bold w-30 p-1 rounded-md"
                   onClick={()=>handleDeleteButtonClick(sourches)}>
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
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
              className="inline-block align-bottom p-5 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {SelectSource ? "Edit Lead sourches" : "Add New Lead sourches"}
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
                            onChange={handleChange}
                            value={formData.name}
                            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                         />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="media_id">media</label>
                        <div className="mt-1">
                          <select
                            name="media_id"
                            id="media_id"
                            value={formData.media_id} // Menyimpan nilai media_id dari formData
                            onChange={handleChange}
                            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">-select-</option>

                            {media && media.length > 0 ? (
                              media.map((item, index) => (
                                <option
                                  key={index}
                                  value={item.id} 
                                  selected={formData.media_id === item.id}
                                >
                                  {item.name}
                                </option>
                              ))
                            ) : (
                              <option disabled value="">
                                Tidak ada data
                              </option>
                            )}
                          </select>
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
                    {SelectSource ? "Update" : "Save"}
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
