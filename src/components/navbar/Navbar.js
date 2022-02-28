import React, { useState } from 'react';

// importing useLocation and Navigate component from react-router-dom

import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';

// importing hooks

import { useLoader, useBar } from '../../hooks';

// importing util functions

import * as utils from "../../utils/utils";

// import useAuth hook to use Auth Context

import { useAuth } from '../../contexts/authContext';

// importing router constants

import { routeConstants } from '../../routes';


// importing useStyles hook

import useStyles from './navbarStyles';

// importing material ui components 

import { AppBar, Toolbar, IconButton, InputBase, Button, Typography } from '@material-ui/core';

// importin material ui icons

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Search } from '@material-ui/icons';

// importing useBar



export default function Navbar(props) {

  // using styles 

  const classes = useStyles();

  const { isLoggedIn, role, logout } = useAuth();

  const navigate = useNavigate();

  const [isLoading, showLoader, hideLoader, Loader] = useLoader();

  const [showNotification, notify, stopNotify, notification] = useBar();

  // using location

  const location = useLocation();

  const navigateToHome = () => {
    navigate(routeConstants.PRODUCTS);
  }

  const onLoginClick = () => {
    navigate(routeConstants.SIGNIN, { state: { from: location }, replace: true })
  }

  const onSignUpClick = () => {
    navigate(routeConstants.SIGNUP, { state: { from: location }, replace: true });
  }

  const onAddProductClick = () => {

  }

  const onLogoutClick = () => {
    logout(async () => {
      notify("Logout successfull");
      await utils.delay(3000);
      stopNotify();
    });
  }

  const handleSearchChange = (e) => {
    console.log("handle search change fired")
    props.setSearchValue(e.target.value);    
  }


  return (
   
    <div>
      {notification}
      <AppBar>
        <Toolbar className={classes.toolBar}>
          <div className={classes.logoContainer}>
            <IconButton>
              <ShoppingCartIcon className={classes.logo} />
            </IconButton>
            <Typography>upGrad E-shop</Typography>
          </div>

          {isLoggedIn && (
            <InputBase
              className={classes.searchBar}
              value = {props.searchValue}
              onChange = {handleSearchChange}
              autoComplete="off"
              placeholder='Search Products'
              startAdornment={<Search className={classes.searchIcon} />}
              inputProps={{ "area-label": "search" }}
            />
          )}

          <div className={classes.loginBtnGroup}>
            <button onClick={navigateToHome}>Home</button>
            {isLoggedIn && role === "admin" ? (<button onClick={onAddProductClick}>Add Product</button>) : ""}
            {!isLoggedIn && (<button onClick={onLoginClick}>Login</button>)}
            {!isLoggedIn && (<button onClick={onSignUpClick}>Signup</button>)}
            {isLoggedIn && (<Button id="logout-btn" varaint="contained" className={classes['logout-btn']} onClick={onLogoutClick}>Logout</Button>)}
          </div>


        </Toolbar>
      </AppBar>
    </div>
  )
}
