import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/images/logo2.png";
import { Link, NavLink } from "react-router-dom";
import UserDropdown from "@/components/ui/dropdown/UserDropDown";
import { ACCESS_TOKEN } from "@/constants/endpoints";

Header4.propTypes = {
  clname: PropTypes.string,
  handleMobile: PropTypes.func,
};

function Header4({ clname = "", handleMobile }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Listen for storage changes in case of logout in another tab
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <header id="header" className="header header-default">
      <div className="tf-container ct2">
        <div className="row">
          <div className="col-md-12">
            <div className="sticky-area-wrap">
              <div className="header-ct-left">
                <div id="logo" className="logo">
                  <Link to="/">
                    <img
                      className="site-logo"
                      id="trans-logo"
                      src={logo}
                      alt="Image"
                    />
                  </Link>
                </div>
              </div>
              <div className="header-ct-center">
                <div className="nav-wrap">
                  <nav id="main-nav" className="main-nav">
                    <ul
                      id="menu-primary-menu"
                      className={`menu ${clname} flex gap-6`}
                    >
                      <ul className="flex gap-20">
                        {[
                          { to: "/", text: "Home" },
                          { to: "/about-us", text: "About Us" },
                          { to: "/terms-of-service", text: "Term of Services" },
                          { to: "/privacy-policy", text: "Private Policy" },
                        ].map((item, index) => (
                          <li key={index} className="menu-item relative group">
                            <Link
                              to={item.to}
                              className="relative py-2 px-1 inline-block transition-transform duration-300 group-hover:-translate-y-1"
                            >
                              {item.text}
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="header-ct-right">
                {isLoggedIn ? (
                  <>
                    <UserDropdown setIsLoggedIn={setIsLoggedIn} />
                    <div className="header-customize-item button">
                      <Link to="/upload-resume">Upload Resume</Link>
                    </div>
                  </>
                ) : (
                  <div className="header-customize-item button">
                    <Link to="/login">Login</Link>
                  </div>
                )}
              </div>
              <div className="nav-filter" onClick={handleMobile}>
                <div className="nav-mobile">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header4;
