// ProfilePage.jsx
import React, { useState, useCallback, useMemo } from "react";
import Breadcrumb from "@/components/ui/breadcrumb";
import Gotop from "@/components/ui/gotop";
import UserInfo from "./UserInfo";
import ResumeSection from "./ResumeSection";
import { User, LayoutGrid, LayoutList } from "lucide-react";

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

function ProfilePage() {
  // State
  const [layout, setLayout] = useState(LAYOUTS.GRID);

  // Event handlers with useCallback
  const toggleLayout = useCallback(() => {
    setLayout((prev) => (prev === LAYOUTS.GRID ? LAYOUTS.LIST : LAYOUTS.GRID));
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
              <User size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Profile Dashboard
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage your personal information and resumes
              </p>
            </div>
          </div>

          {/* Layout toggle */}
          <button
            onClick={toggleLayout}
            className="flex items-center justify-center bg-white !border !border-blue-600 group py-2 px-4 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important]"
          >
            {layout === LAYOUTS.GRID ? (
              <>
                <LayoutList
                  size={18}
                  className="mr-3 text-black group-hover:text-white transition-all duration-200"
                  style={iconStyle}
                />
                <span className="text-black group-hover:text-white transition-all duration-200 font-medium">
                  List View
                </span>
              </>
            ) : (
              <>
                <LayoutGrid
                  size={18}
                  className="mr-3 text-black group-hover:text-white transition-all duration-200"
                  style={iconStyle}
                />
                <span className="text-black group-hover:text-white transition-all duration-200 font-medium">
                  Grid View
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    ),
    [layout, toggleLayout]
  );

  // Thay đổi grid layout để UserInfo chiếm 4/10 và ResumeSection chiếm 6/10
  const GridLayout = useMemo(
    () => (
      <div
        className="grid grid-cols-1 lg:grid-cols-10 gap-6"
        style={lineSpacing}
      >
        <div className="lg:col-span-4">
          <UserInfo className="opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards] h-full" />
        </div>
        <div className="lg:col-span-6">
          <ResumeSection className="opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards] animate-delay-100 h-full" />
        </div>
      </div>
    ),
    []
  );

  const ListLayout = useMemo(
    () => (
      <div className="space-y-6">
        <div className="mb-2">
          <UserInfo className="opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards]" />
        </div>
        <ResumeSection className="opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards] animate-delay-100" />
      </div>
    ),
    []
  );

  const Footer = useMemo(
    () => (
      <div
        className="mt-8 text-center text-gray-500 text-xs py-3 border-t border-gray-200"
        style={lineSpacing}
      >
        <p></p>
      </div>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col [backface-visibility:hidden]">
      <Breadcrumb
        title="My Profile"
        className="bg-blue-600 py-6 text-white text-center"
      />

      <div className="flex-1 flex">
        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {PageHeader}

            {layout === LAYOUTS.GRID ? GridLayout : ListLayout}

            {Footer}
          </div>
        </div>
      </div>

      <Gotop />
    </div>
  );
}

export default ProfilePage;
