/**
 * API Configuration and Endpoints
 */

// Base Configuration
export const API_BASE_URL = 'http://localhost:8080';
export const CLIENT_BASE_URL = 'http://localhost:5173';

// Authentication Constants
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const OAUTH2_REDIRECT_URI = `${CLIENT_BASE_URL}/oauth2/redirect`;

// OAuth2 URLs
export const GOOGLE_AUTH_URL = `${API_BASE_URL}/oauth2/authorize/google?redirect_uri=${OAUTH2_REDIRECT_URI}`;

// API Endpoints
export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/api/v1/auth/token`,
    },

    OAUTH2: {
        GOOGLE: {
            REDIRECT: GOOGLE_AUTH_URL,
        },
    },
    JOBS: {
        LIST: `${API_BASE_URL}/api/v1/jobs`,
    },
    USER: {
        PROFILE: `${API_BASE_URL}/api/v1/users`,
        GET_BY_ID: (userId) => `${API_BASE_URL}/api/v1/users/${userId}`,
        SETTINGS: `${API_BASE_URL}/api/v1/users/settings`,
        RESUMES: `${API_BASE_URL}/api/v1/users/resumes`,
        AVATAR: `${API_BASE_URL}/api/v1/users/avatar`, 
    },
    PROFILE: {
        ME: `${API_BASE_URL}/api/v1/profile/me`,  
    },
    RESUMES: {
        LIST: `${API_BASE_URL}/api/v1/users/resumes`,
        UPLOAD: `${API_BASE_URL}/api/v1/users/resumes`,
        GET: (resumeId) => `${API_BASE_URL}/api/v1/resumes/${resumeId}`,
        UPDATE: (resumeId) => `${API_BASE_URL}/api/v1/resumes/${resumeId}`,
        DELETE: (resumeId) => `${API_BASE_URL}/api/v1/resumes/${resumeId}`,
    },
    SETTINGS: {
        GET_ALL: `${API_BASE_URL}/api/v1/users/settings`,
        UPDATE: `${API_BASE_URL}/api/v1/users/settings`,
        GET_BY_KEY: (key) => `${API_BASE_URL}/api/v1/users/settings/${key}`,
    },
};

// Setting Keys Constants
export const SETTING_KEYS = {
    EMAIL_NOTIFICATIONS: 'email_notifications',
    SMS_NOTIFICATIONS: 'sms_notifications',
    JOB_OFFERS: 'job_offers',
    NOTIFICATION_SCHEDULE: 'notification_schedule',
    PROFILE_VISIBILITY: 'profile_visibility',
    DATA_SHARING: 'data_sharing',
    TWO_FACTOR_AUTH: 'two_factor_auth',
    DOCUMENT_FORMAT: 'document_format',
    AUTO_SAVE: 'auto_save',
};

//Popup Filter
export const WORK_MODES = [
    { value: "ONSITE", label: "On-site" },
    { value: "REMOTE", label: "Remote" },
    { value: "HYBRID", label: "Hybrid" },
];
  
export const EMPLOYMENT_TYPES = [
    { value: "FULL_TIME", label: "Full Time" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "CONTRACT", label: "Contract" },
    { value: "FREELANCE", label: "Freelance" },
    { value: "INTERNSHIP", label: "Internship" },
];
  
export const SOURCES = [
    { value: "VIETNAMWORKS", label: "VietnamWorks" },
    { value: "LINKEDIN", label: "LinkedIn" },
    { value: "JOBSGO", label: "JobsGO" },
];
  
export const SALARY_RANGES = [
    { value: "0-2000", label: "$0 - $2000", negotiated: false, min: 0, max: 2000 },
    { value: "2000-5000", label: "$2000 - $5000", negotiated: false, min: 2000, max: 5000 },
    { value: "5000-10000", label: "$5000 - $10000", negotiated: false, min: 5000, max: 10000 },
    { value: "10000-15000", label: "$10000 - $15000", negotiated: false, min: 10000, max: 15000 },
    { value: "15000-20000", label: "$15000 - $20000", negotiated: false, min: 15000, max: 20000 },
    { value: "20000+", label: "Above $20000", negotiated: false, min: 20000, max: 100000 },
    { value: "negotiable", label: "Negotiable", negotiated: true, min: 0, max: 0 },
];
  
export const POSTED_PERIODS = [
    { value: "1", label: "Last 1 days" },
    { value: "3", label: "Last 3 days" },
    { value: "7", label: "Last 7 days" },
    { value: "14", label: "Last 14 days" },
    { value: "30", label: "Last 30 days" },
];
  
export const DEFAULT_FORM_STATE = {
    query: "",
    location: "",
    work_mode: "",
    min_salary: 0,
    max_salary: 0,
    negotiated: true,
    salary_range: "negotiable",
    radius: 10,
    sort_by: "posted_date",
    direction: "DESC",
    limit: 30,
    offset: 0,
    source: "",
    employment_type: "",
    posted_period: "3",
    jobs: [],
    loading: false
};