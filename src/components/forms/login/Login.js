import React, { useEffect, useState } from "react";

// importing Styles

import useStyles from "../formStyles";

// importing hooks

import { useLoader, useForms } from "../../../hooks";

// router imports

import { useNavigate } from "react-router-dom";

import { routeConstants } from "../../../routes";

// importing useContexts

import { useAuth } from "../../../contexts/authContext";

// material ui imports

import { Typography, Button, TextField, FormControl, IconButton, InputBase, Input, Icon, InputAdornment, OutlinedInput } from "@material-ui/core";

import VisibilityIcon from '@material-ui/icons/Visibility';

import { Navbar, SignInImage } from "../..";

// importing utitlity functions

import * as utils from '../../../utils/utils'

// importing form validations

import { loginValidation } from "../formValidations";

const Login = () => {

    const [isLoading, showLoader, hideLoader, Loader] = useLoader();

    const { login, loginResponse, setLoginResponse } = useAuth();

    const initialValues = {
        email: "",
        password: ""
    }

    const navigate = useNavigate();

    const navigateToProducts = async () => {
        await utils.delay(1500);
        navigate(routeConstants.PRODUCTS);
    }

    const [values, errors, handleInputChange, handleSubmit] = useForms(initialValues, loginValidation, login, navigateToProducts);





    // using Styles

    useEffect(async () => {
        showLoader();
        await utils.delay(1000);
        hideLoader();
        setLoginResponse("");
    }, [])

    const classes = useStyles();

    return (
        <div>
            <Navbar />
            {
                isLoading ?
                    (<div className={classes.formContainer}>{Loader}</div>)
                    :
                    (
                        <div className={classes.formContainer} >
                            <form className={classes.form}>
                                <SignInImage title="Sign In" />
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
                                        label="Enter Password"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        value={values.password}
                                        onChange={handleInputChange}
                                        
                                    />

                                    {errors.password ? (<Typography>{errors.password}</Typography>) : ""}
                                </FormControl>
                                <FormControl>
                                    <Button className={classes.submitBtn} fullWidth variant="contained" color="primary" onClick={handleSubmit}>SIGN IN</Button>
                                </FormControl>
                                {
                                    loginResponse ?
                                        (<div style={{ textAlign: "center" }}>
                                            <Typography>{loginResponse}</Typography>
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

export default Login;