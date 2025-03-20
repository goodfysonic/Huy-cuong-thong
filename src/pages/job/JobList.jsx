import { useState } from "react";
import Breadcrumb from "@/components/ui/breadcrumb";
import JobSection from "@/components/ui/jobs/JobSection";
import FormSearch from "@/components/ui/formsearch";
import Gotop from "@/components/ui/gotop";
import PopupJob from "@/components/ui/popup/PopupJob";
import { useModal } from '@/hooks/useModal';
import { ENDPOINTS } from "@/constants/endpoints";
import { useLocation } from 'react-router-dom';

function Joblist() {
  const location = useLocation();
  const [isShowPopup, togglePopup] = useModal('.sidebar-popup');

  return (
    <>
      <PopupJob 
        isShow={isShowPopup} 
        handlePopup={togglePopup}
        currentParams={location.search}
      />
      <Breadcrumb 
        title="Find Jobs" 
        className="breadcrumb-section" 
      />
      <FormSearch />
      <JobSection
        apiUrl={ENDPOINTS.JOBS.LIST}
        handlePopup={togglePopup}
        className="mt-50 pb-100"
      />
      <Gotop />
    </>
  );
}

export default Joblist;