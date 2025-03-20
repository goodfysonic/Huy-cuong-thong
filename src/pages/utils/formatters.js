
/**
 * Format date for API (yyyy-mm-dd)
 * @param {string} dateString The date string to format
 * @returns {string} Formatted date string or empty string
 */
export const formatDateToApi = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  /**
   * Format date from ISO string to input field (YYYY-MM-DD)
   * @param {string} dateString The date string to format
   * @returns {string} Formatted date string or empty string
   */
  export const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  /**
 * Format salary range với xử lý nhiều trường hợp khác nhau
 * @param {number|null} minAmount - Mức lương tối thiểu
 * @param {number|null} maxAmount - Mức lương tối đa
 * @returns {string} - Chuỗi đã định dạng theo các quy tắc
 */
export const formatSalaryRange = (minAmount, maxAmount) => {
  // Trường hợp 1: Negotiable hoặc không có giá trị
  if (
    (minAmount === null || minAmount === undefined || minAmount === 0) &&
    (maxAmount === null || maxAmount === undefined || maxAmount === 0)
  ) {
    return "Negotiable";
  }

  // Hàm format số với phân cách hàng nghìn
  const formatNumber = (num) => {
    // Nếu số lớn hơn hoặc bằng 1 triệu
    if (num >= 1000000) {
      // Chuyển sang định dạng triệu (M) hoặc nghìn (K)
      if (num >= 1000000000) {
        // Tỷ - hiển thị dưới dạng B (billion)
        return (num / 1000000000).toLocaleString(undefined, { 
          maximumFractionDigits: 1, 
          minimumFractionDigits: 0 
        }) + "B";
      } else {
        // Triệu - hiển thị dưới dạng M (million)
        return (num / 1000000).toLocaleString(undefined, { 
          maximumFractionDigits: 1, 
          minimumFractionDigits: 0 
        }) + "M";
      }
    } else if (num >= 1000) {
      // Nghìn - hiển thị dưới dạng K (kilo)
      return (num / 1000).toLocaleString(undefined, { 
        maximumFractionDigits: 1, 
        minimumFractionDigits: 0 
      }) + "K";
    }
    
    // Số nhỏ - hiển thị nguyên vẹn
    return num.toLocaleString();
  };

  // Trường hợp 2: Chỉ có minAmount
  if (maxAmount === null || maxAmount === undefined || maxAmount === 0 || maxAmount === minAmount) {
    return `$${formatNumber(minAmount)}`;
  }

  // Trường hợp 3: Có cả minAmount và maxAmount
  return `$${formatNumber(minAmount)} - $${formatNumber(maxAmount)}`;
};

/**
 * Format địa chỉ từ mảng các địa chỉ
 * @param {Array|Object|string} addresses - Mảng hoặc đối tượng chứa thông tin địa chỉ
 * @returns {string} - Chuỗi địa chỉ đã định dạng
 */
export const formatAddress = (addresses) => {
  if (!addresses) return "Remote";

  // Xử lý nếu addresses là một chuỗi
  if (typeof addresses === "string") {
    return addresses;
  }

  // Xử lý nếu addresses là một mảng
  if (Array.isArray(addresses)) {
    if (addresses.length === 0) return "Remote";
    
    // Lấy địa chỉ đầu tiên nếu có nhiều địa chỉ
    const firstAddress = addresses[0];
    
    if (typeof firstAddress === "string") {
      return firstAddress;
    }
    
    if (typeof firstAddress === "object" && firstAddress !== null) {
      // Xử lý các trường hợp khác nhau của cấu trúc đối tượng địa chỉ
      if (firstAddress.full_address) return firstAddress.full_address;
      if (firstAddress.city && firstAddress.country) {
        return `${firstAddress.city}, ${firstAddress.country}`;
      }
      if (firstAddress.city) return firstAddress.city;
      if (firstAddress.country) return firstAddress.country;
      if (firstAddress.address) return firstAddress.address;
    }
    
    return "Remote";
  }

  // Xử lý nếu addresses là một đối tượng đơn
  if (typeof addresses === "object" && addresses !== null) {
    if (addresses.full_address) return addresses.full_address;
    if (addresses.city && addresses.country) {
      return `${addresses.city}, ${addresses.country}`;
    }
    if (addresses.city) return addresses.city;
    if (addresses.country) return addresses.country;
    if (addresses.address) return addresses.address;
  }

  return "Remote";
};
