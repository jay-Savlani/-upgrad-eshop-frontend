// importing essentials from react-router-dom

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// importing components 

import { Navbar } from "../components";

// importing ProtectedRoute

import { ProtectedRoute } from ".";


export default function RouteController(){
    return (
        <Router>
            <Routes>
                <Route exact path="/signin" element={<Navbar />} />               
            </Routes>
        </Router>
    )
}