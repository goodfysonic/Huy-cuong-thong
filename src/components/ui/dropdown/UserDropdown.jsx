import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { User, ChevronDown, UserCircle, Settings, LogOut } from "lucide-react";

// Tạo stylesheet riêng thay vì dùng styled-jsx
const dropdownStyles = `
  @keyframes backgroundSlide {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 50% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
  .animate-background-slide {
    animation: backgroundSlide 0.5s ease-in-out forwards;
    background: linear-gradient(90deg, #e3f2fd, #ffffff);
    background-size: 200% 200%;
  }
`;

function UserDropdown({ setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Hoai Lâm Nguyen",
    email: "21107789@student.edu.vn",
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData({
          name: parsedData.name || parsedData.fullName || "User",
          email: parsedData.email || "",
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("accessToken");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsOpen(false);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Tạo một style element khi component mount
  useEffect(() => {
    // Kiểm tra xem style đã tồn tại chưa
    const existingStyle = document.getElementById('dropdown-styles');
    if (!existingStyle) {
      const styleElement = document.createElement('style');
      styleElement.id = 'dropdown-styles';
      styleElement.innerHTML = dropdownStyles;
      document.head.appendChild(styleElement);
    }
    
    // Clean up khi component unmount
    return () => {
      const styleElement = document.getElementById('dropdown-styles');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div className="header-customize-item account relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={toggleDropdown}
      >
        {/* Avatar */}
        <div className="bg-blue-100 text-blue-500 rounded-full p-2 flex items-center justify-center transition-all duration-200 transform group-hover:scale-105 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-md">
          <User size={20} />
        </div>

        {/* Text and Chevron */}
        <div className="flex items-center">
          <span className="text-sm font-medium text-black group-hover:text-blue-600 transition-colors duration-300">
            Candidates
          </span>
          <ChevronDown
            size={14}
            className={`ml-1 text-black transition-all duration-500 group-hover:text-blue-600 ${
              isOpen ? "rotate-180" : "group-hover:translate-y-1"
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-xl z-50 overflow-hidden animate-background-slide">
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
            <p className="text-sm font-medium text-black">{userData.name}</p>
            <p className="text-xs text-black">{userData.email}</p>
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-3 text-black hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 hover:pl-6 hover:font-medium"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 transition-all duration-300 hover:scale-110 hover:bg-blue-500 hover:text-white">
                <UserCircle size={16} />
              </div>
              <span>Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-3 text-black hover:bg-blue-100 hover:text-blue-700 transition-all duration-300 hover:pl-6 hover:font-medium"
            >
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-3 transition-all duration-300 hover:scale-110 hover:bg-gray-500 hover:text-white">
                <Settings size={16} />
              </div>
              <span>Setting</span>
            </Link>

            
            <div
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-black hover:bg-red-100 hover:text-red-600 transition-all duration-300 hover:pl-6 hover:font-medium cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-500 mr-3 transition-all duration-300 hover:scale-110 hover:bg-red-500 hover:text-white">
                <LogOut size={16} />
              </div>
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

UserDropdown.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default UserDropdown;