import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Attractions = () => {
  const navigate = useNavigate();
  const [attractions, setAttractions] = useState([]);
  const [cities, setCities] = useState([]);
  const [formState, setFormState] = useState({
    attractionName: "",
    cityID: 0,
    cuisine: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const apiUrl = "http://localhost:5128/api/Management/attractions";
  const citiesApiUrl = "http://localhost:5128/api/Management/cities";

  const fetchCities = async () => {
    try {
      const response = await axios.get(citiesApiUrl);
      if (Array.isArray(response.data)) {
        setCities(response.data);
      } else {
        setError("Cities data is not in the expected format.");
        console.error("Fetched city data is not in the expected format:", response.data);
      }
    } catch (err) {
      setError("Failed to fetch cities.");
      console.error(err);
    }
  };

  const fetchAttractions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      if (Array.isArray(response.data)) {
        // Map attractions to include cityName instead of cityID
        const attractionsWithCityName = response.data.map((attraction) => {
          const city = cities.find((c) => c.cityID === attraction.cityID);
          return {
            ...attraction,
            cityName: city ? city.cityName : "Unknown City",
          };
        });
        setAttractions(attractionsWithCityName);
      } else {
        setError("Attractions data is not in the expected format.");
        console.error("Fetched attractions data is not in the expected format:", response.data);
      }
    } catch (err) {
      setError("Failed to fetch attractions.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      fetchAttractions();
    }
  }, [cities]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const resetForm = () => {
    setFormState({
      attractionName: "",
      cityID: 0,
      cuisine: "",
      description: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (attraction) => {
    setFormState({
      attractionName: attraction.attractionName,
      cityID: attraction.cityID,
      description: attraction.description,
    });
    setEditMode(true);
    setEditId(attraction.attractionID);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (editMode) {
        await axios.put(`${apiUrl}/${editId}`, formState);
        setSuccessMessage("Attraction updated successfully!");
      } else {
        await axios.post(apiUrl, formState);
        setSuccessMessage("Attraction added successfully!");
      }
      await fetchAttractions();
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError("Failed to save the attraction.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this attraction?");
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await axios.delete(`${apiUrl}/${id}`);
      setSuccessMessage("Attraction deleted successfully!");
      setAttractions(attractions.filter((attraction) => attraction.attractionID !== id));
    } catch (err) {
      setError("Failed to delete attraction.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageGallery = (attractionId) => {
    navigate(`/admin/attraction-images/${attractionId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Attractions</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Add attraction
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-2 border p-4 rounded">
          <div>
            <label>City:</label>
            <select
              name="cityID"
              value={formState.cityID}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value={0}>Select City</option>
              {cities.map((city) => (
                <option key={city.cityID} value={city.cityID}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Attraction Name:</label>
            <input
              type="text"
              name="attractionName"
              value={formState.attractionName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formState.description}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-center">
            <button type="button" className="bg-gray-300 text-black py-2 px-4 rounded mr-2" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded" disabled={loading}>
              {loading ? "Processing..." : editMode ? "Update attraction" : "Add attraction"}
            </button>
          </div>
        </form>
      )}

      {attractions.length === 0 ? (
        <p>No attraction available</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Attraction Name</th>
              <th className="border border-gray-300 px-4 py-2">City Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attractions.map((attraction) => (
              <tr key={attraction.attractionID}>
                <td className="border border-gray-300 px-4 py-2">{attraction.attractionName}</td>
                <td className="border border-gray-300 px-4 py-2">{attraction.cityName}</td>
                <td className="border border-gray-300 px-4 py-2">{attraction.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => handleEdit(attraction)} className="bg-yellow-500 text-white py-1 px-2 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(attraction.attractionID)} className="bg-red-500 text-white py-1 px-2 rounded mr-2">
                    Delete
                  </button>
                  <button onClick={() => handleImageGallery(attraction.attractionID)} className="bg-blue-500 text-white py-1 px-2 rounded">
                    Image Gallery
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Attractions;