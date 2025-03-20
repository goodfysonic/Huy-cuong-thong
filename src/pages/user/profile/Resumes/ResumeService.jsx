// Hiển thị lỗi trong modal thay vì console
const showErrorModal = (message) => {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'fixed inset-0 flex items-center justify-center z-[10000] bg-black bg-opacity-50';
  
  const errorContent = document.createElement('div');
  errorContent.className = 'bg-white rounded-lg shadow-lg p-6 max-w-md';
  
  const title = document.createElement('h3');
  title.className = 'text-lg font-medium text-red-600 mb-2';
  title.textContent = 'Error';
  
  const errorMessage = document.createElement('p');
  errorMessage.className = 'text-gray-700 mb-4';
  errorMessage.textContent = message;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors';
  closeButton.textContent = 'Close';
  closeButton.onclick = () => document.body.removeChild(errorDiv);
  
  errorContent.appendChild(title);
  errorContent.appendChild(errorMessage);
  errorContent.appendChild(closeButton);
  errorDiv.appendChild(errorContent);
  
  document.body.appendChild(errorDiv);
};

import { ENDPOINTS } from "@/constants/endpoints";

// Hàm tiện ích để gọi API với authorization
const apiCall = async (url, method, body = null) => {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      let errorMessage = `HTTP error: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Ignore JSON parsing error
      }
      
      throw new Error(errorMessage);
    }

    // Check if response is 204 No Content
    if (response.status === 204) {
      return true;
    }

    return await response.json();
  } catch (error) {
    // Thêm chi tiết về lỗi
    console.error(`API Error (${method} ${url}):`, error);
    throw error;
  }
};

// Service xử lý tất cả các tương tác với API liên quan đến Resume
const ResumeService = {
  // Lấy danh sách tất cả resume của người dùng
  getAllResumes: async () => {
    try {
      return await apiCall(ENDPOINTS.RESUMES.LIST, 'GET');
    } catch (error) {
      console.error('Error fetching resumes:', error);
      throw error;
    }
  },

  // Lấy thông tin chi tiết của một resume
  getResumeById: async (resumeId) => {
    try {
      if (!resumeId) throw new Error('Resume ID is required');
      return await apiCall(ENDPOINTS.RESUMES.GET(resumeId), 'GET');
    } catch (error) {
      console.error(`Error fetching resume ${resumeId}:`, error);
      throw error;
    }
  },

  // Upload resume mới
  uploadResume: async (file) => {
    try {
      if (!file) throw new Error('File is required');
      
      const formData = new FormData();
      formData.append('file', file);
      // Thêm tên file vào formData
      formData.append('filename', file.name);
      // Thêm các metadata khác nếu cần
      formData.append('originalName', file.name);

      const response = await fetch(ENDPOINTS.RESUMES.UPLOAD, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          // Không cần set Content-Type khi sử dụng FormData
        },
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Failed to upload resume: ${response.status}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Ignore JSON parsing error
        }
        
        // Sử dụng modal thông báo lỗi
        showErrorModal(errorMessage);
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      // Đảm bảo tên file được giữ nguyên
      if (result && !result.resume_name) {
        result.resume_name = file.name;
      }
      
      return result;
    } catch (error) {
      console.error('Error uploading resume:', error);
      // Sử dụng modal thông báo lỗi
      showErrorModal(`Error uploading resume: ${error.message}`);
      throw error;
    }
  },

  // Cập nhật thông tin resume
  updateResume: async (resumeId, resumeData) => {
    try {
      if (!resumeId) throw new Error('Resume ID is required');
      if (!resumeData) throw new Error('Resume data is required');
      
      return await apiCall(ENDPOINTS.RESUMES.UPDATE(resumeId), 'PUT', resumeData);
    } catch (error) {
      console.error(`Error updating resume ${resumeId}:`, error);
      throw error;
    }
  },

  // Xóa resume
  deleteResume: async (resumeId) => {
    try {
      if (!resumeId) throw new Error('Resume ID is required');
      
      // Fix đường dẫn API để khớp với endpoint thực tế
      const deleteEndpoint = ENDPOINTS.RESUMES.DELETE ? 
        ENDPOINTS.RESUMES.DELETE(resumeId) : 
        `/api/v1/resumes/${resumeId}`;
      
      const response = await fetch(deleteEndpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        let errorMessage = `Failed to delete resume: ${response.status}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Ignore JSON parsing error
        }
        
        // Sử dụng modal thông báo lỗi
        showErrorModal(errorMessage);
        throw new Error(errorMessage);
      }
      
      // Check if response is 204 No Content
      if (response.status === 204) {
        return true;
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error deleting resume ${resumeId}:`, error);
      // Sử dụng modal thông báo lỗi
      showErrorModal(`Error deleting resume: ${error.message}`);
      throw error;
    }
  },

  // Cập nhật trạng thái hiển thị của resume (is_default)
  toggleDefaultResume: async (resumeId, isDefault) => {
    try {
      if (!resumeId) throw new Error('Resume ID is required');
      return await apiCall(ENDPOINTS.RESUMES.UPDATE(resumeId), 'PUT', { is_default: isDefault });
    } catch (error) {
      console.error(`Error updating resume visibility ${resumeId}:`, error);
      throw error;
    }
  },
  
  // Đặt resume làm CV chính (active) hoặc inactive
  toggleActiveResume: async (resumeId, isActive) => {
    try {
      if (!resumeId) throw new Error('Resume ID is required');
      return await apiCall(ENDPOINTS.RESUMES.UPDATE(resumeId), 'PUT', { default: isActive });
    } catch (error) {
      console.error(`Error toggling resume active state ${resumeId}:`, error);
      throw error;
    }
  },
  
  // Đặt resume làm CV chính (active)
  setActiveResume: async (resumeId) => {
    try {
      if (!resumeId) throw new Error('Resume ID is required');
      return await apiCall(ENDPOINTS.RESUMES.UPDATE(resumeId), 'PUT', { default: true });
    } catch (error) {
      console.error(`Error setting resume as active ${resumeId}:`, error);
      throw error;
    }
  }
};

// Thêm hàm showErrorModal vào window để có thể gọi từ bất kỳ đâu
window.showErrorModal = showErrorModal;

export default ResumeService;