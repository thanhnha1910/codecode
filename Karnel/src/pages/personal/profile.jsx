import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import profileApi from "../../services/ProfileService";
import Password from './Password';
import BookingList from './BookingList';

import './Profile.css';
import moment from 'moment';
import FavoritesList from './FavoritesList';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
    <div className="min-h-screen bg-gray-50 py-8">
      <ToastContainer />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account settings and preferences.</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto"
                  />
                  <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600 transition">
                    <FaCamera size={16} />
                    <input
                      type="file"
                      hidden
                      onChange={handleInputChange}
                      name="avatar"
                      accept="image/*"
                    />
                  </label>
                </div>
                
                <h2 className="mt-4 text-xl font-semibold">{formData.name}</h2>
                <p className="text-gray-500">{formData.email}</p>

                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <FaKey /> Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-8">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="bg-white rounded-lg shadow">
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <FaUser /> Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <FaEnvelope /> Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          disabled
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <FaVenusMars /> Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender.toString()}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="false">Female</option>
                          <option value="true">Male</option>
                        </select>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <FaCalendar /> Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 
                            ${dateError ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {dateError && (
                          <p className="mt-1 text-sm text-red-500">{dateError}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                      >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="favorites">
                <div className="bg-white rounded-lg shadow p-6">
                  <FavoritesList userId={user?.id} />
                </div>
              </TabsContent>
              <TabsContent value="bookings">
  <div className="bg-white rounded-lg shadow p-6">
    <BookingList userId={user?.id} />
  </div>
</TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Password 
        showPasswordModal={showPasswordModal}
        setShowPasswordModal={setShowPasswordModal}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        userId={user?.id}
      />
    </div>
  );
}