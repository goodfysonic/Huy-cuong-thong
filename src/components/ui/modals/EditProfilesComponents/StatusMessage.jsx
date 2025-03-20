import React from 'react';
import PropTypes from 'prop-types';

const StatusMessage = ({ error, success }) => {
  if (!error && !success) return null;
  
  return (
    <>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}
    </>
  );
};

StatusMessage.propTypes = {
  error: PropTypes.string,
  success: PropTypes.bool
};

StatusMessage.defaultProps = {
  error: null,
  success: false
};

export default StatusMessage;