import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Breadcrumb({ title, className }) {
  return (
    <section className={`bg-f5 py-2 ${className ? className : ""}`}>
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-title">
              <div className="widget-menu-link">
                <ul className="flex items-center text-sm">
                  <li>
                    <Link to="/" className="text-gray-500 hover:text-blue-600 transition-colors">Home</Link>
                  </li>
                  <li className="flex items-center">
                    <span className="mx-1 text-gray-400"></span>
                    <Link to="#" className="text-gray-700">{title}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Breadcrumb;