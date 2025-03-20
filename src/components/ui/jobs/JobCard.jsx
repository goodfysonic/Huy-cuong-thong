import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import JobTags from "./JobTags";
import { formatSalaryRange, formatAddress } from "@/pages/utils/formatters";

function JobCard({ job }) {
  // State cho tooltips
  const [showCompanyTooltip, setShowCompanyTooltip] = useState(false);
  const [showJobTitleTooltip, setShowJobTitleTooltip] = useState(false);

  const handleCompareClick = (e, jobId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Compare clicked for job:", jobId);
  };

  // Tooltip styles
  const tooltipStyle = {
    position: "absolute",
    bottom: "100%",
    left: "0",
    backgroundColor: "#333",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    zIndex: "9999",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    marginBottom: "4px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    maxWidth: "300px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  return (
    <div className="features-job cl2">
      <div className="job-archive-header">
        <div className="inner-box">
          <div className="logo-company">
            {job.company_image_url ? (
              <img
                src={job.company_image_url}
                alt={job.company_name || "Company logo"}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = `<div class="company-name-fallback">${
                    job.company_name || "Company"
                  }</div>`;
                }}
              />
            ) : (
              <div className="company-name-fallback">
                {job.company_name || "Company"}
              </div>
            )}
          </div>
          <div className="box-content">
            <div className="flex justify-between items-start w-full">
              <div>
                <h4 className="text-xs text-blue-500">
                  <div 
                    style={{ position: "relative", display: "inline-block" }}
                    onMouseEnter={() => setShowCompanyTooltip(true)}
                    onMouseLeave={() => setShowCompanyTooltip(false)}
                  >
                    <Link 
                      to={`/jobs/${job.id}`} 
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "inline-block"
                      }}
                    >
                      {job.company_name || "Company"}
                    </Link>
                    {/* Tooltip cho company name */}
                    {showCompanyTooltip && job.company_name && job.company_name.length > 20 && (
                      <div style={tooltipStyle}>
                        {job.company_name}
                      </div>
                    )}
                  </div>
                </h4>
                <h3 className="text-sm font-medium">
                  <div 
                    style={{ position: "relative", display: "inline-block" }}
                    onMouseEnter={() => setShowJobTitleTooltip(true)}
                    onMouseLeave={() => setShowJobTitleTooltip(false)}
                  >
                    <Link 
                      to={`/jobs/${job.id}`}
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "inline-block"
                      }}
                    >
                      {job.job_title}
                    </Link>
                    {/* Tooltip cho job title */}
                    {showJobTitleTooltip && job.job_title && job.job_title.length > 20 && (
                      <div style={tooltipStyle}>
                        {job.job_title}
                      </div>
                    )}
                  </div>
                  {job.status === "ACTIVE" && (
                    <span className="icon-bolt"></span>
                  )}
                </h3>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs">
                  {job.source &&
                  typeof job.source === "object"
                    ? job.source.name || "Job Source"
                    : job.source || "Job Source"}
                </div>
              </div>
            </div>
            <ul className="job-info">
              <li>
                <span className="icon-map-pin"></span>
                {formatAddress(job.addresses)}
              </li>
              <li>
                <span className="icon-calendar"></span>
                {job.posted_date
                  ? new Date(
                      job.posted_date
                    ).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="job-archive-footer">
        <div className="job-footer-left flex-col">
          <div className="tags-container flex flex-1 w-full gap-2 items-center">
            <JobTags tags={job.tags} jobId={job.id} />
          </div>
          <div className="compare-button">
            <button
              className="flex items-center gap-1 text-blue-600 font-medium cursor-pointer hover:text-white hover:bg-blue-600 bg-blue-50 transition-all duration-300 py-2 px-4 rounded-md shadow-sm border border-blue-200 transform hover:scale-105 active:scale-95"
              onClick={(e) => handleCompareClick(e, job.id)}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Compare
            </button>
          </div>
        </div>
        <div className="job-footer-right">
          <div className="price">
            <span className="icon-dolar1"></span>
            <div className="salary-display" style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              justifyContent: "flex-end"
            }}>
              <span className="salary-amount" style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "150px",
                fontWeight: "bold"
              }}>
                {formatSalaryRange(job.min_amount, job.max_amount)}
              </span>
              <span className="month" style={{
                whiteSpace: "nowrap",
                marginLeft: "2px"
              }}>/month</span>
            </div>
          </div>
          <p className="days">
            {job.deadline_date
              ? `Deadline: ${new Date(
                  job.deadline_date
                ).toLocaleDateString()}`
              : "No deadline"}
          </p>
        </div>
      </div>
      <Link
        to={`/jobs/${job.id}`}
        className="jobtex-link-item"
        aria-label={`View details of ${job.job_title}`}
      ></Link>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobCard;