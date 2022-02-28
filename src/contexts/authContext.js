// importing useState hook

import React, { useState } from "react";


// importing create and use auth context hooks

import { createContext, useContext } from "react";

// importing utility function 

import * as utils from "../utils/utils";

// importing user api

import * as userApi from "../api/user.api";

// creating auth context

const AuthContext = createContext();

export const AuthProvider = (props) => {
    // declaring constants 

    const TOKEN = "x-auth-token";
    const USER = "user";

    // setting states

    const [currentUser, setCurrentUser] = useState(null);

    // when page is reloaded it will check if current user exists or user exists in local storage and it will set isLoggedIn as true

    const [isLoggedIn, setIsLoggedIn] = useState(currentUser || utils.getLocalStorage(USER) ? true : false );

    const [loginResponse, setLoginResponse] = useState("");
    const [signUpResponse, setSignUpResponse] = useState("");
    const [token, setToken] = useState(utils.getLocalStorage(TOKEN) ? utils.getLocalStorage(TOKEN) : "");

    // should user be redirected to page (when login is successfull)

    const [shouldUserNavigate, setShouldUserNavigate] = useState(false);

    // function to find role

    function findRole() {
        if(currentUser) {
            
            return currentUser.role;
        }
        else if(utils.getLocalStorage(USER) !== "" ) {
        
            return JSON.parse(utils.getLocalStorage(USER)).role;
        }
        else {
            return "";
        }
    }

    const [role, setRole] = useState( findRole() );

    // get current logged in user details

    const getLoggedInUserDetails = () => {
        // if current is not null then return current user
        if (currentUser)
            return currentUser;
        // return JSON parse user from local storage
        else
            return JSON.parse(utils.getLocalStorage(USER));
    }


    // login method

    const login = ({ email, password }, successCallback) => {
        // making request
        userApi.login(
            email,
            password,
            // successCb
            (response, headers) => {

                if (response && headers) {
                 
                    setCurrentUser(response);
                    // store in local storage
                    utils.setLocalStorage(USER, response);
                    // setting token in local storage 
                    utils.setLocalStorage(TOKEN, headers["x-auth-token"]);
                    // setting token 
                    setToken(headers["x-auth-token"]);
                    // set login response
                    setLoginResponse(response.message);
                    // setting role 
                    setRole(response.role);
                    // setIsLoggedIn as true 
                    setIsLoggedIn(true);
                    // allow user to navigate
                    setShouldUserNavigate(true);
                    successCallback();
                }
            },
            // failire Cb
            (errorMessage) => {
                setLoginResponse(errorMessage);
            }
        )
    }


    // signup method 

    const signup = (signUpData, successCallback, failureCallback) => {
        // making request
        userApi.signup(
            signUpData,
            // successCb
            (response) => {
                if (response.user) {
                    // set signup response
                    setSignUpResponse(response.message);
                    successCallback();
                }
            },
            // failire Cb
            (errorMessage) => {
                setSignUpResponse(errorMessage);
                failureCallback();
            }
        )
    }

    // logout method 

    const logout = (successCallback) => {
        // clear local storage
        localStorage.clear();
        // set current user as null 
        setCurrentUser(null);
        // set isLoggedIn as false
        setIsLoggedIn(false);
        // set role as empty
        setRole("");
        // removing token
        setToken("");

        successCallback();
     }

    // creating authValues object which can be accessed anywhere in the application

    const authValues = {
        isLoggedIn,
        token,
        role,
        login,
        loginResponse,
        setLoginResponse,
        signup,
        signUpResponse,
        setSignUpResponse,
        logout,
        shouldUserNavigate,
        getLoggedInUserDetails
    }

    return (
        <AuthContext.Provider value={authValues}>
            {/* Rendering children */}
            {props.children}
        </AuthContext.Provider>
    )
}


// return useAuth hook to use Auth Context

export const useAuth = () => {
    return useContext(AuthContext);
}

