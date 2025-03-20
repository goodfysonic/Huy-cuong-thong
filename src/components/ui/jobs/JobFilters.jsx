import PropTypes from "prop-types";
import SortBuy from "../dropdown/SortBuy";

function JobFilters({ totalJobs, handlePopup, openModal }) {
  return (
    <div className="wd-meta-select-job">
      <div className="wd-findjob-filer">
        <div className="group-select-display">
          <button
            className="button-filter st2"
            onClick={handlePopup}
            type="button"
          >
            <i className="icon-filter"></i> Filters
          </button>
          <div className="inner menu-tab">
            <div className="btn-display">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M4.5 0H0.500478C0.5 0.380952 0.5 0.596931 0.5 1.33333V14.6667C0.5 15.4031 0.500478 16 0.500478 16H4.5C4.5 16 4.5 15.4031 4.5 14.6667V1.33333C4.5 0.596931 4.5 0.380952 4.5 0Z"
                  fill="white"
                />
                <path
                  d="M10.5 0H6.50048C6.5 0.380952 6.5 0.596931 6.5 1.33333V14.6667C6.5 15.4031 6.50048 16 6.50048 16H10.5C10.5 16 10.5 15.4031 10.5 14.6667V1.33333C10.5 0.596931 10.5 0.380952 10.5 0Z"
                  fill="white"
                />
                <path
                  d="M16.5 0H12.5005C12.5 0.380952 12.5 0.596931 12.5 1.33333V14.6667C12.5 15.4031 12.5005 16 12.5005 16H16.5C16.5 16 16.5 15.4031 16.5 14.6667V1.33333C16.5 0.596931 16.5 0.380952 16.5 0Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <p className="nofi-job">
            <span>{totalJobs}</span> jobs recommended for you
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Avatar button to open requirement modal */}
          <button
            onClick={openModal}
            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors"
            title="Set Job Requirements"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>

          <SortBuy />
        </div>
      </div>
    </div>
  );
}

JobFilters.propTypes = {
  totalJobs: PropTypes.number.isRequired,
  handlePopup: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default JobFilters;