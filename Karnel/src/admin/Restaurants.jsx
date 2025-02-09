import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Restaurants = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [cities, setCities] = useState([]); // Store city data
  const [formState, setFormState] = useState({
    restaurantName: "",
    cityID: 0,
    cuisine: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // Control form visibility

  const apiUrl = "http://localhost:5128/api/Management/restaurants";
  const citiesApiUrl = "http://localhost:5128/api/Management/cities"; // Assuming you have an API for cities

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      if (Array.isArray(response.data)) {
        setRestaurants(response.data); // Use response.data directly
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

  const fetchCities = async () => {
    try {
      const response = await axios.get(citiesApiUrl);
      if (Array.isArray(response.data)) {
        setCities(response.data); // Set the cities data
      } else {
        setError("Data fetched is not in the expected format.");
        console.error("Fetched city data is not in the expected format:", response.data);
      }
    } catch (err) {
      setError("Failed to fetch cities.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRestaurants();
    fetchCities(); // Fetch cities data on component mount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const resetForm = () => {
    setFormState({
      restaurantName: "",
      cityID: 0,
      cuisine: "",
      description: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (restaurant) => {
    setFormState({
      restaurantName: restaurant.restaurantName,
      cuisine: restaurant.cuisine,
      cityID: restaurant.cityID,
      description: restaurant.description,
    });
    setEditMode(true);
    setEditId(restaurant.restaurantID);
    setShowForm(true); // Show the form when editing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (editMode) {
        await axios.put(`${apiUrl}/${editId}`, formState);
        setSuccessMessage("Restaurant updated successfully!");
      } else {
        await axios.post(apiUrl, formState);
        setSuccessMessage("Restaurant added successfully!");
      }
      await fetchRestaurants();
      resetForm();
      setShowForm(false); // Hide the form after submission
    } catch (err) {
      setError("Failed to save the restaurant.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this restaurant?");
    if (!confirmed) {
      return; // Exit the function if the user cancels
    }
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await axios.delete(`${apiUrl}/${id}`);
      setSuccessMessage("Restaurant deleted successfully!");
      setRestaurants(restaurants.filter((restaurant) => restaurant.restaurantID !== id));
    } catch (err) {
      setError("Failed to delete restaurant.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageGallery = (restaurantId) => {
    navigate(`/admin/restaurant-images/${restaurantId}`); // Navigate to the hotel images page
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Restaurants</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => {
            resetForm();
            setShowForm(true); // Show the form when "Add restaurant" is clicked
          }}
        >
          Add restaurant
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
              {key === "cityID" ? (
                <select
                  name={key}
                  value={formState[key]}
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
              ) : (
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
              )}
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
              {loading ? "Processing..." : editMode ? "Update restaurant" : "Add restaurant"}
            </button>
          </div>
        </form>
      )}

      {/* Render table */}
      {restaurants.length === 0 ? (
        <p>No restaurant available</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Restaurant Name</th>
              <th className="border border-gray-300 px-4 py-2">CityName</th>
              <th className="border border-gray-300 px-4 py-2">Cuisine</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.restaurantID}>
                <td className="border border-gray-300 px-4 py-2">{restaurant.restaurantName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {cities.find((city) => city.cityID === restaurant.cityID)?.cityName || "Unknown"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{restaurant.cuisine}</td>
                <td className="border border-gray-300 px-4 py-2">{restaurant.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(restaurant)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(restaurant.restaurantID)}
                    className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                    disabled={loading}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleImageGallery(restaurant.restaurantID)} // Pass the attraction ID
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
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

export default Restaurants;