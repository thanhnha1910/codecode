import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { toast } from "react-toastify";
import profileApi from "../../services/ProfileService";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    gender: false,
    dateOfBirth: "",
    avatar: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) {
        navigate("/login");
        return;
      }

      try {
        const profileData = await profileApi.getUserProfile(user.id);
        setFormData({
          id: profileData.id || user.id,
          name: profileData.name || "",
          email: profileData.email || "",
          gender: profileData.gender || false,
          dateOfBirth: profileData.dateOfBirth
            ? new Date(profileData.dateOfBirth).toISOString().split("T")[0]
            : "",
          avatar: null,
        });
        setPreviewImage(profileData.avatar || "/img/User_icon_2.svg.png");
      } catch (error) {
        toast.error("Failed to load profile data");
      }
    };

    loadProfile();
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!validTypes.includes(file.type)) {
          toast.error("Please upload an image file (JPEG, PNG, or GIF)");
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File size should be less than 5MB");
          return;
        }
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
        setFormData((prev) => ({ ...prev, avatar: file }));
      }
    } else if (name === "gender") {
      setFormData((prev) => ({ ...prev, [name]: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);

      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar, formData.avatar.name);
      }

      const result = await profileApi.updateProfile(user.id, formDataToSend);
      
      if (result && result.user) {
        // Add the base URL to the avatar path
        const baseUrl = "http://localhost:5128";
        const fullAvatarUrl = result.user.avatar ? `${baseUrl}${result.user.avatar}` : null;

        setUser({
          ...user,
          avatar: fullAvatarUrl
        });
        
        setPreviewImage(fullAvatarUrl);
        navigate("/");
        if (fullAvatarUrl) { 
          localStorage.setItem("avatar", fullAvatarUrl);
        }
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-3">
              <img key={Date.now()} src={previewImage || "/img/User_icon_2.svg.png"} alt="Profile" 
                
                  className="rounded-circle img-fluid"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h5 className="my-3">{formData.name}</h5>
              <p className="text-muted mb-1">{formData.email}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleInputChange}
                    name="avatar"
                    accept="image/*"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender.toString()}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  >
                    <option value="false">Female</option>
                    <option value="true">Male</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}