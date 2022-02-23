import React from 'react'

import { Outlet } from 'react-router-dom'

import { Navbar } from '..'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
   
        outlet: {
            marginTop: theme.spacing(10)
        }
    
}));


export default function Layout() {

    const classes = useStyles();

  return (
    <div >
        <div>
            <Navbar />
        </div>
        <div className = {classes.outlet} >
            <Outlet />
        </div>

    </div>
  )
}
