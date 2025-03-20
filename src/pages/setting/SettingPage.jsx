// SettingPage.jsx
import React, { useState, useCallback, useMemo, useEffect } from "react";
import Breadcrumb from "@/components/ui/breadcrumb";
import Gotop from "@/components/ui/gotop";
import { Settings, Bell, User, Shield, FileText } from "lucide-react";
import { ENDPOINTS, SETTING_KEYS } from "@/constants/endpoints";
import axios from "axios";

import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import PrivacySettings from "./PrivacySettings";
import DocumentsSettings from "./DocumentsSettings";

// Constants
const LAYOUTS = {
  GRID: "grid",
  LIST: "list",
};

// Định nghĩa CSS inline cho khoảng cách
const iconTextSpacing = {
  marginRight: "16px", // Khoảng cách giữa icon và text
};

// Tăng khoảng cách giữa các mục thông tin
const lineSpacing = {
  marginBottom: "16px", // Khoảng cách giữa các dòng, tăng từ mặc định
};

// Đảm bảo icon aligned cho tất cả các dòng
const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function SettingPage() {
  // State
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken"); // Assuming you store token in localStorage
        
        const response = await axios.get(ENDPOINTS.SETTINGS.GET_ALL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        // Transform array of settings to an object for easier access
        const settingsObject = {};
        response.data.forEach((setting) => {
          settingsObject[setting.setting_key] = setting.setting_value;
        });
        
        setSettings(settingsObject);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch settings:", err);
        setError("Failed to load settings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  // Function to update a setting
  const updateSetting = async (key, value) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      
      await axios.put(
        ENDPOINTS.SETTINGS.UPDATE,
        {
          setting_key: key,
          setting_value: value
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      // Update local state
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
      
      return { success: true };
    } catch (err) {
      console.error(`Failed to update setting ${key}:`, err);
      return { 
        success: false, 
        error: err.response?.data?.message || "Failed to update setting" 
      };
    } finally {
      setLoading(false);
    }
  };

  // Event handlers với useCallback
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Memoized components
  const PageHeader = useMemo(
    () => (
      <div className="mb-8 opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards]">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-1 py-3">
          <div className="flex items-center mb-4 md:mb-0">
            <div
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm !mr-8"
              style={{ marginRight: "2rem !important" }}
            >
              <Settings size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Settings Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your account preferences and notification settings
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    []
  );

  // SettingsTabs component
  const SettingsTabs = useMemo(
    () => (
      <div className="flex flex-wrap gap-2 mb-6 opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards]">
        <button
          onClick={() => handleTabChange("account")}
          className={`flex items-center justify-center !border group py-2 px-4 rounded-md transition-all duration-200 [outline:none!important] ${
            activeTab === "account"
              ? "!bg-blue-600 !border-blue-600"
              : "bg-white !border-gray-300 hover:!bg-blue-50 hover:!border-blue-600"
          }`}
        >
          <User size={18} className={`mr-2 ${activeTab === "account" ? "text-white" : "text-gray-700 group-hover:text-blue-600"}`} />
          <span className={`${activeTab === "account" ? "text-white" : "text-gray-700 group-hover:text-blue-600"} transition-all duration-200 font-medium`}>Account</span>
        </button>
        <button
          onClick={() => handleTabChange("notification")}
          className={`flex items-center justify-center !border group py-2 px-4 rounded-md transition-all duration-200 [outline:none!important] ${
            activeTab === "notification"
              ? "!bg-blue-600 !border-blue-600"
              : "bg-white !border-gray-300 hover:!bg-blue-50 hover:!border-blue-600"
          }`}
        >
          <Bell size={18} className={`mr-2 ${activeTab === "notification" ? "text-white" : "text-gray-700 group-hover:text-blue-600"}`} />
          <span className={`${activeTab === "notification" ? "text-white" : "text-gray-700 group-hover:text-blue-600"} transition-all duration-200 font-medium`}>Notifications</span>
        </button>
        <button
          onClick={() => handleTabChange("privacy")}
          className={`flex items-center justify-center !border group py-2 px-4 rounded-md transition-all duration-200 [outline:none!important] ${
            activeTab === "privacy"
              ? "!bg-blue-600 !border-blue-600"
              : "bg-white !border-gray-300 hover:!bg-blue-50 hover:!border-blue-600"
          }`}
        >
          <Shield size={18} className={`mr-2 ${activeTab === "privacy" ? "text-white" : "text-gray-700 group-hover:text-blue-600"}`} />
          <span className={`${activeTab === "privacy" ? "text-white" : "text-gray-700 group-hover:text-blue-600"} transition-all duration-200 font-medium`}>Privacy</span>
        </button>
        <button
          onClick={() => handleTabChange("documents")}
          className={`flex items-center justify-center !border group py-2 px-4 rounded-md transition-all duration-200 [outline:none!important] ${
            activeTab === "documents"
              ? "!bg-blue-600 !border-blue-600"
              : "bg-white !border-gray-300 hover:!bg-blue-50 hover:!border-blue-600"
          }`}
        >
          <FileText size={18} className={`mr-2 ${activeTab === "documents" ? "text-white" : "text-gray-700 group-hover:text-blue-600"}`} />
          <span className={`${activeTab === "documents" ? "text-white" : "text-gray-700 group-hover:text-blue-600"} transition-all duration-200 font-medium`}>Documents</span>
        </button>
      </div>
    ),
    [activeTab, handleTabChange]
  );

  // Tab Content with loading state
  const TabContent = useMemo(() => {
    if (loading && !Object.keys(settings).length) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <p className="text-gray-600">Loading settings...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            className="flex items-center justify-center bg-white !border !border-blue-600 group py-2 px-4 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important] mt-4 mx-auto"
            onClick={() => window.location.reload()}
          >
            <span className="text-black group-hover:text-white transition-all duration-200 font-medium">Retry</span>
          </button>
        </div>
      );
    }

    const componentProps = {
      settings,
      updateSetting,
      loading
    };

    switch (activeTab) {
      case "account":
        return <AccountSettings {...componentProps} />;
      case "notification":
        return <NotificationSettings {...componentProps} />;
      case "privacy":
        return <PrivacySettings {...componentProps} />;
      case "documents":
        return <DocumentsSettings {...componentProps} />;
      default:
        return <AccountSettings {...componentProps} />;
    }
  }, [activeTab, settings, loading, error, updateSetting]);

  // Footer
  const Footer = useMemo(
    () => (
      <div className="mt-8 text-center text-gray-500 text-xs py-3 border-t border-gray-200" style={lineSpacing}>
        <p></p>
      </div>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col [backface-visibility:hidden]">
      <Breadcrumb
        title="Settings"
        className="bg-blue-600 py-6 text-white text-center"
      />

      <div className="flex-1 flex">
        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {PageHeader}
            {SettingsTabs}
            {TabContent}
            {Footer}
          </div>
        </div>
      </div>

      <Gotop />
    </div>
  );
}

export default SettingPage;