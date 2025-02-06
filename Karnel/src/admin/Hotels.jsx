import React, { useEffect, useState } from "react";
import axios from "axios";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [formState, setFormState] = useState({
    hotelName: "",
    address: "",
    cityID: 0,
    rating: 0,
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // Control form visibility

  const apiUrl = "http://localhost:5128/api/Management/hotels";

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);

      // Check if the response contains a valid array
      if (Array.isArray(response.data)) {
        setHotels(response.data); // Use response.data directly
      } else {
        setError("Data fetched is not in the expected format.");
        console.error("Fetched data is not in the expected format:", response.data);
      }
    } catch (err) {
      setError("Failed to fetch restaurants.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const resetForm = () => {
    setFormState({
      hotelName: "",
      address: "",
      cityID: 0,
      rating: 0,
      description: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (editMode) {
        await axios.put(`${apiUrl}/${editId}`, formState);
        setSuccessMessage("Hotel updated successfully!");
      } else {
        await axios.post(apiUrl, formState);
        setSuccessMessage("Hotel added successfully!");
      }
      await fetchHotels();
      resetForm();
      setShowForm(false); // Hide the form after submission
    } catch (err) {
      setError("Failed to save the hotel.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this hotel");
    if (!confirmed) {
      return; // Exit the function if the user cancels
    }
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await axios.delete(`${apiUrl}/${id}`);
      setSuccessMessage("Hotel deleted successfully!");
      setHotels(hotels.filter((hotel) => hotel.hotelID !== id));
    } catch (err) {
      setError("Failed to delete the hotel.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (hotel) => {
    setFormState({ ...hotel });
    setEditMode(true);
    setEditId(hotel.id);
    setShowForm(true); // Show the form when editing
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Hotels</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => {
            resetForm();
            setShowForm(true); // Show the form when "Add Hotel" is clicked
          }}
        >
          Add Hotel
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {/* Show form if showForm is true */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-2 border p-4 rounded">
          {Object.keys(formState).map((key) => (
            <div key={key}>
              <label>{key.replace(/([A-Z])/g, " $1")}:</label>
              <input
                type={
                  key.includes("Date")
                    ? "date"
                    : key === "price" || key.includes("ID") || key === "rating"
                    ? "number"
                    : "text"
                }
                name={key}
                value={formState[key]}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                required
              />
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
              onClick={() => setShowForm(false)} // Hide the form
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : editMode ? "Update Hotel" : "Add Hotel"}
            </button>
          </div>
        </form>
      )}

      {/* Render table */}
      {hotels.length === 0 ? (
        <p>No hotel available</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Hotel Name</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">CityID</th>
              <th className="border border-gray-300 px-4 py-2">Rating</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.hotelID}>
                <td className="border border-gray-300 px-4 py-2">{hotel.hotelName}</td>
                <td className="border border-gray-300 px-4 py-2">{hotel.address}</td>
                <td className="border border-gray-300 px-4 py-2">{hotel.cityID}</td>
                <td className="border border-gray-300 px-4 py-2">{hotel.rating}</td>
                <td className="border border-gray-300 px-4 py-2">{hotel.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(hotel)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hotel.hotelID)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    disabled={loading}
                  >
                    Delete
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

export default Hotels;
