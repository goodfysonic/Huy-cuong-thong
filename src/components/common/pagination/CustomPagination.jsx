import React from 'react';
import PropTypes from 'prop-types';

const CustomPagination = ({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = false,
  pageSizeOptions = ['10', '20', '50', '100'],
  showTotal,
  className = ''
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(total / pageSize);
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const visiblePages = 5; // Number of visible page numbers
    
    // Always include first page
    pages.push(1);
    
    // Calculate range of pages to show
    let startPage = Math.max(2, current - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(2, endPage - visiblePages + 1);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('ellipsis1');
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('ellipsis2');
    }
    
    // Always include last page if it's not the first page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  // Handle page change
  const handlePageClick = (page) => {
    if (page !== current && page >= 1 && page <= totalPages) {
      onChange({ current: page, pageSize });
    }
  };
  
  // Handle page size change
  const handlePageSizeChange = (e) => {
    const newPageSize = Number(e.target.value);
    const newCurrent = Math.min(current, Math.ceil(total / newPageSize));
    onChange({ current: newCurrent, pageSize: newPageSize });
  };
  
  // Get page range for total info
  const getRange = () => {
    const from = (current - 1) * pageSize + 1;
    const to = Math.min(current * pageSize, total);
    return [from, to];
  };
  
  const pageNumbers = getPageNumbers();
  const range = getRange();
  
  return (
    <div className={`pagination-container ${className}`}>
      {showTotal && (
        <div className="pagination-total">
          {showTotal(total, range)}
        </div>
      )}
      
      <ul className="pagination-job">
        {/* Previous button */}
        <li className={current === 1 ? 'disabled' : ''}>
          <button 
            className="pagination-nav-button" 
            onClick={() => handlePageClick(current - 1)}
            disabled={current === 1}
            aria-label="Previous page"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </li>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <li
            key={`page-${page}-${index}`}
            className={`${page === current ? 'current' : ''} ${page.toString().includes('ellipsis') ? 'ellipsis' : ''}`}
          >
            {page.toString().includes('ellipsis') ? (
              <span className="pagination-ellipsis">•••</span>
            ) : (
              <button
                className={`pagination-page-button ${page === current ? 'active' : ''}`}
                onClick={() => handlePageClick(page)}
                aria-label={`Page ${page}`}
                aria-current={page === current ? 'page' : undefined}
                type="button"
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        {/* Next button */}
        <li className={current === totalPages ? 'disabled' : ''}>
          <button 
            className="pagination-nav-button" 
            onClick={() => handlePageClick(current + 1)}
            disabled={current === totalPages}
            aria-label="Next page"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </li>
      </ul>
      
      {/* Page size changer */}
      {showSizeChanger && (
        <div className="pagination-size-changer">
          <select
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            className="pagination-select"
            aria-label="Items per page"
          >
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

CustomPagination.propTypes = {
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  showSizeChanger: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
  showTotal: PropTypes.func,
  className: PropTypes.string
};

export default CustomPagination;