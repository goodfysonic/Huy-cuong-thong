import { createContext, useContext, useState, useEffect } from 'react';
import { ACCESS_TOKEN } from '@/constants/endpoints';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Kiểm tra xác thực khi component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const userData = localStorage.getItem('userData');
      
      if (token) {
        setIsAuthenticated(true);
        
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (error) {
            console.error('Error parsing user data:', error);
            setUser({ token });
          }
        } else {
          // Nếu chỉ có token mà không có userData, vẫn đặt user với token
          setUser({ token });
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      
      setLoading(false);
    };

    checkAuth();
    
    // Lắng nghe thay đổi storage
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Hàm đăng nhập
  const login = (userData, token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    setUser(userData || { token });
    setIsAuthenticated(true);
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('accessToken');
    
    // Xóa cookies
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    
    setUser(null);
    setIsAuthenticated(false);
    
    // Điều hướng đến trang login
    navigate('/login');
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}