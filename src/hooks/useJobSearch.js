import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { request } from '@/pages/utils/APIUtils';
import { SALARY_RANGES, DEFAULT_FORM_STATE } from "@/constants/endpoints";

export function useJobSearch(onSearch) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({
    ...DEFAULT_FORM_STATE,
  });

  // Load search parameters from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const updatedState = { 
      ...DEFAULT_FORM_STATE,

    };
    
    // Populate state from URL parameters if they exist
    if (searchParams.has("query")) updatedState.query = searchParams.get("query");
    // if (searchParams.has("city")) updatedState.city = searchParams.get("city");
    if (searchParams.has("work_mode")) updatedState.work_mode = searchParams.get("work_mode");
    if (searchParams.has("min_salary")) updatedState.min_salary = parseInt(searchParams.get("min_salary"), 10);
    if (searchParams.has("max_salary")) updatedState.max_salary = parseInt(searchParams.get("max_salary"), 10);
    if (searchParams.has("negotiated")) updatedState.negotiated = searchParams.get("negotiated") === "true";
    if (searchParams.has("sort_by")) updatedState.sort_by = searchParams.get("sort_by");
    if (searchParams.has("direction")) updatedState.direction = searchParams.get("direction");
    if (searchParams.has("source")) updatedState.source = searchParams.get("source");
    if (searchParams.has("employment_type")) updatedState.employment_type = searchParams.get("employment_type");
    if (searchParams.has("posted_period")) updatedState.posted_period = searchParams.get("posted_period");
    
    // Update salary range based on negotiated, min, and max values
    if (updatedState.negotiated) {
      updatedState.salary_range = "negotiable";
    } else if (updatedState.min_salary > 0 || updatedState.max_salary > 0) {
      // Find matching salary range
      const matchingRange = SALARY_RANGES.find(range => 
        !range.negotiated && range.min === updatedState.min_salary && range.max === updatedState.max_salary
      );
      
      if (matchingRange) {
        updatedState.salary_range = matchingRange.value;
      }
    }
    
    setFormState(updatedState);
    
    // If URL has search parameters, fetch results immediately
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      fetchJobs(params);
    }
  }, []);

  // Function to fetch jobs from API
  const fetchJobs = async (params) => {
    setFormState(prev => ({ ...prev, loading: true }));
    
    try {
      // Base API URL
      const baseUrl = "http://localhost:8080/api/v1/jobs";
      // Construct the final URL
      const apiUrl = `${baseUrl}?${params.toString()}`;
      
      // Call API
      const response = await request({
        url: apiUrl,
        method: 'GET',
      });
      
      // Update state with jobs
      setFormState(prev => ({ 
        ...prev, 
        jobs: response.data || [], 
        loading: false 
      }));
      
      // Call onSearch callback if provided
      if (onSearch) {
        onSearch(apiUrl, response);
      }
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setFormState(prev => ({ ...prev, loading: false }));
    }
  };

  // Handler for text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for numeric input changes
  const handleNumericInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? 0 : parseInt(value, 10);
    
    if (!isNaN(numericValue)) {
      setFormState((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    }
  };

  // Handler for select changes
  const handleSelectChange = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for salary range select
  const handleSalaryRangeChange = (e) => {
    const selectedRange = e.target.value;
    const selectedOption = SALARY_RANGES.find(range => range.value === selectedRange);
    
    if (selectedOption) {
      setFormState((prev) => ({
        ...prev,
        salary_range: selectedRange,
        min_salary: selectedOption.min,
        max_salary: selectedOption.max,
        negotiated: selectedOption.negotiated
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e, closePopup) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams(location.search);
    
    // Cập nhật/thêm params mới
    if (formState.query) params.set("query", formState.query);
    params.set("sort_by", formState.sort_by);
    params.set("limit", formState.limit.toString());
    params.set("offset", "0"); // Reset về trang đầu khi filter
    params.set("direction", formState.direction);
    
    if (formState.work_mode) {
      params.set("work_mode", formState.work_mode);
    } else {
      params.delete("work_mode");
    }
    if (formState.city) {
      params.set("city", formState.city);
    } 
    else {
      params.delete("city");
    }
    if (formState.source) {
      params.set("source", formState.source);
    } else {
      params.delete("source");
    }
    if (formState.employment_type) {
      params.set("employment_type", formState.employment_type);
    } else {
      params.delete("employment_type");
    }
    
    // Handle salary parameters
    params.set("negotiated", formState.negotiated.toString());
    
    if (!formState.negotiated) {
      // Only add min and max amount if not negotiated
      if (formState.min_salary > 0) {
        params.set("min_salary", formState.min_salary.toString());
      }
      if (formState.max_salary > 0) {
        params.set("max_salary", formState.max_salary.toString());
      }
    }
    
    // Add posted period if selected
    if (formState.posted_period) {
      const daysAgo = parseInt(formState.posted_period, 10);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      params.set("posted_date_from", date.toISOString().split('T')[0]);
    }
    
    // Navigate đến URL mới với params đã cập nhật
    navigate(`${location.pathname}?${params.toString()}`);
    
    // Đóng popup nếu có callback
    if (closePopup) {
      closePopup();
    }
  };

  return {
    formState,
    handleInputChange,
    handleNumericInputChange,
    handleSelectChange,
    handleSalaryRangeChange,
    handleSubmit
  };
}