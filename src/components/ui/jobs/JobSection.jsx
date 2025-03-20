import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { request } from "@/pages/utils/APIUtils";
import JobFilters from "./JobFilters";
import JobGroup from "./JobGroup";
import JobRequirementModal from "../modals/JobRequirementModal";
import CustomPagination from "@/components/common/pagination/CustomPagination";
import NoJobsFound from "./NoJobsFound";

function JobSection(props) {
  const { className = "", handlePopup, apiUrl } = props;
  const location = useLocation();

  // State for data and pagination
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [totalJobs, setTotalJobs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch jobs data
  const fetchJobs = useCallback(
    async (page = 1, pageSize = 10) => {
      setLoading(true);
      try {
        const offset = page - 1;
        const currentParams = new URLSearchParams(location.search);
        currentParams.set("offset", offset.toString());
        currentParams.set("limit", pageSize.toString());

        const response = await request({
          url: `${apiUrl}?${currentParams.toString()}`,
          method: "GET",
        });

        const jobData = response.items || response || [];
        const total = response.total_count || jobData.length || 0;

        console.log("Job data fetched:", jobData);

        setJobs(jobData);
        setTotalJobs(total);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobs([]);
        setTotalJobs(0);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, location.search]
  );

  // Handle pagination changes
  const handleTableChange = useCallback(
    (newPagination) => {
      const newPage = newPagination.current || 1;
      const newPageSize = newPagination.pageSize || pagination.pageSize;

      setPagination({
        current: newPage,
        pageSize: newPageSize,
      });

      fetchJobs(newPage, newPageSize);
    },
    [fetchJobs, pagination.pageSize]
  );

  // Initial fetch and when URL changes
  useEffect(() => {
    fetchJobs(pagination.current, pagination.pageSize);
  }, [location.search, fetchJobs]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveRequirements = async (requirementsData) => {
    try {
      console.log("Saving requirements:", requirementsData);
      // API call to save job requirements would go here
      return true;
    } catch (error) {
      console.error("Error saving job requirements:", error);
      throw error;
    }
  };

  return (
    <section className={`inner-jobs-section ${className}`}>
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12 tf-tab">
            <JobFilters 
              totalJobs={totalJobs} 
              handlePopup={handlePopup} 
              openModal={openModal} 
            />
            <div className="content-tab">
              <div className="inner">
                {loading ? (
                  <div className="loading-indicator">Loading...</div>
                ) : jobs.length === 0 ? (
                  <NoJobsFound />
                ) : (
                  <>
                    <JobGroup jobs={jobs} />
                    {/* Pagination */}
                    <div className="pagination-container">
                      <CustomPagination
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={totalJobs}
                        onChange={handleTableChange}
                        showTotal={(total, range) =>
                          `${range[0]}-${range[1]} of ${total}`
                        }
                        className="pagination-job"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <JobRequirementModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveRequirements}
      />
    </section>
  );
}

JobSection.propTypes = {
  className: PropTypes.string,
  handlePopup: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired,
};

export default JobSection;