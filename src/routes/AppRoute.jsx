import { Routes, Route, Navigate } from "react-router-dom";
import JobList from "@/pages/job/JobList";
import SignIn from "@/pages/user/signin/SignIn";
import OAuth2RedirectHandler from "@/pages/user/oauth2/OAuth2RedirectHandler";
import Layout from "@/components/layouts/Layout";
import { ACCESS_TOKEN } from "@/constants/endpoints";
import ProfilePage from "@/pages/user/profile/ProfilePage";
import SettingPage from "@/pages/setting/SettingPage";
import { useEffect, useState } from "react";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(ACCESS_TOKEN));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem(ACCESS_TOKEN));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
     
      <Route path="/login" element={<SignIn />} />
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route element={<Layout />}>
      <Route
        path="/profile"
        element={
          isAuthenticated 
            ? <ProfilePage /> 
            : <Navigate to="/login" state={{ from: "/profile" }} replace />
        }
      />
      <Route
        path="/settings"
        element={
          isAuthenticated 
            ? <SettingPage /> 
            : <Navigate to="/login" state={{ from: "/settings" }} replace />
        }
      />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/" element={<JobList />} />

      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;