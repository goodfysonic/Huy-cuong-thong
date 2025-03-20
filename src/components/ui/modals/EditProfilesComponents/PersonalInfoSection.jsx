import React from 'react';
import PropTypes from 'prop-types';

const PersonalInfoSection = ({ formData, handleChange, hasEmail }) => {
  return (
    <>
      <div>
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-row-2">
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            readOnly={hasEmail} // Make email readonly if already exists
          />
        </div>
        <div>
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-row-2">
        <div>
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </>
  );
};

PersonalInfoSection.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    birthday: PropTypes.string,
    gender: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  hasEmail: PropTypes.bool
};

PersonalInfoSection.defaultProps = {
  hasEmail: false
};

export default PersonalInfoSection;