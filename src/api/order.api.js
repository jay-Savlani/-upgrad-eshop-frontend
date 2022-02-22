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

    const { token, getLoggedInUserDetails } = useAuth();

    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.POST,
        apiConstants.ORDER.ADD_ORDER,
        null,
        null,
        {...orderData , userId: getLoggedInUserDetails().user_id},
        { ["x-auth-token"]: token },
        successCb,
        failureCb
    )
}