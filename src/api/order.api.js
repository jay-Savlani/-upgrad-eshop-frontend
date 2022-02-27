// importing useAuth to use AuthContext

import { useAuth } from "../contexts/authContext";

// importing utils api

import { utilsApi, apiConstants } from "./utils-api";


/**
 * 
 * @param {Object} orderData - { userId, productId, addressId, quantity }
 * @param {Function} successCb - Function to be called if request is successfull
 * @param {Function} failureCb - Function to be called if request fails
 */

export const addAddress = (
    orderData,
    successCb,
    failureCb
) => {

    // using auth context



    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.POST,
        apiConstants.ORDER.ADD_ORDER,
        null,
        null,
        {...orderData , userId: ""},
        { ["x-auth-token"]: "" },
        successCb,
        failureCb
    )
}