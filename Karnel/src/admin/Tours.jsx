import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [formVisible, setFormVisible] = useState(false); // Toggle form visibility
  const [formState, setFormState] = useState({
    tourName: "",
    description: "",
    detail: "",
    price: 0,
    availableSlots: 0,
    startDate: "",
    endDate: "",
    cityID: 0,
    hotelID: 0,
    transportID: 0,
  });
  const labelMappings = {
    cityID: "City Name",
    hotelID: "Hotel Name",
    transportID: "Transport Type",
    tourName: "Tour Name",
    availableSlots: "Available Slots",
    startDate: "Start Date",
    endDate: "End Date",
    price: "Price Per Adult",
    detail: "Detail",
    description: "Description",
  };
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transportations, setTransportations] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState([]); // For tick-box selections
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  const apiUrl = "http://localhost:5128/api/Management/tours";

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch tours, cities, hotels, transportations, and attractions together
      const [
        toursResponse,
        citiesResponse,
        hotelsResponse,
        transportationsResponse,
        attractionsResponse,
        restaurantsResponse,
      ] = await Promise.all([
        axios.get(apiUrl),
        axios.get("http://localhost:5128/api/Management/cities"),
        axios.get("http://localhost:5128/api/Management/hotels"),
        axios.get("http://localhost:5128/api/Management/transportations"),
        axios.get("http://localhost:5128/api/Management/attractions"),
        axios.get("http://localhost:5128/api/Management/restaurants"),
      ]);

      if (Array.isArray(toursResponse.data)) {
        setTours(toursResponse.data);
      } else {
        setError("Tours data is not in the expected format.");
      }

      setCities(citiesResponse.data);
      setHotels(hotelsResponse.data);
      setTransportations(transportationsResponse.data);
      setAttractions(attractionsResponse.data);
      setRestaurants(restaurantsResponse.data);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (formState.cityID) {
      axios
        .get(`http://localhost:5128/api/Management/cities/${formState.cityID}`)
        .then((res) => {
          const cityData = res.data;
          // Assuming your API returns an object like:
          // { attractions: [...], restaurants: [...], transportations: [...] }
          setAttractions(cityData.attractions || []);
          setRestaurants(cityData.restaurants || []);
          setTransportations(cityData.transportations || []);
        })
        .catch((error) => {
          console.error("Error fetching city-specific data:", error);
        });
    }
  }, [formState.cityID]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const resetForm = () => {
    setFormState({
      tourName: "",
      description: "",
      detail: "",
      price: 0,
      availableSlots: 0,
      startDate: "",
      endDate: "",
      cityID: 0,
      hotelID: 0,
      transportID: 0,
    });
    setSelectedAttractions([]); // Clear selected attractions
    setSelectedRestaurants([]); // Clear selected restaurants
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = async (tour) => {
    setFormState({
      tourName: tour.tourName,
      description: tour.description,
      detail: tour.detail,
      price: tour.price,
      availableSlots: tour.availableSlots,
      startDate: tour.startDate,
      endDate: tour.endDate,
      cityID: tour.cityID,
      hotelID: tour.hotelID,
      transportID: tour.transportID,
    });

    try {
      // Fetch linked attractions for this tour
      const response = await fetch(`http://localhost:5128/api/TourAttraction`);
      const data = await response.json();

      // Extract only the attraction IDs for the current tour
      const attractionIDs = data
        .filter((item) => item.tourID === tour.tourID)
        .map((item) => item.attractionID);

      console.log("Extracted Attraction IDs:", attractionIDs); // Debugging

      setSelectedAttractions(attractionIDs);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }

    try {
      // Fetch linked restaurants for this tour
      const response = await fetch(`http://localhost:5128/api/TourRestaurant`);
      const data = await response.json();

      // Extract only the restaurant IDs for the current tour
      const restaurantIDs = data
        .filter((item) => item.tourID === tour.tourID)
        .map((item) => item.restaurantID);

      console.log("Extracted Restaurant IDs:", restaurantIDs); // Debugging

      setSelectedRestaurants(restaurantIDs);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }

    setEditMode(true);
    setEditId(tour.tourID);
    setFormVisible(true); // Show the form for editing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      let tourId;

      // Clean numeric fields in formState (so price, availableSlots, etc. are numbers)
      const cleanedFormState = {
        ...formState,
        price: parseFloat(formState.price),
        availableSlots: parseInt(formState.availableSlots, 10),
        cityID: formState.cityID ? parseInt(formState.cityID, 10) : null,
        hotelID: formState.hotelID ? parseInt(formState.hotelID, 10) : null,
        transportID: formState.transportID ? parseInt(formState.transportID, 10) : null,
        attractionIDs: selectedAttractions,
        restaurantIDs: selectedRestaurants,
      };

      if (editMode) {
        console.log("Updating Tour with ID:", editId, "Payload:", cleanedFormState);
        await axios.put(`${apiUrl}/${editId}`, cleanedFormState);
        tourId = editId;

        console.log("Removing existing attractions for tour ID:", tourId);
        await axios.delete("http://localhost:5128/api/TourAttraction", {
          params: { tourId: tourId },
        });
        console.log("Removing existing restaurants for tour ID:", tourId);
        await axios.delete("http://localhost:5128/api/TourRestaurant", {
          params: { tourId: tourId },
        });
      } else {
        console.log("Creating new Tour with Payload:", cleanedFormState);
        const response = await axios.post(apiUrl, cleanedFormState);
        console.log("Response from Tour creation:", response.data);
        tourId = response.data.tourID || response.data.id;

        // Fallback if tourId is not received
        if (!tourId || tourId === 0) {
          console.warn("Tour ID not returned, fetching all tours...");
          const toursResponse = await axios.get(apiUrl);
          console.log("All fetched tours:", toursResponse.data);
          const createdTour = toursResponse.data.find((t) => {
            const namesMatch =
              t.tourName.trim().toLowerCase() === formState.tourName.trim().toLowerCase();
            const tourStartDate = t.startDate.split("T")[0];
            return namesMatch && tourStartDate === formState.startDate;
          });
          if (createdTour) {
            tourId = createdTour.tourID;
            console.log("Matched newly created tour with ID:", tourId);
          } else {
            throw new Error("Unable to determine new tour's ID.");
          }
        }
      }

      // Link each selected attraction individually (making sure to convert to numbers)
      if (selectedAttractions.length > 0) {
        console.log("Linking Attractions to Tour ID:", tourId);
        await Promise.all(
          selectedAttractions.map((attractionID) => {
            const numericAttractionID = parseInt(attractionID, 10);
            const linkingPayload = { tourID: Number(tourId), attractionID: numericAttractionID };
            console.log("Sending payload to TourAttraction API:", linkingPayload);
            return axios
              .post("http://localhost:5128/api/TourAttraction", linkingPayload)
              .catch((error) => {
                console.error(
                  "Error for payload:",
                  linkingPayload,
                  error.response?.data || error.message
                );
                throw error;
              });
          })
        );
      } else {
        console.warn("No attractions selected for this tour.");
      }

      // Link each selected restaurant individually (making sure to convert to numbers)
      if (selectedRestaurants.length > 0) {
        console.log("Linking Restaurants to Tour ID:", tourId);
        await Promise.all(
          selectedRestaurants.map((restaurantID) => {
            const numericRestaurantID = parseInt(restaurantID, 10);
            const linkingPayload = { tourID: Number(tourId), restaurantID: numericRestaurantID };
            console.log("Sending payload to TourRestaurant API:", linkingPayload);
            return axios
              .post("http://localhost:5128/api/TourRestaurant", linkingPayload)
              .catch((error) => {
                console.error(
                  "Error for payload:",
                  linkingPayload,
                  error.response?.data || error.message
                );
                throw error;
              });
          })
        );
      } else {
        console.warn("No restaurants selected for this tour.");
      }

      setSuccessMessage(editMode ? "Tour updated successfully!" : "Tour added successfully!");
      await fetchData();
      resetForm();
      setFormVisible(false);
    } catch (err) {
      setError("Failed to save the tour.");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this tour?");
    if (!confirmed) {
      return; // Exit the function if the user cancels
    }
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Note: using 'id' instead of 'editId' for deletion
      await axios.delete(`${apiUrl}/${id}`);
      setSuccessMessage("Tour deleted successfully!");
      setTours(tours.filter((tour) => tour.tourID !== id));
    } catch (err) {
      setError("Failed to delete the tour.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tours</h1>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        {/* Add Tour Button */}
        <button
          onClick={() => {
            resetForm();
            setFormVisible(true); // Show the form for adding a tour
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          Add Tour
        </button>
      </div>

      {/* Tour Form */}
      {formVisible && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-2 border p-4 rounded">
          {/* Loop through the existing tour fields */}
          {Object.keys(formState).map((key) => (
            <div key={key}>
              <label>{labelMappings[key] || key.replace(/([A-Z])/g, " $1").trim()}:</label>
              {key === "startDate" ? (
                <input
                  type="date"
                  name="startDate"
                  value={formState.startDate}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                  required
                  // Prevent selection of past dates by setting the minimum to today
                  min={new Date().toISOString().split("T")[0]}
                />
              ) : key === "endDate" ? (
                <input
                  type="date"
                  name="endDate"
                  value={formState.endDate}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                  required
                  // Set min to 3 days after the selected start date
                  min={
                    formState.startDate
                      ? new Date(
                        new Date(formState.startDate).setDate(
                          new Date(formState.startDate).getDate() + 3
                        )
                      )
                        .toISOString()
                        .split("T")[0]
                      : ""
                  }
                  // Set max to 5 days after the selected start date
                  max={
                    formState.startDate
                      ? new Date(
                        new Date(formState.startDate).setDate(
                          new Date(formState.startDate).getDate() + 5
                        )
                      )
                        .toISOString()
                        .split("T")[0]
                      : ""
                  }
                />
              ) : key === "detail" ? (
                <ReactQuill
                  theme="snow"
                  value={formState[key]}
                  onChange={(content) => setFormState({ ...formState, detail: content })}
                  className="mb-2"                
                />
              ) : key === "cityID" ? (
                <select
                  name={key}
                  value={formState[key]}
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
              ) : key === "hotelID" ? (
                <select
                  name={key}
                  value={formState[key]}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                  required
                >
                  <option value="">Select Hotel</option>
                  {hotels.map((hotel) => (
                    <option key={hotel.hotelID} value={hotel.hotelID}>
                      {hotel.hotelName}
                    </option>
                  ))}
                </select>
              ) : key === "transportID" ? (
                <select
                  name={key}
                  value={formState[key]}
                  onChange={handleChange}
                  className="border rounded p-2 w-full"
                  required
                >
                  <option value="">Select Transportation</option>
                  {transportations.map((transport) => (
                    <option key={transport.transportID} value={transport.transportID}>
                      {transport.transportType}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={
                    key.includes("Date")
                      ? "date"
                      : key === "price" || key.includes("ID") || key === "availableSlots"
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

          {/* Attractions Checkboxes Section */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Attractions
            </label>
            {attractions.length > 0 ? (
              attractions.map((attraction) => (
                <div key={attraction.attractionID} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={`attraction-${attraction.attractionID}`}
                    value={attraction.attractionID}
                    checked={selectedAttractions.includes(attraction.attractionID)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAttractions([...selectedAttractions, attraction.attractionID]);
                      } else {
                        setSelectedAttractions(
                          selectedAttractions.filter(
                            (id) => id !== attraction.attractionID
                          )
                        );
                      }
                    }}
                  />
                  <label htmlFor={`attraction-${attraction.attractionID}`} className="ml-2">
                    {attraction.attractionName}
                  </label>
                </div>
              ))
            ) : (
              <p>No attractions available.</p>
            )}
          </div>

          {/* Restaurants Checkboxes Section */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Select Restaurants
            </label>
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <div key={restaurant.restaurantID} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={`restaurant-${restaurant.restaurantID}`}
                    value={restaurant.restaurantID}
                    checked={selectedRestaurants.includes(restaurant.restaurantID)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRestaurants([...selectedRestaurants, restaurant.restaurantID]);
                      } else {
                        setSelectedRestaurants(
                          selectedRestaurants.filter(
                            (id) => id !== restaurant.restaurantID
                          )
                        );
                      }
                    }}
                  />
                  <label htmlFor={`restaurant-${restaurant.restaurantID}`} className="ml-2">
                    {restaurant.restaurantName}
                  </label>
                </div>
              ))
            ) : (
              <p>No restaurant available.</p>
            )}

          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : editMode ? "Update Tour" : "Add Tour"}
            </button>
            <button
              type="button"
              onClick={() => setFormVisible(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Tours Table */}
      {tours.length === 0 ? (
        <p>No tours available</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Tour Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Detail</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">AvailableSlots</th>
              <th className="border border-gray-300 px-4 py-2">StartDate</th>
              <th className="border border-gray-300 px-4 py-2">EndDate</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.tourID}>
                <td className="border border-gray-300 px-4 py-2">{tour.tourName}</td>
                <td className="border border-gray-300 px-4 py-2">{tour.description}</td>
                <td
                  className="border border-gray-300 px-4 py-2"
                  dangerouslySetInnerHTML={{ __html: tour.detail }}
                ></td>
                <td className="border border-gray-300 px-4 py-2">${tour.price}</td>
                <td className="border border-gray-300 px-4 py-2">{tour.availableSlots}</td>
                <td className="border border-gray-300 px-4 py-2">{tour.startDate}</td>
                <td className="border border-gray-300 px-4 py-2">{tour.endDate}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(tour)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tour.tourID)}
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

export default Tours;