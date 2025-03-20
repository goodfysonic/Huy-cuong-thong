import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SelectLocation from "../dropdown";
import ResumeDropdown from "../dropdown/ResumeDropdown";
import { useNavigate, useLocation } from 'react-router-dom';

function FormSearch({ onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState("");
  
  // Đọc city từ URL khi component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get("city");
    
    if (params.has("city")) {
      // If the city param is "All City" or "All+City", set it to empty string
      if (cityParam === "All City" || cityParam === "All+City") {
        setSelectedCity("");
        // Remove the city param from URL immediately if it's "All City"
        params.delete("city");
        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
      } else {
        setSelectedCity(cityParam);
      }
    } else {
      setSelectedCity("");
    }
  }, [location.search, navigate, location.pathname]);

  // Xử lý khi city thay đổi
  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lấy URL hiện tại
    const currentParams = new URLSearchParams(location.search);
    
    // Xử lý city parameter
    if (selectedCity && selectedCity.trim() !== "" && 
        selectedCity !== "All City" && selectedCity !== "All+City") {
      currentParams.set("city", selectedCity);
    } else {
      // Xóa city parameter nếu là "All City" hoặc empty string
      currentParams.delete("city");
    }
    
    // Reset trang về 0 khi filter thay đổi
    currentParams.set("offset", "0");
    
    // Log để debug
    console.log("Filtering with city:", selectedCity ? selectedCity : "All City (removed from URL)");
    console.log("URL params:", currentParams.toString());
    
    // Navigate đến URL mới
    navigate(`${location.pathname}?${currentParams.toString()}`);
    
    // Gọi callback nếu có
    if (onSearch) {
      onSearch({
        city: selectedCity
      });
    }
  };

  return (
    <section className="form-sticky stc1">
      <div className="tf-container">
        <div className="job-search-form inner-form-map st1">
          <form onSubmit={handleSubmit}>
            <div className="row-group-search">
              <div className="form-group-1">
                <input
                  type="text"
                  className="input-filter-search"
                  placeholder="Job title, key words or company"
                  disabled={true}
                />
                <span className="icon-search search-job"></span>
              </div>
              <div className="form-group-separator"></div>
              <div className="form-group-2">
                <span className="icon-map-pin"></span>
                <SelectLocation 
                  value={selectedCity}
                  onChange={handleCityChange}
                />
              </div>
              <div className="form-group-separator"></div>
              <div className="form-group-3">
                <ResumeDropdown 
                  onSelect={() => {}}
                />
              </div>
              <div className="form-group-separator"></div>
              <div className="form-group-4">
                <button type="submit" className="btn btn-find">Filter by City</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

FormSearch.propTypes = {
  onSearch: PropTypes.func
};

export default FormSearch;