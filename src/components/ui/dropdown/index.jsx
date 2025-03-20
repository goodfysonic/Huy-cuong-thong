import React from "react";
import Dropdown from "react-dropdown";
import PropTypes from "prop-types";

const cityOptions = [
  { value: "All City", label: "All City" },
  { value: "Hanoi", label: "Ha Noi" },
  { value: "Ho Chi Minh", label: "Ho Chi Minh" },
  { value: "Da Nang", label: "Da Nang" },
  { value: "Hai Phong", label: "Hai Phong" },
  { value: "Can Tho", label: "Can Tho" },
  { value: "Nha Trang", label: "Nha Trang" },
  { value: "Hue", label: "Hue" },
  { value: "Da Lat", label: "Da Lat" },
  { value: "Vung Tau", label: "Vung Tau" },
  { value: "Bien Hoa", label: "Bien Hoa" }
];

function SelectLocation({ value, onChange }) {
  // Normalize the incoming value
  // If the value is "All City" or "All+City", convert it to empty string
  const normalizedValue = value === "All City" || value === "All+City" ? "" : value;
  
  // Tìm selected option dựa trên value
  const selectedOption = normalizedValue 
    ? cityOptions.find(option => option.value === normalizedValue) 
    : cityOptions[0]; // Default to All City
  
  // Ensure we always have a valid option
  const finalSelectedOption = selectedOption || cityOptions[0];

  // Xử lý sự kiện onChange từ Dropdown
  const handleChange = (selected) => {
    if (onChange) {
      // Make sure we're always passing the value, not the label
      onChange(selected.value);
    }
  };

  return (
    <Dropdown
      options={cityOptions}
      className="react-dropdown select-location"
      value={finalSelectedOption}
      onChange={handleChange}
    />
  );
}

SelectLocation.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectLocation;