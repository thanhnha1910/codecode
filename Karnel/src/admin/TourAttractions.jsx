import React, { useState, useEffect } from "react";
import axios from "axios";

const TourAttraction = () => {
  const [tours, setTours] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedTour, setSelectedTour] = useState("");
  const [selectedAttraction, setSelectedAttraction] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null); // For editing
  const [loading, setLoading] = useState(false);

  // Fetch Tours, Attractions, and Links
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tourResponse, attractionResponse, linksResponse] = await Promise.all([
          axios.get("http://localhost:5128/api/Management/tours"),
          axios.get("http://localhost:5128/api/Management/attractions"),
          axios.get("http://localhost:5128/api/TourAttraction"),
        ]);

        setTours(tourResponse.data);
        setAttractions(attractionResponse.data);
        setLinks(linksResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedTour || !selectedAttraction) {
      setMessage("Please select both a Tour and an Attraction.");
      return;
    }
  
    const payload = {
      tourID: parseInt(selectedTour, 10),
      attractionID: parseInt(selectedAttraction, 10),
    };
  
    try {
      if (editingLink) {
        // Update existing link
        console.log("Editing link:", editingLink);
        console.log("PUT payload:", payload);
  
        await axios.put(
          `https://localhost:7271/api/TourAttraction/${editingLink.tourID}/${editingLink.attractionID}`,
          payload
        );
        
        setMessage("Link updated successfully!");
      } else {
        // Create new link
        await axios.post("http://localhost:7271/api/TourAttraction", payload);
        setMessage("Tour and Attraction successfully linked!");
      }
  
      resetForm();
      fetchLinks(); // Refresh links
    } catch (error) {
      console.error("Error linking Tour and Attraction:", error.response?.data || error.message);
  
      if (error.response && error.response.status === 409) {
        setMessage("The specified Tour and Attraction combination already exists.");
      } else {
        setMessage("Error linking Tour and Attraction.");
      }
    }
  };  
  
  const handleEdit = (link) => {
    console.log("Editing link:", link); // Debugging
    setEditingLink(link);
    setSelectedTour(link.tourID);
    setSelectedAttraction(link.attractionID);
    setShowForm(true);
  };
  
  const resetForm = () => {
    setEditingLink(null);
    setSelectedTour("");
    setSelectedAttraction("");
    setShowForm(false);
  };
  

  const handleDelete = async (tourID, attractionID) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;

    try {
      await axios.delete(`http://localhost:7271/api/TourAttraction`, {
        params: { tourId: tourID, attractionId: attractionID },
      });
      setMessage("Link deleted successfully!");
      fetchLinks(); // Refresh links
    } catch (error) {
      console.error("Error deleting link:", error.response?.data || error.message);
      setMessage("Error deleting link.");
    }
  };

  const fetchLinks = async () => {
    try {
      const linksResponse = await axios.get("http://localhost:7271/api/TourAttraction");
      setLinks(linksResponse.data);
    } catch (error) {
      console.error("Error fetching links:", error);
      setMessage("Failed to refresh links.");
    }
  };

  const renderDropdown = (label, items, selectedValue, setValue, placeholder) => (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <select
        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        value={selectedValue}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {items.map((item, index) => (
          <option key={index} value={item.tourID || item.attractionID}>
            {item.tourName || item.attractionName}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Manage Tour and Attraction Links
      </h1>

      {loading && <p>Loading data...</p>}

      {!loading && (
        <>
          {/* Table displaying links */}
          <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2">Tour Name</th>
                  <th className="px-4 py-2">Attraction Name</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.length > 0 ? (
                  links.map((link, index) => (
                    <tr key={`${link.tourID}-${link.attractionID}`} className="border-b">
                      <td className="px-4 py-2">{link.tourName || "Unnamed Tour"}</td>
                      <td className="px-4 py-2">{link.attractionName || "Unnamed Attraction"}</td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEdit(link)}
                          className="bg-yellow-500 text-white py-1 px-3 rounded shadow hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(link.tourID, link.attractionID)}
                          className="bg-red-500 text-white py-1 px-3 rounded shadow hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No links available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Add/Edit Button */}
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          >
            {showForm ? "Cancel" : editingLink ? "Edit Link" : "Add Link"}
          </button>

          {/* Form to link or edit Tour and Attraction */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-6"
            >
              {renderDropdown(
                "Select Tour",
                tours,
                selectedTour,
                setSelectedTour,
                "-- Choose a Tour --"
              )}
              {renderDropdown(
                "Select Attraction",
                attractions,
                selectedAttraction,
                setSelectedAttraction,
                "-- Choose an Attraction --"
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {editingLink ? "Update Link" : "Link Tour and Attraction"}
              </button>
            </form>
          )}

          {/* Success/Error Message */}
          {message && (
            <p
              className={`mt-6 text-lg font-medium ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}
            >
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TourAttraction;