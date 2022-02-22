// importing useLocation and Navigate from react-router-dom

import {useLocation, Navigate} from "react-router-dom";

// importing useAuth Context 

import { useAuth } from "../contexts/authContext";

export default function ProtectedRoute({children}){
    
    // using location 

    const location = useLocation();
    
    
    // using use Auth
    // destructuring auth values
    const {isLoggedIn} = useAuth();

    if(!isLoggedIn) {
        return (<Navigate to="/login" state={{from: location}} />)
    }

    return (children);

}