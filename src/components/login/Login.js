import React from "react";

// importing Styles

import useStyles from "./loginStyles";

// material ui imports

import { Typography, Button, TextField, FormControl} from "@material-ui/core";

import { Navbar } from "..";

const Login = () => {

    // using Styles

    const classes = useStyles();

    return(
        <div className={classes.mainContainer}>
            <form>
                <FormControl>
                    <TextField 
                        label="Email Address"
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        
                    />
                </FormControl>
                <FormControl>
                    <TextField 
                        label="Password"
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        type="password"
                        autoComplete="off"
                    />
                </FormControl>
                <FormControl>
                    <Button fullWidth variant="contained" color="primary">SIGN IN</Button>
                </FormControl>
            </form>
        </div>
    );
}

export default Login;