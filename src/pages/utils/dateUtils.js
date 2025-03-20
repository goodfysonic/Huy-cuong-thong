// Hàm format date theo định dạng DD/MM/YY
export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Kiểm tra xem date có hợp lệ không
    if (isNaN(date.getTime())) {
      // Nếu dateString đã ở định dạng DD/MM/YY thì trả về luôn
      if (/^\d{2}\/\d{2}\/\d{2}$/.test(dateString)) {
        return dateString;
      }
      return '';
    }
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    
    return `${day}/${month}/${year}`;
  };
  
  // Hàm kiểm tra loại file có hợp lệ không
  export const isValidFileType = (fileName) => {
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    return validExtensions.includes(fileExtension);
  };
  
  // Hàm kiểm tra kích thước file có hợp lệ không (dưới 3MB)
  export const isValidFileSize = (fileSize) => {
    const maxSizeInBytes = 3 * 1024 * 1024; // 3MB
    return fileSize <= maxSizeInBytes;
  };
  
  // Trích xuất phần mở rộng từ tên file
  export const getFileExtension = (fileName) => {
    if (!fileName) return '';
    return fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  };