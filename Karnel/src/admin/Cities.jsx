import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cities = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [formState, setFormState] = useState({
    cityName: "",
    country: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [detailsCityId, setDetailsCityId] = useState(null); // Track which city's details are shown

  const apiUrl = "http://localhost:5128/api/Management/cities";

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setCities(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Failed to fetch cities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const resetForm = () => {
    setFormState({
      cityName: "",
      description: "",
    });
    setEditMode(false);
    setEditId(null);
  };
  const handleEdit = (city) => {
    setFormState({
      cityName: city.cityName,  
      description: city.description,
    });
    setEditMode(true);
    setEditId(city.cityID);
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
        setSuccessMessage("City updated successfully!");
      } else {
        await axios.post(apiUrl, formState);
        setSuccessMessage("City added successfully!");
      }
      await fetchCities();
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError("Failed to save the city.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this city?");
    if (!confirmed) return;

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      await axios.delete(`${apiUrl}/${id}`);
      setSuccessMessage("City deleted successfully!");
      setCities(cities.filter((city) => city.cityID !== id));
    } catch (err) {
      setError("Failed to delete city.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDetails = (cityID) => {
    if (detailsCityId === cityID) {
      setDetailsCityId(null); // Collapse details
    } else {
      setDetailsCityId(cityID); // Show details
    }
  };
  const handleImageGallery = (tourId) => {
    navigate(`/admin/cities-images/${tourId}`);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Cities</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          Add City
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-2 border p-4 rounded">
          {Object.keys(formState).map((key) => (
            <div key={key}>
              <label>{key.replace(/([A-Z])/g, " $1")}:</label>
              <input
                type="text"
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
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : editMode ? "Update City" : "Add City"}
            </button>
          </div>
        </form>
      )}

      {cities.length === 0 ? (
        <p>No cities available</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">City ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <React.Fragment key={city.cityID}>
                <tr>
                  <td className="border px-4 py-2">{city.cityID}</td>
                  <td className="border px-4 py-2">{city.cityName}</td>
                  <td className="border px-4 py-2">{city.description}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(city)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(city.cityID)}
                      className="bg-red-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toggleDetails(city.cityID)}
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                    >
                      {detailsCityId === city.cityID ? "Hide Details" : "Show Details"}                     
                    </button>
                    <button onClick={() => handleImageGallery(city.cityID)} className="bg-blue-500 text-white py-1 px-2 rounded">
                    Image Gallery
                  </button>
                  </td>
                </tr>
                {detailsCityId === city.cityID && (
                  <tr>
                    <td colSpan="4" className="border px-4 py-2">
                      <div>
                        <h3 className="font-bold">Tours:</h3>
                        {city.tours.length > 0 ? (
                          <ul>
                            {city.tours.map((tour) => (
                              <li key={tour.tourID}>
                                {tour.tourName} - ${tour.price}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No tours available</p>
                        )}
                        <h3 className="font-bold mt-2">Hotels:</h3>
                        {city.hotels.length > 0 ? (
                          <ul>
                            {city.hotels.map((hotel) => (
                              <li key={hotel.hotelID}>
                                {hotel.hotelName} - {hotel.address}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No hotels available</p>
                        )}
                        <h3 className="font-bold mt-2">Restaurants:</h3>
                        {city.restaurants.length > 0 ? (
                          <ul>
                            {city.restaurants.map((restaurant) => (
                              <li key={restaurant.restaurantID}>
                                {restaurant.restaurantName} - {restaurant.cuisine}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No restaurants available</p>
                        )}
                        <h3 className="font-bold mt-2">Attractions:</h3>
                        {city.attractions.length > 0 ? (
                          <ul>
                            {city.attractions.map((attraction) => (
                              <li key={attraction.attractionID}>
                                {attraction.attractionName} - {attraction.description}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No attractions available</p>
                        )}
                        <h3 className="font-bold mt-2">Transportations:</h3>
                        {city.transportations.length > 0 ? (
                          <ul>
                            {city.transportations.map((transport) => (
                              <li key={transport.transportID}>
                                {transport.transportType} - ${transport.price}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No transportations available</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cities;
