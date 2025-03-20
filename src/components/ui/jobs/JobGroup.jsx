import PropTypes from "prop-types";
import JobCard from "./JobCard";

function JobGroup({ jobs }) {
  return (
    <div className="group-col-2">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

JobGroup.propTypes = {
  jobs: PropTypes.array.isRequired,
};

export default JobGroup