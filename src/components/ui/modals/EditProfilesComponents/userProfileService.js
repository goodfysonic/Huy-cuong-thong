import axios from 'axios';
import { ENDPOINTS, ACCESS_TOKEN } from '@/constants/endpoints';
import { formatDateToApi } from '@/pages/utils/formatters';

/**
 * Update user profile
 * @param {Object} formData User form data
 * @param {File|null} avatar Avatar file
 * @param {boolean} deleteAvatar Flag to delete avatar
 * @returns {Promise} Promise with response
 */
export const updateUserProfile = async (formData, avatar, deleteAvatar) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  
  if (!token) {
    throw new Error("Authentication token not found. Please log in again.");
  }

  // Chuẩn bị dữ liệu người dùng
  const userData = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    birthday: formData.birthday ? formatDateToApi(formData.birthday) : '',
    gender: formData.gender,
    address: formData.address ? {
      address_line1: formData.address.address_line1,
      address_line2: formData.address.address_line2,
      city: formData.address.city,
      state_province: formData.address.state_or_province,
      postal_code: formData.address.postal_code,
      country: formData.address.country
    } : null
  };

  try {
    // TRƯỜNG HỢP 1: CÓ AVATAR MỚI - Sử dụng multipart/form-data
    if (avatar && !deleteAvatar) {
      console.log("[DEBUG] Sending request with new avatar");
      
      // Tạo FormData
      const formDataToSend = new FormData();
      
      // Thêm trường user với nội dung là JSON string
      formDataToSend.append('user', JSON.stringify(userData));
      
      // Thêm file ảnh mới
      formDataToSend.append('picture', avatar);
      
      console.log("[DEBUG] FormData entries:");
      for (let pair of formDataToSend.entries()) {
        console.log(`- ${pair[0]}: ${pair[0] === 'user' ? 'JSON data' : 'File data'}`);
      }
      
      // Sửa lỗi: Xóa transformRequest để axios tự động xử lý Content-Type
      const response = await axios.put(ENDPOINTS.USER.PROFILE, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log("[DEBUG] Response received:", response.status);
      return response;
    } 
    // TRƯỜNG HỢP 2: XÓA AVATAR - Thêm flag xóa vào userData
    else if (deleteAvatar) {
      console.log("[DEBUG] Sending request to delete avatar");
      
      // Thêm flag để backend biết cần xóa avatar
      userData.deleteAvatar = true;
      
      // Gửi JSON thông thường (không gửi multipart/form-data)
      const response = await axios.put(ENDPOINTS.USER.PROFILE, userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("[DEBUG] Response received:", response.status);
      return response;
    }
    // TRƯỜNG HỢP 3: CHỈ CẬP NHẬT THÔNG TIN - Không liên quan đến avatar
    else {
      console.log("[DEBUG] Sending request to update user info only");
      
      // Gửi JSON thông thường (không gửi multipart/form-data)
        const response = await axios.put(ENDPOINTS.USER.PROFILE, userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log("[DEBUG] Response received:", response.status);
      return response;
    }
  } catch (error) {
    console.error("[ERROR] Update profile failed:", error.message);
    
    if (error.response) {
      console.error("[ERROR] Server response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
    
    throw error;
  }
};