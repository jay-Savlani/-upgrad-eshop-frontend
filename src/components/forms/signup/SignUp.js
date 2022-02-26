import React, { useEffect } from "react";

// importing Styles

import useStyles from "../formStyles";

// importing hooks

import { useLoader, useForms } from "../../../hooks";

// importing contexts

import { useAuth } from "../../../contexts/authContext";

// router imports

import { useNavigate } from "react-router-dom";

import { routeConstants } from "../../../routes";

// import form validations

import { signupValidation } from "../formValidations";

// material ui imports

import { Typography, Button, TextField, FormControl } from "@material-ui/core";

import { Navbar, SignInImage } from "../..";

// importing utility functions

import * as utils from "../../../utils/utils";

const SignUp = () => {

    // using Styles

    const classes = useStyles();

    const [isLoading, showLoader, hideLoader, Loader] = useLoader();

    const { signup, signUpResponse, setSignUpResponse } = useAuth();

    const navigate=useNavigate();

    const redirectToLogin =  () => {
    
            navigate(routeConstants.SIGNIN);
        
    }

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber: ""
    }

    const [values, errors, handleInputChange, handleSubmit] = useForms(initialValues, signupValidation, signup);

    const navigateToLogin = () => {
        navigate(routeConstants.SIGNIN);
    }


    useEffect(async () => {
        showLoader();
        await utils.delay(1000);
        hideLoader();
        setSignUpResponse("");
    }, [])

    return (
        <div >
            <Navbar />
            {
                isLoading ?
                    (<div className={classes.formContainer}>{Loader}</div>)
                    :
                    (
                        <div className={classes.formContainer} >
                            <form className={classes.form}>
                                <SignInImage title="Sign Up" />

                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="First Name"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        autoComplete="off"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleInputChange}

                                    />
                                    {errors.firstName ? (<Typography>{errors.firstName}</Typography>) : ""}
                                </FormControl>
                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="Last Name"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        autoComplete="off"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.lastName ? (<Typography>{errors.lastName}</Typography>) : ""}
                                </FormControl>
                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="Email Address"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        name="email"
                                        value={values.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email ? (<Typography>{errors.email}</Typography>) : ""}
                                </FormControl>
                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="Password"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        autoComplete="off"
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleInputChange}
                                    />
                                    {errors.password ? (<Typography>{errors.password}</Typography>) : ""}
                                </FormControl>
                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="Confirm Password"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        autoComplete="off"
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                    {errors.confirmPassword ? (<Typography>{errors.confirmPassword}</Typography>) : ""}
                                </FormControl>
                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="Contact Number"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        autoComplete="off"
                                        name="contactNumber"
                                        value={values.contactNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.contactNumber ? (<Typography>{errors.contactNumber}</Typography>) : ""}
                                </FormControl>
                                <FormControl>
                                    <Button className={classes.submitBtn} fullWidth variant="contained" color="primary" onClick={handleSubmit}>SIGN UP</Button>
                                </FormControl>
                                <div style={{ textAlign: "right" }}>
                                    <Button onClick={navigateToLogin} id="sign-in-link">Already have an account? Sign In</Button>
                                </div>
                                {
                                    signUpResponse ?
                                        (<div style={{ textAlign: "center" }}>
                                            <Typography>{signUpResponse}</Typography>
                                        </div>)
                                        : ""
                                }
                            </form>
                        </div>
                    )
            }
        </div>
    );
}

export default SignUp;