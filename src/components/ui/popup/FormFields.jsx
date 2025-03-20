import React from "react";
import PropTypes from "prop-types";
import SelectLocation from "../dropdown";
import { WORK_MODES, EMPLOYMENT_TYPES, SOURCES, POSTED_PERIODS, SALARY_RANGES } from "@/constants/endpoints";

export const JobTitleField = ({ value, onChange }) => (
  <div className="group-form">
    <label className="title">Job Title</label>
    <div className="group-input search-ip">
      <button type="button">
        <i className="icon-search"></i>
      </button>
      <input
        type="text"
        name="query"
        value={value}
        onChange={onChange}
        placeholder="Job title, key words or company"
      />
    </div>
  </div>
);

JobTitleField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// export const LocationField = ({ value, onChange }) => (
//   <div className="group-form">
//     <label className="title">Location</label>
//     <div className="group-input has-icon">
//       <i className="icon-map-pin"></i>
//       <SelectLocation value={value} onChange={onChange} />
//     </div>
//   </div>
// );

// LocationField.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

export const WorkModeField = ({ value, onChange }) => (
  <div className="group-form">
    <label className="title">Work Mode</label>
    <div className="group-input">
      <select name="work_mode" value={value} onChange={onChange} className="form-select">
        <option value="">All Work Modes</option>
        {WORK_MODES.map((mode) => (
          <option key={mode.value} value={mode.value}>
            {mode.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

WorkModeField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const EmploymentTypeField = ({ value, onChange }) => (
  <div className="group-form">
    <label className="title">Employment Type</label>
    <div className="group-input">
      <select name="employment_type" value={value} onChange={onChange} className="form-select">
        <option value="">All Employment Types</option>
        {EMPLOYMENT_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

EmploymentTypeField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const SourceField = ({ value, onChange }) => (
  <div className="group-form">
    <label className="title">Source</label>
    <div className="group-input">
      <select name="source" value={value} onChange={onChange} className="form-select">
        <option value="">All Sources</option>
        {SOURCES.map((source) => (
          <option key={source.value} value={source.value}>
            {source.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

SourceField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const PostedPeriodField = ({ value, onChange }) => (
  <div className="group-form">
    <label className="title">Posted Anytime</label>
    <div className="group-input">
      <select name="posted_period" value={value} onChange={onChange} className="form-select">
        {POSTED_PERIODS.map((period) => (
          <option key={period.value} value={period.value}>
            {period.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

PostedPeriodField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const SalaryRangeField = ({ value, onChange }) => (
  <div className="group-form">
    <label className="title">Salary</label>
    <div className="group-input">
      <select name="salary_range" value={value} onChange={onChange} className="form-select">
        <option value="negotiable">Negotiable</option>
        {SALARY_RANGES.filter((range) => !range.negotiated).map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

SalaryRangeField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const SortByField = ({ value, onChange }) => (
  <div className="group-form">
    <label className="title">Sort By</label>
    <div className="group-input">
      <select name="sort_by" value={value} onChange={onChange} className="form-select">
        <option value="posted_date">Posted Date</option>
        <option value="job_title">Job Title</option>
        <option value="company_name">Company Name</option>
      </select>
    </div>
  </div>
);

SortByField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const SortDirectionField = ({ value, onChange }) => (
  <div className="group-form">
    <label className="title">Sort Direction</label>
    <div className="group-input">
      <select name="direction" value={value} onChange={onChange} className="form-select">
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  </div>
);

SortDirectionField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};