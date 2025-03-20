import React from "react";

function PrivacySettings() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 opacity-0 transform translate-y-3 animate-[fadeIn_0.4s_ease-out_forwards] animate-delay-100">
      <h2 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Privacy</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <h3 className="text-md font-medium text-gray-700">Profile visibility</h3>
            <p className="text-sm text-gray-500 mt-1">Control who can see your profile information</p>
          </div>
          <select className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="public">Public</option>
            <option value="connections">Connections only</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <h3 className="text-md font-medium text-gray-700">Data sharing with third parties</h3>
            <p className="text-sm text-gray-500 mt-1">Allow us to share your information with trusted partners</p>
          </div>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
            <input
              type="checkbox"
              id="dataSharing"
              className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
            />
            <label
              htmlFor="dataSharing"
              className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
            ></label>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <h3 className="text-md font-medium text-gray-700">Two-factor authentication</h3>
            <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
          </div>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
            <input
              type="checkbox"
              id="twoFactor"
              className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-4 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-blue-600 checked:translate-x-6"
            />
            <label
              htmlFor="twoFactor"
              className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 peer-checked:bg-blue-600"
            ></label>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-md font-medium text-red-600 mb-2">Danger Zone</h3>
          <p className="text-sm text-gray-500 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="flex items-center justify-center bg-white !border !border-red-600 group py-2 px-4 rounded-md transition-all duration-200 hover:!bg-red-600 [outline:none!important]">
            <span className="text-red-600 group-hover:text-white transition-all duration-200 font-medium">Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrivacySettings;