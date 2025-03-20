import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

function JobTags({ tags, jobId }) {
  // State object để theo dõi tooltip cho từng tag
  const [hoveredTag, setHoveredTag] = useState(null);
  
  if (!tags || tags.length === 0) return null;
  
  // Maximum length for tag text before truncating
  const MAX_TAG_LENGTH = 20;

  // Function to truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text || "";
    return text.substring(0, maxLength) + "...";
  };

  // Function to sanitize tag text - allow alphanumeric, spaces, 
  // and common meaningful characters like hyphens and underscores
  const sanitizeTagText = (text) => {
    if (!text) return "";
    // Keep alphanumeric, spaces, hyphens, underscores, dots, and commas
    return text.replace(/[^\p{L}\p{N}\s\-_.,]/gu, "").trim();
  };

  // Function to get tag text from different possible tag formats
  const getTagText = (tag) => {
    if (!tag) return "";
    
    if (typeof tag === "object") {
      // Handle different object structures that might contain tag content
      if (tag.name) return tag.name;
      if (tag.label) return tag.label;
      if (tag.text) return tag.text;
      if (tag.value) return tag.value;
      return "";
    } 
    
    if (typeof tag === "string") {
      return tag;
    }
    
    // Convert to string if it's another type (number, etc.)
    return String(tag);
  };

  // Tooltip style as an inline style object to ensure it's not overridden
  const tooltipStyle = {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#333",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    zIndex: "9999",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    marginBottom: "4px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
  };

  return (
    <ul className="job-tag">
      <div className="flex justify-start gap-3 items-center">
        {tags.slice(0, 2).map((tag, index) => {
          // Process tag to extract and clean text
          const rawTagText = getTagText(tag);
          const sanitizedTagText = sanitizeTagText(rawTagText);
          
          // Skip empty tags
          if (!sanitizedTagText) return null;
          
          // Truncate the tag text if it's too long
          const displayText = truncateText(sanitizedTagText, MAX_TAG_LENGTH);
          const needsTooltip = sanitizedTagText.length > MAX_TAG_LENGTH;
          const tagId = `tag-${jobId}-${index}`;

          return (
            <li key={tagId}>
              <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setHoveredTag(tagId)}
                onMouseLeave={() => setHoveredTag(null)}
              >
                <Link 
                  to="#" 
                  className="tag-item"
                >
                  {displayText}
                </Link>
                
                {/* Custom tooltip with React state control */}
                {needsTooltip && hoveredTag === tagId && (
                  <div style={tooltipStyle}>
                    {sanitizedTagText}
                  </div>
                )}
              </div>
            </li>
          );
        }).filter(Boolean)}
        
        {tags.length > 2 ? (
          <li key={`more-tags-${jobId}`}>
            <div 
              className="flex justify-center items-center text-center h-6 w-6 text-sky-500 text-xs font-medium bg-white border border-sky-500 rounded-full"
              style={{ position: "relative" }}
              onMouseEnter={() => setHoveredTag(`more-${jobId}`)}
              onMouseLeave={() => setHoveredTag(null)}
            >
              +{tags.length - 2}
              
              {/* Tooltip for remaining tags count */}
              {hoveredTag === `more-${jobId}` && (
                <div style={tooltipStyle}>
                  {tags.length - 2} more tag{tags.length - 2 > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </li>
        ) : null}
      </div>
    </ul>
  );
}

JobTags.propTypes = {
  tags: PropTypes.array,
  jobId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
};

export default JobTags;