import React from "react";
import PropTypes from "prop-types";
import { useJobSearch } from "@/hooks/useJobSearch";
import {
  JobTitleField,
  // LocationField,
  WorkModeField,
  EmploymentTypeField,
  SourceField,
  PostedPeriodField,
  SalaryRangeField,
  SortByField,
  SortDirectionField
} from "./FormFields";

function PopupJob({ isShow, handlePopup, onSearch }) {
  const {
    formState,
    handleInputChange,
    handleNumericInputChange,
    handleSelectChange,
    handleSalaryRangeChange,
    handleSubmit
  } = useJobSearch(onSearch);

  return (
    <div className="sidebar-popup">
      <div className="modal-menu__backdrop" onClick={handlePopup}></div>
      <div className="widget-filter">
        <form onSubmit={(e) => handleSubmit(e, handlePopup)}>
          <JobTitleField value={formState.query} onChange={handleInputChange} />
          {/* <LocationField 
            value={formState.location} 
            onChange={(e) => handleSelectChange("location", e.target.value)} 
          /> */}
          <WorkModeField 
            value={formState.work_mode} 
            onChange={(e) => handleSelectChange("work_mode", e.target.value)} 
          />
          <EmploymentTypeField 
            value={formState.employment_type} 
            onChange={(e) => handleSelectChange("employment_type", e.target.value)} 
          />
          <SourceField 
            value={formState.source} 
            onChange={(e) => handleSelectChange("source", e.target.value)} 
          />
          <PostedPeriodField 
            value={formState.posted_period} 
            onChange={(e) => handleSelectChange("posted_period", e.target.value)} 
          />
          <SalaryRangeField value={formState.salary_range} onChange={handleSalaryRangeChange} />
          <SortByField value={formState.sort_by} onChange={handleSelectChange} />
          <SortDirectionField value={formState.direction} onChange={handleSelectChange} />
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Find Jobs
          </button>
        </form>
      </div>
    </div>
  );
}

PopupJob.propTypes = {
  isShow: PropTypes.bool.isRequired,
  handlePopup: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default PopupJob;
