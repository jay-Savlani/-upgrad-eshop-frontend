// importing useAuth to use AuthContext

import { useAuth } from "../contexts/authContext";

// importing utils api

import { utilsApi, apiConstants } from "./utils-api";


export const addAddress = (
    addressData,
    successCb,
    failureCb
) => {

    // using auth context

  

    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.POST,
        apiConstants.ADDRESS.ADD_ADDRESS,
        null,
        null,
        {...addressData , userEmail: ""},
        { ["x-auth-token"]: "" },
        successCb,
        failureCb
    )
}