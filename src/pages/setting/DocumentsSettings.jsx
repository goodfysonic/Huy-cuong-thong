import React, { useState, useEffect } from "react";
import { SETTING_KEYS } from "@/constants/endpoints";

function DocumentsSettings({ settings, updateSetting, loading }) {
  const [formData, setFormData] = useState({
    documentFormat: settings[SETTING_KEYS.DOCUMENT_FORMAT] || 'pdf',
    autoSave: settings[SETTING_KEYS.AUTO_SAVE] === 'true'
  });
  
  const [saveStatus, setSaveStatus] = useState({
    saving: false,
    success: null,
    message: ""
  });
  
  const [storageInfo, setStorageInfo] = useState({
    used: 45, // Example value in percentage
    total: 1, // Example value in GB
    loading: false
  });

  // Update form data when settings are loaded
  useEffect(() => {
    if (settings) {
      setFormData({
        documentFormat: settings[SETTING_KEYS.DOCUMENT_FORMAT] || 'pdf',
        autoSave: settings[SETTING_KEYS.AUTO_SAVE] === 'true'
      });
      
      // In a real app, you might fetch storage info here
      fetchStorageInfo();
    }
  }, [settings]);

  // Function to fetch storage usage (simulated)
  const fetchStorageInfo = async () => {
    setStorageInfo(prev => ({ ...prev, loading: true }));
    
    try {
      // This would be a real API call in production
      // const response = await api.getStorageInfo();
      // setStorageInfo({
      //   used: response.usedPercentage,
      //   total: response.totalGB,
      //   loading: false
      // });
      
      // Simulated delay and data
      setTimeout(() => {
        setStorageInfo({
          used: 45,
          total: 1,
          loading: false
        });
      }, 500);
    } catch (error) {
      console.error('Failed to fetch storage info:', error);
      setStorageInfo(prev => ({ ...prev, loading: false }));
    }
  };

  // Handle format change
  const handleFormatChange = async (e) => {
    const { value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      documentFormat: value
    }));
    
    try {
      await updateSetting(SETTING_KEYS.DOCUMENT_FORMAT, value);
      
      setSaveStatus({
        saving: false,
        success: true,
        message: "Document format updated!"
      });
      
      setTimeout(() => {
        setSaveStatus({
          saving: false,
          success: null,
          message: ""
        });
      }, 3000);
      
    } catch (error) {
      setSaveStatus({
        saving: false,
        success: false,
        message: error.message || "Failed to update document format"
      });
      
      // Revert the form data on error
      setFormData(prev => ({
        ...prev,
        documentFormat: settings[SETTING_KEYS.DOCUMENT_FORMAT] || 'pdf'
      }));
    }
  };

  // Handle auto-save toggle
  const handleAutoSaveToggle = async (e) => {
    const { checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      autoSave: checked
    }));
    
    try {
      await updateSetting(SETTING_KEYS.AUTO_SAVE, checked.toString());
      
      setSaveStatus({
        saving: false,
        success: true,
        message: `Auto-save ${checked ? 'enabled' : 'disabled'}!`
      });
      
      setTimeout(() => {
        setSaveStatus({
          saving: false,
          success: null,
          message: ""
        });
      }, 3000);
      
    } catch (error) {
      setSaveStatus({
        saving: false,
        success: false,
        message: error.message || "Failed to update auto-save setting"
      });
      
      // Revert the form data on error
      setFormData(prev => ({
        ...prev,
        autoSave: !checked
      }));
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    
    setSaveStatus({
      saving: true,
      success: null,
      message: "Saving settings..."
    });
    
    try {
      await Promise.all([
        updateSetting(SETTING_KEYS.DOCUMENT_FORMAT, formData.documentFormat),
        updateSetting(SETTING_KEYS.AUTO_SAVE, formData.autoSave.toString())
      ]);
      
      setSaveStatus({
        saving: false,
        success: true,
        message: "Document settings saved successfully!"
      });
      
      setTimeout(() => {
        setSaveStatus({
          saving: false,
          success: null,
          message: ""
        });
      }, 3000);
      
    } catch (error) {
      setSaveStatus({
        saving: false,
        success: false,
        message: error.message || "Failed to save document settings"
      });
    }
  };
  
  const handleUpgradeStorage = () => {
    // This would typically redirect to a payment or plan upgrade page
    window.location.href = '/plans';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards] animate-delay-100">
      <h2 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Documents</h2>
      
      {saveStatus.message && (
        <div className={`mb-4 p-3 rounded-md ${saveStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {saveStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSaveSettings}>
        <div className="space-y-6">
          <div className="py-3 border-b border-gray-100">
            <h3 className="text-md font-medium text-gray-700 mb-3">Document Preferences</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-700">Default resume format</p>
                <p className="text-xs text-gray-500 mt-1">Choose your preferred format for downloading resumes</p>
              </div>
              <select 
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.documentFormat}
                onChange={handleFormatChange}
                disabled={loading || saveStatus.saving}
              >
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="txt">TXT</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">Auto-save documents</p>
                <p className="text-xs text-gray-500 mt-1">Automatically save your documents while editing</p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="autoSave"
                  className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
                  checked={formData.autoSave}
                  onChange={handleAutoSaveToggle}
                  disabled={loading || saveStatus.saving}
                />
                <label
                  htmlFor="autoSave"
                  className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
                ></label>
              </div>
            </div>
          </div>

          <div className="py-3 border-b border-gray-100">
            <h3 className="text-md font-medium text-gray-700 mb-3">Storage Management</h3>
            <div className="mb-2">
              <p className="text-sm text-gray-700">Storage used</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${storageInfo.used}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {storageInfo.loading 
                  ? "Loading storage information..." 
                  : `${storageInfo.used}% of ${storageInfo.total}GB used`}
              </p>
            </div>
            <button 
              type="button"
              className="flex items-center justify-center bg-white !border !border-blue-600 group py-2 px-4 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important] mt-2"
              onClick={handleUpgradeStorage}
              disabled={loading || saveStatus.saving}
            >
              <span className="text-black group-hover:text-white transition-all duration-200 font-medium">
                Upgrade Storage
              </span>
            </button>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="flex items-center justify-center bg-white !border !border-blue-600 group py-2 px-4 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important]"
              disabled={loading || saveStatus.saving}
            >
              <span className="text-black group-hover:text-white transition-all duration-200 font-medium">
                {saveStatus.saving ? "Saving..." : "Save Settings"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DocumentsSettings;