// importing essentials from react-router-dom

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importing components 

import { Navbar, Login, SignUp, Products } from "../components";

// importing ProtectedRoute

import { ProtectedRoute, routeConstants } from ".";

// importing AuthProvider

import { AuthProvider } from "../contexts/authContext";

export default function RouteController() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path={routeConstants.ROOT}
                        element={<ProtectedRoute>
                            <Products />
                        </ProtectedRoute>}
                    />
                   <Route exact path={routeConstants.PRODUCTS}
                        element={<ProtectedRoute>
                            <Products />
                        </ProtectedRoute>}
                    />
                    <Route exact path={routeConstants.SIGNIN} element={<Login />} />
                    <Route exact path={routeConstants.SIGNUP} element={<SignUp />} />
                    <Route exact path={routeConstants.PRODUCTS} element={<Products />} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}