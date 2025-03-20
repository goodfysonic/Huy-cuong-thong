import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Calendar,
  User,
  MapPin,
  Edit,
  Briefcase,
} from "lucide-react";
import EditProfileModal from "@/components/ui/modals/EditProfileModal";
import axios from "axios";
import { ENDPOINTS, ACCESS_TOKEN } from "@/constants/endpoints";

// Định nghĩa CSS inline cho khoảng cách
const iconTextSpacing = {
  marginRight: "16px", // Khoảng cách giữa icon và text
};

// Tăng khoảng cách giữa các mục thông tin
const lineSpacing = {
  marginBottom: "8px", // Khoảng cách giữa các dòng, tăng từ mặc định
};

// Đảm bảo icon aligned cho tất cả các dòng
const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const UserInfo = ({ className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);

        // Kiểm tra xem token có tồn tại không
        if (!token) {
          setError("Không tìm thấy token đăng nhập. Vui lòng đăng nhập lại.");
          setLoading(false);
          return;
        }

        console.log("Token:", token);
        console.log("Endpoint:", ENDPOINTS.PROFILE.ME);

        const response = await axios.get(ENDPOINTS.PROFILE.ME, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Profile data:", response.data);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error fetching profile:",
          err.response ? err.response.data : err
        );
        setError(
          "Không thể lấy thông tin profile: " +
            (err.response?.data?.message || err.message)
        );
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    // Option 1: Open modal
    setIsModalOpen(true);

    // Option 2: Navigate to edit page
    // navigate("/profile/edit");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Format address if exists
  const formatAddress = () => {
    if (!profile?.address) return "";

    const parts = [];
    if (profile.address.address_line1)
      parts.push(profile.address.address_line1);
    if (profile.address.address_line2)
      parts.push(profile.address.address_line2);
    if (profile.address.city) parts.push(profile.address.city);
    if (profile.address.state_province)
      parts.push(profile.address.state_province);
    // if (profile.address.postal_code) parts.push(profile.address.postal_code);
    if (profile.address.country) parts.push(profile.address.country);

    return parts.join(", ");
  };

  // Format date from ISO string
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Loading state
  if (loading) {
    return (
      <div
        className={`border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ${className}`}
      >
        <div className="p-5">
          <div className="animate-pulse">
            <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-100">
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-36"></div>
              </div>
              <div className="w-24 h-8 bg-gray-200 rounded"></div>
            </div>

            <div className="border border-gray-200 rounded-lg shadow-sm p-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ${className}`}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-100">
            <div>
              <h2 className="text-xs font-semibold text-gray-800">
                User Information
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your personal information
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-sm p-4">
            <div className="text-center text-red-500 py-4">
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-blue-500 hover:text-blue-700 underline text-base"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ${className}`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-100">
            <div>
              <h2 className="text-xs font-semibold text-gray-800">
                User Information
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your personal information
              </p>
            </div>
            <div>
              <button
                className="flex items-center justify-center gap-2 bg-white !border !border-blue-600 group py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:shadow transition-all duration-200 [outline:none!important] hover:!bg-blue-600"
                onClick={handleEditClick}
              >
                <Edit
                  size={14}
                  className="text-black group-hover:text-white transition-all duration-200"
                />
                <span className="text-black group-hover:text-white transition-all duration-200">
                  EDIT
                </span>
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-sm">
            <div>
              {/* User profile info layout similar to resume items */}
              <div className="divide-y divide-gray-200">
                {/* Name and avatar - first item */}
                <div className="flex items-center p-4">
                  <div className="flex-shrink-0" style={iconTextSpacing}>
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm"
                      style={iconStyle}
                    >
                      {profile?.picture ? (
                        <img
                          src={profile.picture}
                          alt={profile.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-black" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-gray-800">
                      {profile?.name || "Administrator1"}
                    </p>
                    <p className="text-xs text-gray-500">User</p>
                  </div>
                  <div className="flex-shrink-0">
                    {/* Can add action buttons here like edit specific field */}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center p-4" style={lineSpacing}>
                  <div className="flex-shrink-0" style={iconTextSpacing}>
                    <div
                      className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"
                      style={iconStyle}
                    >
                      <Mail size={16} className="text-blue-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-gray-600">
                      {profile?.email || "admin@careerbridge.com"}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {/* Menu dots if needed */}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center p-4" style={lineSpacing}>
                  <div className="flex-shrink-0" style={iconTextSpacing}>
                    <div
                      className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center"
                      style={iconStyle}
                    >
                      <Phone size={16} className="text-green-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-gray-600">
                      {profile?.phone || "09666700752"}
                    </p>
                  </div>
                </div>

                {/* DOB */}
                <div className="flex items-center p-4" style={lineSpacing}>
                  <div className="flex-shrink-0" style={iconTextSpacing}>
                    <div
                      className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center"
                      style={iconStyle}
                    >
                      <Calendar size={16} className="text-yellow-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-gray-600">
                      {profile?.birthday
                        ? formatDate(profile.birthday)
                        : "24/9/2003"}
                    </p>
                  </div>
                </div>

                {/* Gender */}
                <div className="flex items-center p-4" style={lineSpacing}>
                  <div className="flex-shrink-0" style={iconTextSpacing}>
                    <div
                      className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"
                      style={iconStyle}
                    >
                      <User size={16} className="text-purple-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-gray-600">
                      {profile?.gender || "Male"}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center p-4">
                  <div className="flex-shrink-0" style={iconTextSpacing}>
                    <div
                      className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"
                      style={iconStyle}
                    >
                      <MapPin size={16} className="text-red-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-base text-gray-600">
                      {formatAddress() ||
                        "Q2b, Long Hung, Số 1 Võ Văn Ngân, Ho Chi Minh, Viet Nam"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 flex items-center">
              <User size={14} className="mr-2 text-blue-600" />
              Personal information is protected and only visible to authorized
              personnel
            </p>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userData={profile}
      />
    </>
  );
};

export default UserInfo;
