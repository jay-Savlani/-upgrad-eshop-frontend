// importing utility api 

import { utilsApi } from "./utils-api";

// import api constants 

import { apiConstants } from "./utils-api";

// importing utility functions

import * as utils from "../utils/utils";

// importin useAuthContext


// token is used in many places hence keeping it global



/**
 * Function to get products based on product id as url param or on query data as url query
 * @param {Object} queryData - { category, direction, name, sortBy } 
 * @param {Array} paramsArray - {id} - product id
 * @param {Function} successCb - Function to be executed if request succeeds
 * @param {Function} failureCb - Function to be executed if request fails
 */

export const getProducts = (queryData, paramsArray, successCb, failureCb) => {
    // make axios request
    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.GET,
        apiConstants.PRODUCT.GET_PRODUCTS,
        paramsArray,
        queryData,
        null,
        null,
        successCb,
        failureCb
    )
}

/**
 * Function to get all product categories
 * @param {Function} successCb - Function to be executed if request succeeds
 * @param {Function} failureCb - Function to be executed if request fails
 */

export const getProductCategories = (successCb,failureCb) => {
    // make axios request
    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.GET,
        apiConstants.PRODUCT.GET_CATEGORIES,
        null,
        null,
        null,
        null,
        successCb,
        failureCb
    )
}

/**
 * Function to add a product
 * @param {Object} productData - { name, category, price, description, manufacturer, availableItems, imageUrl }
 * @param {String} token - access token for authentication and authorization
 * @param {Function} successCb - Function to be executed if request succeeds
 * @param {Function} failureCb - Function to be executed if request fails
 */

export const addProduct = (productData, token ,successCb, failureCb) => {
    // make axios request
    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.POST,
        apiConstants.PRODUCT.ADD_PRODCUT,
        null,
        null,
        productData,
        {["x-auth-token"] : token},
        successCb,
        failureCb
    )
}

/**
 * Function to modify a product
 * @param {Object} productData - { name, category, price, description, manufacturer, availableItems, imageUrl }
 * @param {String} token - access token for authentication and authorization
 * @param {Function} successCb - Function to be executed if request succeeds
 * @param {Function} failureCb - Function to be executed if request fails
 */

 export const modifyProduct = (product_id ,productData, token ,successCb, failureCb) => {
    // make axios request
    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.PUT,
        apiConstants.PRODUCT.ADD_PRODCUT,
        [product_id],
        null,
        productData,
        {["x-auth-token"] : token},
        successCb,
        failureCb
    )
}


/**
 * 
 * @param {Array} paramsArray - prodcut id 
 * @param {String} token - access token for authentication and authorization
 * @param {Function} successCb - Function to be executed if request succeeds
 * @param {Function} failureCb - Function to be executed if request fails
 */

 export const deleteProduct = (product_id, token ,successCb, failureCb) => {
    // make axios request
    utilsApi.sendAxiosRequest(
        apiConstants.HTTP_METHOD.DELETE,
        apiConstants.PRODUCT.ADD_PRODCUT,
        [product_id],
        null,
        null,
        {["x-auth-token"] : token},
        successCb,
        failureCb
    )
}
