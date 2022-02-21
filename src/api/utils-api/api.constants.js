export const BASE_URL = "http://localhost:8000"


export const HTTP_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export const REQUEST_HEADER_KEY = {
    CONTENT_TYPE: "Content-Type",
    CACHE_CONTROL: "cache-control",
};

export const REQUEST_HEADER_VALUE = {
    APPLICATION_JSON: "application/json",
    CHARSET_UTF8: "charset=UTF-8",
    NO_CACHE: "no-cache",
};

export const USER = {
    LOGIN: "/auth",
    SIGNUP: "/users",
    GET_ADDRESS: "/user/addresses"
}

export const PRODUCT = {
    GET_PRODUCTS: "/products",
    GET_CATEGORIES: "/products/categories",
    ADD_PRODCUT: "/products",
    MODIFY_PRODUCT: "/products",
    DELETE_PRODUCT: "/products"
}

export const ADDRESS = {
    ADD_ADDRESS: "/addresses"
}

export const ORDER = {
    ADD_ORDER: "/orders"
}