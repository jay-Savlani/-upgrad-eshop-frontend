import React, { useEffect } from "react";

// importing Styles

import useStyles from "../formStyles";

// importing hooks

import { useLoader } from "../../../hooks";

// material ui imports

import { Typography, Button, TextField, FormControl } from "@material-ui/core";

import { Navbar, SignInImage } from "../..";

// importing utility functions

import * as utils from "../../../utils/utils";

const SignUp = () => {

    // using Styles

    const classes = useStyles();

    const [isLoading, showLoader, hideLoader, Loader] = useLoader();

    useEffect(async () => {
        showLoader();
        await utils.delay(1000);
        hideLoader();
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

                                    />
                                </FormControl>
                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="Last Name"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                </FormControl>
                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="Email Address"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                </FormControl>
                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="Password"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        autoComplete="off"
                                        type="password"
                                    />
                                </FormControl>
                                <FormControl style={{ margin: "10px 0" }}>
                                    <TextField
                                        label="Confirm Password"
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        autoComplete="off"
                                        type="password"
                                    />
                                </FormControl>
                                <FormControl>
                                    <Button className={classes.submitBtn} fullWidth variant="contained" color="primary">SIGN UP</Button>
                                </FormControl>
                                <div style={{ textAlign: "right" }}>
                                    <Button id="sign-in-link">Already have an account? Sign In</Button>
                                </div>
                            </form>
                        </div>
                    )
            }
        </div>
    );
}

export default SignUp;