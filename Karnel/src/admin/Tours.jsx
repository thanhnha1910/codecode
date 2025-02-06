import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const apiUrl = "http://localhost:5128/api/Management/tours";

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);

      // Check if the response contains a valid array
      if (Array.isArray(response.data)) {
        setTours(response.data); // Use response.data directly
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
    fetchTours();
  }, []);

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
        setSuccessMessage("Tour updated successfully!");
      } else {
        await axios.post(apiUrl, formState);
        setSuccessMessage("Tour added successfully!");
      }
      await fetchTours();
      resetForm();
      setFormVisible(false); // Hide the form after submission
    } catch (err) {
      setError("Failed to save the tour.");
      console.error(err);
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
      await axios.delete(`${apiUrl}/${editId}`);
      setSuccessMessage("Tour deleted successfully!");
      setTours(tours.filter((tour) => tour.tourID !== id));
    } catch (err) {
      setError("Failed to delete the tour.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tour) => {
    setFormState({ ...tour });
    setEditMode(true);
    setEditId(tour.id);
    setFormVisible(true); // Show the form for editing
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
          {Object.keys(formState).map((key) => (
            <div key={key}>
              <label>{key.replace(/([A-Z])/g, " $1")}:</label>
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
            </div>
          ))}
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
            <tr>
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
                <td className="border border-gray-300 px-4 py-2">{tour.detail}</td>
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
