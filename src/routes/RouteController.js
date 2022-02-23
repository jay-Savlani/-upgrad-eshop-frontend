// importing essentials from react-router-dom

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importing components 

import { Navbar, Login, Layout } from "../components";

// importing ProtectedRoute

import { ProtectedRoute, routeConstants } from ".";

// importing AuthProvider

import { AuthProvider } from "../contexts/authContext";

export default function RouteController() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />} >
                        <Route exact path="signin" element={<Login />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    )
}