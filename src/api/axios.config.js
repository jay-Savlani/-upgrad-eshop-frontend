// creating axios instance and configuring default 

// import apiConstants from utils-api

import { apiConstants } from "./utils-api";

import axios from "axios";


const axiosInstance = axios.create({
    baseURL: apiConstants.BASE_URL
});


// default headers for all axios requests

axiosInstance.defaults.headers.common[apiConstants.REQUEST_HEADER_KEY.CONTENT_TYPE]
= `${apiConstants.REQUEST_HEADER_VALUE.APPLICATION_JSON};${apiConstants.REQUEST_HEADER_VALUE.CHARSET_UTF8}`;

axiosInstance.defaults.headers.common[apiConstants.REQUEST_HEADER_KEY.CACHE_CONTROL] 
= apiConstants.REQUEST_HEADER_VALUE.NO_CACHE;

export default axiosInstance;