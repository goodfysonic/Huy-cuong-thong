import React, { useState, useEffect } from "react";
import { SETTING_KEYS } from "@/constants/endpoints";

function NotificationSettings({ settings, updateSetting, loading }) {
  const [formData, setFormData] = useState({
    jobOffers: settings[SETTING_KEYS.JOB_OFFERS] === 'true',
    notificationSchedule: settings[SETTING_KEYS.NOTIFICATION_SCHEDULE] || 'weekly',
    emailNotifications: settings[SETTING_KEYS.EMAIL_NOTIFICATIONS] === 'true',
    smsNotifications: settings[SETTING_KEYS.SMS_NOTIFICATIONS] === 'true'
  });
  
  const [saveStatus, setSaveStatus] = useState({
    saving: false,
    success: null,
    message: ""
  });

  // Update form data when settings are loaded
  useEffect(() => {
    if (settings) {
      setFormData({
        jobOffers: settings[SETTING_KEYS.JOB_OFFERS] === 'true',
        notificationSchedule: settings[SETTING_KEYS.NOTIFICATION_SCHEDULE] || 'weekly',
        emailNotifications: settings[SETTING_KEYS.EMAIL_NOTIFICATIONS] === 'true',
        smsNotifications: settings[SETTING_KEYS.SMS_NOTIFICATIONS] === 'true'
      });
    }
  }, [settings]);

  // Handle checkbox change
  const handleToggleChange = async (e) => {
    const { id, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [id]: checked
    }));
    
    try {
      let key;
      switch(id) {
        case 'jobOffers':
          key = SETTING_KEYS.JOB_OFFERS;
          break;
        case 'emailNotifications':
          key = SETTING_KEYS.EMAIL_NOTIFICATIONS;
          break;
        case 'smsNotifications':
          key = SETTING_KEYS.SMS_NOTIFICATIONS;
          break;
        default:
          return;
      }
      
      await updateSetting(key, checked.toString());
      
      // Show brief success message
      setSaveStatus({
        saving: false,
        success: true,
        message: "Setting updated successfully!"
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
        message: error.message || "Failed to update setting"
      });
    }
  };

  // Handle select change
  const handleSelectChange = async (e) => {
    const { value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      notificationSchedule: value
    }));
    
    try {
      await updateSetting(SETTING_KEYS.NOTIFICATION_SCHEDULE, value);
      
      setSaveStatus({
        saving: false,
        success: true,
        message: "Notification schedule updated!"
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
        message: error.message || "Failed to update notification schedule"
      });
    }
  };

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    
    setSaveStatus({
      saving: true,
      success: null,
      message: "Saving preferences..."
    });
    
    try {
      await Promise.all([
        updateSetting(SETTING_KEYS.JOB_OFFERS, formData.jobOffers.toString()),
        updateSetting(SETTING_KEYS.NOTIFICATION_SCHEDULE, formData.notificationSchedule),
        updateSetting(SETTING_KEYS.EMAIL_NOTIFICATIONS, formData.emailNotifications.toString()),
        updateSetting(SETTING_KEYS.SMS_NOTIFICATIONS, formData.smsNotifications.toString())
      ]);
      
      setSaveStatus({
        saving: false,
        success: true,
        message: "Preferences saved successfully!"
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
        message: error.message || "Failed to save preferences"
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards] animate-delay-100">
      <h2 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Notification Setting</h2>
      
      {saveStatus.message && (
        <div className={`mb-4 p-3 rounded-md ${saveStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {saveStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSavePreferences}>
        <div className="space-y-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h3 className="text-md font-medium text-gray-700">Allows receiving job offers from employers</h3>
              <p className="text-sm text-gray-500 mt-1">Receive job opportunities directly to your email</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
              <input
                type="checkbox"
                id="jobOffers"
                className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
                checked={formData.jobOffers}
                onChange={handleToggleChange}
                disabled={loading || saveStatus.saving}
              />
              <label
                htmlFor="jobOffers"
                className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
              ></label>
            </div>
          </div>

          <div className="py-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-md font-medium text-gray-700">Schedule for receiving work notifications</h3>
                <p className="text-sm text-gray-500 mt-1">Choose how often you want to receive updates</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              <select
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.notificationSchedule}
                onChange={handleSelectChange}
                disabled={loading || saveStatus.saving}
              >
                <option value="weekly">Per week</option>
                <option value="monthly">Per Month</option>
                <option value="daily">Daily</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h3 className="text-md font-medium text-gray-700">Email notifications</h3>
              <p className="text-sm text-gray-500 mt-1">Receive notifications about your account via email</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
              <input
                type="checkbox"
                id="emailNotifications"
                className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
                checked={formData.emailNotifications}
                onChange={handleToggleChange}
                disabled={loading || saveStatus.saving}
              />
              <label
                htmlFor="emailNotifications"
                className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h3 className="text-md font-medium text-gray-700">SMS notifications</h3>
              <p className="text-sm text-gray-500 mt-1">Receive important updates via text message</p>
            </div>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
              <input
                type="checkbox"
                id="smsNotifications"
                className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
                checked={formData.smsNotifications}
                onChange={handleToggleChange}
                disabled={loading || saveStatus.saving}
              />
              <label
                htmlFor="smsNotifications"
                className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
              ></label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="flex items-center justify-center bg-white !border !border-blue-600 group py-2 px-4 rounded-md transition-all duration-200 hover:!bg-blue-600 [outline:none!important]"
              disabled={loading || saveStatus.saving}
            >
              <span className="text-black group-hover:text-white transition-all duration-200 font-medium">
                {saveStatus.saving ? "Saving..." : "Save Preferences"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NotificationSettings;