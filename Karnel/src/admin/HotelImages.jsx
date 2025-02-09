import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const HotelImages = () => {
  const { id } = useParams(); // Extract hotel ID from URL
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const apiUrl = `http://localhost:5128/api/images?entityType=hotel&entityID=${id}`;
  console.log("Hotel ID:", id);

  // Fetch images from the server
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setImages(response.data);
    } catch (err) {
      setError("Failed to fetch images.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file input change and display previews
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Generate image previews
    const previewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(previewUrls);
  };

  const handleAddImages = async (e) => {
    e.preventDefault();
  
    if (!files || files.length === 0) {
      setError("Please select at least one file to upload.");
      return;
    }
  
    const formData = new FormData();
  
    // Append multiple files
    Array.from(files).forEach((file) => {
      formData.append("files", file); // Use "files" as the backend expects
    });
  
    try {
      const response = await axios.post(
        `http://localhost:5128/api/images/multiple?entityType=hotel&entityID=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Handle successful response
      console.log("Upload successful:", response.data);
      setSuccessMessage("Images uploaded successfully!");
      setImages([...images, ...response.data]); // Add newly uploaded images to the list
      setFiles([]); // Clear file selection
    } catch (error) {
      console.error("Error during upload:", error.response?.data || error.message);
      setError("Failed to upload images. Please try again.");
    }
  };
  
  const handleDeleteImage = async (imageId) => {
    console.log("Deleting image with ID:", imageId); // Debug log
    const confirmed = window.confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;
  
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:5128/api/images/${imageId}?entityID=${id}&entityType=hotel`
      );
      console.log("Delete response:", response.data); // Debug log
      setImages(images.filter((image) => image.imageID !== imageId)); // Use image.imageID
      setSuccessMessage("Image deleted successfully!");
    } catch (err) {
      setError("Failed to delete image.");
      console.error("Delete error:", err); // Debug log
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hotel Images</h1>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleAddImages} className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Images"}
        </button>
      </form>

      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="flex space-x-4 mb-4">
          {imagePreviews.map((previewUrl, index) => (
            <div key={index} className="border p-2">
              <img
                src={previewUrl}
                alt={`Preview ${index + 1}`}
                className="w-32 h-32 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Display the uploaded images */}
      {images.length === 0 ? (
        <p>No images available.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.imageID} className="border p-2">
              <img
                src={`http://localhost:5128/${image.imageUrl}`}
                alt={image.altText}
                className="w-full h-32 object-cover"
              />
              <button
                onClick={() => handleDeleteImage(image.imageID)}
                className="bg-red-500 text-white py-1 px-2 mt-2 rounded"
                disabled={loading}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelImages;