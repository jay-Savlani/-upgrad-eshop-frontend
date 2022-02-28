import React, { useState, useEffect } from 'react';
import useStyles from './orderStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '..';
import Items from './items/Items';
import Address from './address/Address';
import ConfirmOrder from './confirm_order/ConfirmOrder';
import { useAuth } from '../../contexts/authContext';
import { orderApi } from '../../api';
import * as utils from '../../utils/utils';
import { useSnackBar, useLoader } from '../../hooks';
import { routeConstants } from '../../routes';

// material ui imports

import { Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';


function getSteps() {
  return ['Items', 'Select Address', 'Confirm Address'];
}




export default function Orders() {

  const classes = useStyles();
  const { token, role, getLoggedInUserDetails } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSnackBar, hideSnackBar, setMessage, setType, SnackBar] = useSnackBar();
  const [isLoading, showLoader, hideLoader, Loader] = useLoader();
  const steps = getSteps();
  function getStepContent(step) {
    switch (step) {
      case 0: return (<Items product={location.state.product} quantity={location.state.quantity} />);
      case 1: return (<Address address={currentAddress} setAddress={setCurrentAddress} />);
      case 2: return (<ConfirmOrder product={location.state.product} address={currentAddress} quantity={location.state.quantity} />)
    }
  }

  // states
  const [activeStep, setActiveStep] = useState(0);
  const [currentAddress, setCurrentAddress] = useState({});

  // functions
  const handleNext = () => {

    if (activeStep === 1 && utils.isObjectEmpty(currentAddress)) {
      setMessage("Please Select Address");
      setType("warning");
      showSnackBar();
      return;
    }

    if (activeStep === 2 && role === "user") {
      // place order
      orderApi.addOrder(
        {
          userEmail: getLoggedInUserDetails().email,
          productId: location.state.product.product_id,
          addressId: currentAddress.address_id,
          quantity: location.state.quantity
        },
        token,
        async (response) => {
          setType("success");
          setMessage("Order Placed Successfully..! You will be redirected to Products page");
          showSnackBar();
          await utils.delay(4000);
          navigate(routeConstants.PRODUCTS);

        },
        (errorMessage) => {
          console.log("Error in placing order: ", errorMessage);
          setType("error");
          setMessage(errorMessage);
          showSnackBar();
        }
      );

      return;
    }

    setActiveStep(prevStep => prevStep + 1);
  }

  const handleBack = () => {
    setActiveStep(prevState => prevState - 1);
  }

  useEffect(async () => {
      showLoader();
      await utils.delay(700);
      hideLoader();
  }, []);

  return (
    <div>

      {SnackBar}

      <Navbar />

      {
        isLoading ? 

        (
          <div className={classes.loaderContainer}>{Loader}</div> 
        )
        :
        (
          <div className={classes.mainContainer}>

          {/* Stepper */}
          <div>
            <Stepper activeStep={activeStep}>
              {
                steps.map((label) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  )
                })
              }
            </Stepper>
          </div>
  
          {/* Body */}
  
          <div className={classes.stepperBody}>
            {getStepContent(activeStep)}
          </div>
  
          {/*Next and previous buttons  */}
          <div className={classes.nextPreviousButtonDiv}>
            <Button onClick={handleBack} disabled={activeStep === 0} variant="contained" color="secondary">BACK</Button>
            <Button onClick={handleNext} style={{ marginLeft: "10px" }} variant="contained" color="primary">{activeStep === 2 ? "PLACE ORDER" : "NEXT"}</Button>
          </div>
        </div>
        )
      }
     


    </div>
  )
}
