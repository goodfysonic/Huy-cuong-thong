
import React from 'react';

const AddressSection = ({ address, handleChange }) => {
  return (
    <>
      <div>
        <label className="form-label">Address Line 1</label>
        <input
          type="text"
          name="address.address_line1"
          placeholder="Street address, house number"
          value={address.address_line1}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div>
        <label className="form-label">Address Line 2</label>
        <input
          type="text"
          name="address.address_line2"
          placeholder="Apartment, suite, unit, building, floor, etc."
          value={address.address_line2}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-row-2">
        <div>
          <label className="form-label">Country</label>
          <select
            name="address.country"
            value={address.country}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Vietnam">Vietnam</option>
            <option value="Singapore">Singapore</option>
            <option value="USA">USA</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="form-label">City</label>
          <input
            type="text"
            name="address.city"
            value={address.city}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-row-2">
        <div>
          <label className="form-label">State/Province</label>
          <input
            type="text"
            name="address.state_or_province"
            value={address.state_or_province}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            name="address.postal_code"
            value={address.postal_code}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>
    </>
  );
};

export default AddressSection;