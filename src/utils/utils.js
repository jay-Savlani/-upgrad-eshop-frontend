/**
 * Function to set item in local storage
 * @param {String} key - key to be used to store value in local storage 
 * @param {Any} value - can by object, String or other
 */

export const setLocalStorage = (key, value) => {
    const keyEncoded = window.btoa(key);
    if(typeof(value) === "object") {
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
    const valueEncoded = localStorage.getItem(keyEncoded);
    // decoding value
    const valueDecoded = window.atob(valueEncoded);
    // return the JSON string
    return valueDecoded;
}