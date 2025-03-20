import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JobRequirementModal.scss';

const JobRequirementModal = ({ isOpen, onClose, onSave }) => {
  const [salary, setSalary] = useState({ min: '', max: '' });
  const [currency, setCurrency] = useState('VND');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [workTime, setWorkTime] = useState({
    partTime: false,
    fullTime: false,
    remote: false,
  });
  const [otherRequirements, setOtherRequirements] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Chuẩn bị dữ liệu để gửi đến API
      const requirementsData = {
        salary: {
          min: parseInt(salary.min) || 0,
          max: parseInt(salary.max) || 0,
          currency: currency
        },
        location: location,
        industry: industry,
        workTime: {
          partTime: workTime.partTime,
          fullTime: workTime.fullTime,
          remote: workTime.remote
        },
        otherRequirements: otherRequirements
      };
      
      // Gọi callback để xử lý việc lưu
      if (onSave) {
        await onSave(requirementsData);
      }
      
      // Đóng modal
      onClose();
    } catch (error) {
      console.error('Error saving requirements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="job-requirement-modal">
      <div className="modal-overlay"></div>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Set up job requirements</h2>
        </div>

        <div className="modal-body">
          {/* Desired salary */}
          <div className="form-group">
            <label>Desired salary</label>
            <div className="salary-inputs">
              <input
                type="text"
                placeholder="Min"
                value={salary.min}
                onChange={(e) => setSalary({ ...salary, min: e.target.value })}
              />
              <input
                type="text"
                placeholder="Max"
                value={salary.max}
                onChange={(e) => setSalary({ ...salary, max: e.target.value })}
              />
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="VND">VND</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          {/* Location and Industry */}
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Choose City</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">Hồ Chí Minh</option>
                <option value="danang">Đà Nẵng</option>
              </select>
            </div>
            <div className="form-group">
              <label>Industry, field</label>
              <select 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Choose field</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="accounting">Accounting</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>

          {/* Work time */}
          <div className="form-group">
            <label>Work time</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={workTime.partTime}
                  onChange={() => setWorkTime({ ...workTime, partTime: !workTime.partTime })}
                />
                <span>Part-time</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={workTime.fullTime}
                  onChange={() => setWorkTime({ ...workTime, fullTime: !workTime.fullTime })}
                />
                <span>Full-time</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={workTime.remote}
                  onChange={() => setWorkTime({ ...workTime, remote: !workTime.remote })}
                />
                <span>Remote</span>
              </label>
            </div>
          </div>

          {/* Other requirements */}
          <div className="form-group">
            <label>Other demands</label>
            <textarea
              placeholder="Enter your other requirements"
              value={otherRequirements}
              onChange={(e) => setOtherRequirements(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-save"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

JobRequirementModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func
};

export default JobRequirementModal;