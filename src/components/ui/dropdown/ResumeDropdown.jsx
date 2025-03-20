import React, { useState } from "react";
import PropTypes from "prop-types";

function ResumeDropdown({ onSelect }) {
  const [selectedResume, setSelectedResume] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const resumeOptions = [
    { id: 1, name: "IT.pdf" },
    { id: 2, name: "Accounting.pdf" },
    { id: 3, name: "Marketing.pdf" },
    { id: 4, name: "Engineering.pdf" },
    { id: 5, name: "Sales.pdf" }
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (resumeName) => {
    setSelectedResume(resumeName);
    setIsOpen(false);
    
    // Callback to parent component if provided
    if (onSelect) {
      onSelect(resumeName);
    }
  };

  return (
    <div className="resume-dropdown">
      <div 
        className={`resume-selector ${isOpen ? "open" : ""}`} 
        onClick={handleClick}
      >
        <p>{selectedResume || "Select Resume"}</p>
      </div>
      {isOpen && (
        <div className="resume-options">
          {resumeOptions.map((resume) => (
            <div 
              key={resume.id} 
              className="resume-option"
              onClick={() => handleSelect(resume.name)}
            >
              {resume.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ResumeDropdown.propTypes = {
  onSelect: PropTypes.func
};

export default ResumeDropdown;