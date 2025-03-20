import React from 'react';
import PropTypes from 'prop-types';

function Breadcrumb({ title, className }) {
  return (
    <section className={className}>
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-title">
              <h1>{title}</h1>
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