import React, { useState } from 'react';

// importing useLocation and Navigate component from react-router-dom

import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';

// import useAuth hook to use Auth Context

import { useAuth } from '../../contexts/authContext';

// importin useNavigate from react router

// importing router constants

import { routeConstants } from '../../routes';


// importing useStyles hook

import useStyles from './navbarStyles';

// importing material ui components 

import { AppBar, Toolbar, IconButton, InputBase, Button, Typography } from '@material-ui/core';

// importin material ui icons

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Search } from '@material-ui/icons';

export default function Navbar() {

  // using styles 

  const classes = useStyles();

  const { isLoggedIn, role, logout } = useAuth();

  const navigate = useNavigate();

  // using location

  const location = useLocation();

  const navigateToHome = () => {
    navigate(routeConstants.PRODUCTS);
  }

  const onLoginClick = () => {
    navigate(routeConstants.SIGNIN, { state: { from: location }, replace: true })
  }

  const onSignUpClick = () => {
    navigate(routeConstants.SIGNUP, {state: {from: location}, replace: true});
  }

  const onAddProductClick = () => {

  }

  const onLogoutClick = () => {

  }


  return (
    <div>
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
            autoComplete="off"
            placeholder='Search Products'
            startAdornment={<Search className={classes.searchIcon} />}
            inputProps={{ "area-label": "search" }}
          />
        )}

        <div className={classes.loginBtnGroup}>
          <button onClick={navigateToHome}>Home</button>
          {!isLoggedIn && role == "admin" ? (<button onClick={onAddProductClick}>Add Product</button>) : ""}
          {!isLoggedIn && (<button onClick={onLoginClick}>Login</button>)}
          {!isLoggedIn && (<button onClick={onSignUpClick}>Signup</button>)}
          {isLoggedIn && (<Button id="logout-btn" varaint="contained" className={classes['logout-btn']} onClick={onLogoutClick}>Logout</Button>)}
        </div>
        

      </Toolbar>
    </AppBar>
    </div>
  )
}
