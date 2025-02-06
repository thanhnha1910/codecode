import React, { useState } from 'react';
import { toast } from "react-toastify";
import authApi from "../../services/AuthService";
import { 
  FaLock, 
  FaKey,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import './PasswordChangeModal.css';

const Password = ({ 
  showPasswordModal, 
  setShowPasswordModal, 
  passwordData, 
  setPasswordData,
  userId 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showPasswordModal) return null;

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!passwordData.currentPassword) {
      toast.error("Please enter your current password");
      return;
    }

    if (!passwordData.newPassword) {
      toast.error("Please enter new password");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      await authApi.changePassword(userId, {
        currentPassWord: passwordData.currentPassword,
        newPassWord: passwordData.newPassword,
        confirmPassWord: passwordData.confirmPassword
      });

      toast.success("Password changed successfully");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Failed to change password";
      toast.error(errorMessage);
      console.error('Password change error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) setShowPasswordModal(false);
    }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2><FaKey /> Change Password</h2>
          <button 
            type="button"
            className="close-button"
            onClick={() => setShowPasswordModal(false)}
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label><FaLock /> Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label><FaKey /> New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label><FaKey /> Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
              disabled={isSubmitting}
            />
          </div>

          <div className="modal-actions">
            <button 
              type="submit"
              className="btn-save"
              disabled={isSubmitting}
            >
              <FaSave /> {isSubmitting ? "Updating..." : "Update Password"}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setShowPasswordModal(false)}
              disabled={isSubmitting}
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Password;