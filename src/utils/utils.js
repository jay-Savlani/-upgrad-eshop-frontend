
import {routeConstants} from "../routes";



/**
 * Function to set item in local storage
 * @param {String} key - key to be used to store value in local storage 
 * @param {Any} value - can by object, String or other
 */

export const setLocalStorage = (key, value) => {
    const keyEncoded = window.btoa(key);
    if (typeof (value) === "object") {
        const encodedString = window.btoa(JSON.stringify(value));
        localStorage.setItem(keyEncoded, encodedString);
    }
    else {
        const encodedStr = window.btoa(value);
        localStorage.setItem(keyEncoded, encodedStr);
    }
    // returns void
}

/**
 * 
 * @param {String} key - String key used to fetch item from local storage
 * @returns - value of item for corresponding key
 */

export const getLocalStorage = (key) => {
    // encoding key to match key in local storage
    const keyEncoded = window.btoa(key);
    if (localStorage.getItem(keyEncoded)) {
        const valueEncoded = localStorage.getItem(keyEncoded);
        // decoding value
        const valueDecoded = window.atob(valueEncoded);
        // return the JSON string

        return valueDecoded;
    }
    else
        return "";
}



export const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    })
}

export const checkValidEmail = (email) => {
    if (email) {
        // Credits - https://stackoverflow.com/a/46181/7452548
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regex.test(email.toString().toLowerCase());
    }
    return false;
};




export const getProductDetailsUrl = (product_id) => {
    const regex = /:id/i;
    return routeConstants.PRODUCT_DETAIL.replace(regex, product_id);

}