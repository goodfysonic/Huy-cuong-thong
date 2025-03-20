import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { request } from '@/pages/utils/APIUtils';
import { DEFAULT_FORM_STATE } from "@/constants/endpoints";

export function useJobSearch(onSearch) {
    const navigate = useNavigate();
    const location = useLocation();
    const [formState, setFormState] = useState(DEFAULT_FORM_STATE);
  
    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const updatedState = { ...DEFAULT_FORM_STATE };
      
      if (searchParams.has("city")) updatedState.city = searchParams.get("city");
      searchParams.delete("location");
      
      setFormState(updatedState);
      
      if (window.location.search) {
        fetchJobs(searchParams);
      }
    }, [window.location.search]);

   const fetchJobs = async (params) => {
    setFormState(prev => ({ ...prev, loading: true }));
    
    try {
      const baseUrl = "http://localhost:8080/api/v1/jobs";
      
      const apiParams = new URLSearchParams(params);
      const apiUrl = `${baseUrl}?${apiParams.toString()}`;
      
      const response = await request({
        url: apiUrl,
        method: 'GET',
      });
      
      setFormState(prev => ({ 
        ...prev, 
        jobs: response.data || [], 
        loading: false 
      }));
      
      if (onSearch) {
        onSearch(apiUrl, response);
      }
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setFormState(prev => ({ ...prev, loading: false }));
    }
  };
  
  const handleSelectChange = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, closePopup) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    if (formState.query) params.set("query", formState.query);
    params.set("sort_by", formState.sort_by);
    params.set("limit", formState.limit.toString());
    params.set("offset", "0");
    params.set("direction", formState.direction);
    
    if (formState.city) {
      params.set("city", formState.city);
    }
    
    navigate(`${location.pathname}?${params.toString()}`);
    
    if (closePopup) {
      closePopup();
    }
  };

  return {
    formState,
    handleSelectChange,
    handleSubmit
  };
}