// importing utility api 

import { utilsApi } from "./utils-api";

// import api constants 

import { apiConstants } from "./utils-api";


// login method 

export const login = (email, password, successCb, failureCb) => {
    // make axios request 
    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.POST,
        apiConstants.USER.LOGIN,
        null,
        null,
        {
            email: email,
            password: password
        },
        null,
        successCb,
        failureCb

    )
}

// signup method

export const signup = (signUpData, successCb, failureCb) => {
    // make axios request
    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.POST,
        apiConstants.USER.SIGNUP,
        null,
        null,
        signUpData,
        null,
        successCb,
        failureCb
    )
}


// get saved addresses for an user

export const getAddresses = (email,successCb, failureCb) => {
    // make axios request
    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.POST,
        apiConstants.USER.GET_ADDRESS,
        null,
        null,
        {email: email},
        null,
        successCb,
        failureCb
    )
}