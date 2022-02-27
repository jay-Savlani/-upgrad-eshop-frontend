import axios from "../axios.config";

/**
 * Function to build string from path parameters
 * @param {Array} pathParameters - array consisting of ordered path parameters
 * @returns {String} substring of URL formed from path parameters
 */



const buildUrlWithPathParameters = (pathParameters) => {
    if (pathParameters && pathParameters.length !== 0) {
        let pathParametersString = "";
        for (let i = 0; i < pathParameters.length; i++) {
            pathParametersString += `/${pathParameters[i]}`
        }
        return pathParameters;
    }
    else return "";
}

/**
 * 
 * @param {Object} queryData - key value pairs of url queries
 * @returns {String} - string containing key value pairs of query Data
 */

const buildUrlwithQueries = (queryData) => {
    // if queryData is null then entry empty string
    if (!queryData) {
        return "";
    }

    let queryString = "";

    for (const key in queryData) {
        // once query string has been added with data, keep on adding &
        if (queryString) {
            queryString += "&";
        }
        queryString += key + "=" + queryData[key];
    }

    // add question mark at the front of the entire query string

    queryString = "?" + queryString;

    return queryString;

}

/**
 * 
 * @param {String} method - http request method 
 * @param {String} url - request url
 * @param {Array} paramsArray - array of url params
 * @param {Object} queryDataObj - key value pair of url queries
 * @param {Object} body - request body
 * @param {Object} headersObj - key value pair of headers
 * @param {Function} successCb - success callback function
 * @param {Function} failureCb - failure callback function
 */


export const sendAxiosRequest = async (
    method,
    url,
    paramsArray,
    queryDataObj,
    body,
    headersObj,
    successCb,
    failureCb
) => {
    // build url with data provided
    url = url + buildUrlWithPathParameters(paramsArray) + buildUrlwithQueries(queryDataObj);
    // console.log("url in send axios request: ", url);
    // send axios request

    try {
        const response = await axios({
            method: method,
            url: url,
            data: body,
            headers: headersObj
        });

        // checking if response is 200
        if (response && response.status === 200) {
            // if successCb exists then call it with passing response data
            if (successCb)
                successCb(response.data, response.headers);
        }
    }
    catch (error) {
        // if there is error call failureCb with error message
        // console.log("entered catch block");
        console.log("error in catch block", error);
        if (error) {
            if (failureCb)
                failureCb(JSON.parse(error.request.responseText).message);
        }
    }
}