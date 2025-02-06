import React, { useEffect, useState } from "react";
import axios from "axios";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
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

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);

      // Check if the response contains a valid array
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

  useEffect(() => {
    fetchRestaurants();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (editMode) {
        await axios.put(`${apiUrl}/${editId}`, formState);
        setSuccessMessage("restaurant updated successfully!");
      } else {
        await axios.post(apiUrl, formState);
        setSuccessMessage("restaurant added successfully!");
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

  const handleEdit = (restaurant) => {
    setFormState({ ...restaurant });
    setEditMode(true);
    setEditId(restaurant.id);
    setShowForm(true); // Show the form when editing
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
            <tr>
              <th className="border border-gray-300 px-4 py-2">Restaurant Name</th>
              <th className="border border-gray-300 px-4 py-2">CityID</th>
              <th className="border border-gray-300 px-4 py-2">Cuisine</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.restaurantID}>
                <td className="border border-gray-300 px-4 py-2">{restaurant.restaurantName}</td>
                <td className="border border-gray-300 px-4 py-2">{restaurant.cityID}</td>
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

export default Restaurants;
