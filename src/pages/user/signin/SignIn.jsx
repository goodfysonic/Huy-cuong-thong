import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GOOGLE_AUTH_URL } from '@/constants/endpoints';
import { login } from '@/pages/utils/APIUtils';
import { useAuth } from '@/routes/AuthContext';
import { ACCESS_TOKEN } from '@/constants/endpoints';
import logo from "@/assets/images/logo2.png";
import './SignIn.scss';

function SignIn() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { from } = location.state || { from: { pathname: "/jobs" } };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
        const response = await login(formData);
        console.log('Login Response:', response);
        if (response.status === 200 && response.token) {
            localStorage.setItem(ACCESS_TOKEN, response.token);
            console.log('Token saved to localStorage:', response.token);
            setUser(response);
            navigate('/jobs');
        } else {
            throw new Error('Invalid login response');
        }
    } catch (error) {
        setError(error.message || 'An error occurred during sign in');
    } finally {
        setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-form-wrapper">
          <div className="login-header">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>LOGIN</h2>
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                Username or email address<span className="required">*</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">
                Password<span className="required">*</span>
              </label>
              <div className="password-field">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "👁️" : "🔒"}
                </button>
              </div>
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
            
            <div className="divider">
              <span>or</span>
            </div>
            
            <Link to={GOOGLE_AUTH_URL} className="google-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              Continue with Google
            </Link>
            
            <div className="signup-link">
              Not registered yet? <Link to="/signup">Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;