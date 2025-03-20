import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Eye, Trash2, Shield, Check } from 'lucide-react';

// Constants for actions
const RESUME_ACTIONS = {
  VIEW: { id: 'view', text: 'View resume', icon: Eye, color: 'bg-blue-100 text-blue-600' },
  ACTIVATE: { 
    id: 'activate', 
    getActionText: (isActive) => {
      return isActive ? 'Set as inactive' : 'Set as active';
    },
    icon: (isActive) => isActive ? Shield : Check,
    color: (isActive) => isActive ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
  },
  TOGGLE_DEFAULT: {
    id: 'toggle_default',
    getActionText: (isDefault) => {
      return isDefault ? 'Hide from search' : 'Available for searching';
    },
    icon: Eye,
    color: 'bg-blue-100 text-blue-600'
  },
  DELETE: { id: 'delete', text: 'Delete', icon: Trash2, color: 'bg-red-100 text-red-600' }
};

function ResumeDropdown({
  isOpen = false,
  direction = 'top-full right-0 mt-2',
  resumeId = null,
  resumeUrl = '',
  isActive = false,
  isDefault = false,
  onAction = () => {},
  onClose = () => {}
}) {
  const menuRef = useRef(null);

  // Calculate menu items based on resume state - using useMemo to optimize performance
  const menuItems = useMemo(() => [
    RESUME_ACTIONS.VIEW,
    RESUME_ACTIONS.ACTIVATE,
    RESUME_ACTIONS.TOGGLE_DEFAULT,
    RESUME_ACTIONS.DELETE
  ], []);

  // Handle positioning and animation of dropdown
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    
    // Use setTimeout to ensure CSS transition works properly
    const timer = setTimeout(() => {
      if (menuRef.current) {
        menuRef.current.classList.add('opacity-100', 'translate-y-0');
        menuRef.current.classList.remove('opacity-0', 'translate-y-2');
      }
    }, 10);
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Handle actions
  const handleAction = (actionId, e) => {
    if (e) e.stopPropagation();
    onAction(actionId, resumeId, resumeUrl, isDefault);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
    className={`resume-dropdown-menu absolute ${direction} w-64 bg-white shadow-lg rounded-md z-[9999] py-2 border border-gray-200 opacity-0 translate-y-2 transition-all duration-200`}
      style={{
        maxHeight: '80vh',
        overflowY: 'auto',
        transformOrigin: 'top right'
      }}
    >
      {menuItems.map((item, index) => (
        <React.Fragment key={`${item.id}-${index}`}>
          {index > 0 && index === menuItems.length - 1 && (
            <div className="my-2 border-t border-gray-100"></div>
          )}
          <button
            type="button"
            onClick={(e) => handleAction(item.id, e)}
            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center focus:outline-none [border:none!important] [outline:none!important]"
          >
            {item.id === 'activate' ? (
              // For activate action with dynamic icon and text
              <>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${item.color(isActive)}`}>
                  {React.createElement(item.icon(isActive), { size: 16 })}
                </div>
                <span className="font-medium text-gray-700">
                  {item.getActionText(isActive)}
                </span>
              </>
            ) : item.id === 'toggle_default' ? (
              // For toggle default action
              <>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${item.color}`}>
                  <item.icon size={16} />
                </div>
                <span className="font-medium text-gray-700">
                  {item.getActionText(isDefault)}
                </span>
              </>
            ) : (
              // For other actions, we use the static properties
              <>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${item.color}`}>
                  <item.icon size={16} />
                </div>
                <span className="font-medium text-gray-700">
                  {item.text}
                </span>
              </>
            )}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

// Vẫn giữ PropTypes để kiểm tra type
ResumeDropdown.propTypes = {
  isOpen: PropTypes.bool,
  direction: PropTypes.string,
  resumeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resumeUrl: PropTypes.string,
  isActive: PropTypes.bool,
  isDefault: PropTypes.bool,
  onAction: PropTypes.func,
  onClose: PropTypes.func
};

export default ResumeDropdown;