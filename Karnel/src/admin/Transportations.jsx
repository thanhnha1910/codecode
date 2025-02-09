import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Transportations = () => {
  const navigate = useNavigate();
  const [transportations, setTransportations] = useState([]);
  const [cities, setCities] = useState([]);
  const [formState, setFormState] = useState({
    transportType: "",
    cityID: "",
    price: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const apiUrl = "http://localhost:5128/api/Management/transportations";
  const citiesApiUrl = "http://localhost:5128/api/Management/cities";

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(citiesApiUrl);
      if (Array.isArray(response.data)) {
        setCities(response.data);
        fetchTransportations(response.data);
      } else {
        setError("Cities data is not in the expected format.");
      }
    } catch (err) {
      setError("Failed to fetch cities.");
    }
  };

  const fetchTransportations = async (loadedCities = cities) => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      if (Array.isArray(response.data)) {
        const transportationsWithCityName = response.data.map((t) => ({
          ...t,
          cityName: loadedCities.find((c) => c.cityID === t.cityID)?.cityName || "Unknown City",
        }));
        setTransportations(transportationsWithCityName);
      }
    } catch (err) {
      setError("Failed to fetch transportations.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === "cityID" ? parseInt(value, 10) : value,
    });
  };

  const resetForm = () => {
    setFormState({
      transportType: "",
      cityID: "",
      price: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (transportation) => {
    setFormState({
      transportType: transportation.transportType,
      cityID: transportation.cityID,
      price: transportation.price,
    });
    setEditMode(true);
    setEditId(transportation.transportID);
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
        setSuccessMessage("Transportation updated successfully!");
      } else {
        await axios.post(apiUrl, formState);
        setSuccessMessage("Transportation added successfully!");
      }
      await fetchTransportations();
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError("Failed to save the transportation.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this transportation?");
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await axios.delete(`${apiUrl}/${id}`);
      setSuccessMessage("Transportation deleted successfully!");
      setTransportations(transportations.filter((t) => t.transportID !== id));
    } catch (err) {
      setError("Failed to delete transportation.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageGallery = (transportationId) => {
    navigate(`/admin/transportation-images/${transportationId}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transportations</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Add Transportation
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
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.cityID} value={city.cityID}>
                  {city.cityName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Transportation Name:</label>
            <input
              type="text"
              name="transportType"
              value={formState.transportType}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formState.price}
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
              {loading ? "Processing..." : editMode ? "Update Transportation" : "Add Transportation"}
            </button>
          </div>
        </form>
      )}

      {transportations.length === 0 ? (
        <p>No transportation available</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Transportation Name</th>
              <th className="border border-gray-300 px-4 py-2">City Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transportations.map((transportation) => (
              <tr key={transportation.transportID}>
                <td className="border border-gray-300 px-4 py-2">{transportation.transportType}</td>
                <td className="border border-gray-300 px-4 py-2">{transportation.cityName}</td>
                <td className="border border-gray-300 px-4 py-2">{transportation.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => handleEdit(transportation)} className="bg-yellow-500 text-white py-1 px-2 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(transportation.transportID)} className="bg-red-500 text-white py-1 px-2 rounded mr-2">
                    Delete
                  </button>
                  <button onClick={() => handleImageGallery(transportation.transportID)} className="bg-blue-500 text-white py-1 px-2 rounded">
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

export default Transportations;