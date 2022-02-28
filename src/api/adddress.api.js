// importing useAuth to use AuthContext

import { useAuth } from "../contexts/authContext";

// importing utils api

import { utilsApi, apiConstants } from "./utils-api";


export const addAddress = (
    addressData,
    token,
    successCb,
    failureCb
) => {

    // using auth context

  

    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.POST,
        apiConstants.ADDRESS.ADD_ADDRESS,
        null,
        null,
        addressData,
        { ["x-auth-token"]: token },
        successCb,
        failureCb
    )
}