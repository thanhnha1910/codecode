import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import profileApi from "../../services/ProfileService";
import Password from './Password';
import './Profile.css';
import moment from 'moment';

import { 
  FaUser, 
  FaEnvelope, 
  FaVenusMars, 
  FaCalendar, 
  FaCamera,
  FaKey,
  FaSave,
  FaTimes
} from 'react-icons/fa';

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
  const [dateError, setDateError] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const isOver18 = (birthDate) => {
    const today = moment(); 
    const birth = moment(birthDate, 'YYYY-MM-DD');
    const age = today.diff(birth, 'years'); // Tính tuổi
    return age >= 18;
  };

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
          ? moment(profileData.dateOfBirth).format('YYYY-MM-DD') 
          : "",
          avatar: null,
        });

        const baseUrl = "http://localhost:5128";
        const fullAvatarUrl = profileData.avatar 
          ? `${baseUrl}${profileData.avatar}` 
          : "/img/User_icon_2.svg.png";
        setPreviewImage(fullAvatarUrl);

      } catch (error) {
        console.error('Profile load error:', error);
        toast.error("Failed to load profile data");
      }
    };

    loadProfile();
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleInputChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file" && files[0]) {
      const file = files[0];
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
      setFormData(prev => ({ ...prev, avatar: file }));

    } else if (name === "gender") {
      setFormData(prev => ({ ...prev, [name]: value === "true" }));
    } else if (name === "dateOfBirth") {
      const formattedDate = moment(value).format('YYYY-MM-DD');
    setFormData(prev => ({ ...prev, [name]: formattedDate }));
    setDateError("");
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate date of birth
    if (!formData.dateOfBirth) {
      toast.error("Please enter your date of birth");
      setDateError("Date of birth is required");
      setIsSubmitting(false);
      return;
    }

    // Validate age
    if (!isOver18(formData.dateOfBirth)) {
      toast.error("You must be at least 18 years old");
      setDateError("You must be at least 18 years old");
      setIsSubmitting(false);
      return;
    }

    setDateError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);

      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const result = await profileApi.updateProfile(user.id, formDataToSend);
      
      if (result && result.user) {
        const baseUrl = "http://localhost:5128";
        const fullAvatarUrl = result.user.avatar 
          ? `${baseUrl}${result.user.avatar}` 
          : "/img/User_icon_2.svg.png";

        const updatedUser = {
          ...user,
          avatar: fullAvatarUrl,
          name: result.user.name
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setPreviewImage(fullAvatarUrl);
        toast.success("Profile updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
          if (user.role === "ADMIN") {
            navigate("/admin"); 
          } else {
            navigate("/"); 
          }
        }, 1500);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (user.role === 'ADMIN') {
      navigate("/admin"); 
    } else {
      navigate("/"); 
    }
  };

  return (
    <div className="profile-container">
      <ToastContainer /> {/* Thêm ToastContainer vào đây */}
      <div className="profile-header">
        <h1>Profile Settings</h1>
        <p>Manage your personal information and account security</p>
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="avatar-container">
              <img
                src={previewImage}
                alt="Profile"
                className="profile-avatar"
                key={previewImage}
              />
              <label className="avatar-upload-button" title="Change profile picture">
                <FaCamera />
                <input
                  type="file"
                  hidden
                  onChange={handleInputChange}
                  name="avatar"
                  accept="image/*"
                  disabled={isSubmitting}
                />
              </label>
            </div>
            <h2 className="profile-name">{formData.name}</h2>
            <p className="profile-email">{formData.email}</p>
            <button 
              className="change-password-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              <FaKey /> Change Password
            </button>
            <Password 
              showPasswordModal={showPasswordModal}
              setShowPasswordModal={setShowPasswordModal}
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              userId={user?.id}
            />
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-edit-card">
            <h3>Personal Information</h3>
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>
                  <FaUser /> Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label>
                  <FaEnvelope /> Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  disabled
                  placeholder="Your email address"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <FaVenusMars /> Gender
                  </label>
                  <select
                    className="form-control"
                    name="gender"
                    value={formData.gender.toString()}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  >
                    <option value="false">Female</option>
                    <option value="true">Male</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <FaCalendar /> Date of Birth
                  </label>
                  <input
                    type="date"
                    className={`form-control ${dateError ? 'is-invalid' : ''}`}
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-save"
                  disabled={isSubmitting}
                >
                  <FaSave /> {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}