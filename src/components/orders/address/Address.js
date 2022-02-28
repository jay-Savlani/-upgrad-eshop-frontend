import React, { useEffect, useState } from "react";
// importing Styles
import useStyles from "./addressStyles";
// importing hooks
import { useForms, useSnackBar } from "../../../hooks";
// importing contexts
import { useAuth } from "../../../contexts/authContext";
// import form validations
import addressFormValidation from "./addressFormValidation";
// material ui imports
import { Typography, Button, TextField, FormControl, InputLabel, Select, Snackbar } from "@material-ui/core";
// importing utility functions
import * as utils from "../../../utils/utils";
// importing apis
import { addressApi, userApi } from "../../../api";

const Address = ({address, setAddress}) => {

// using Styles
const classes = useStyles();

  const {token , getLoggedInUserDetails} = useAuth();
  const [showSnackBar, hideSnackBar, setMessage, setType , SnackBar] = useSnackBar();
const [addresses, setAddresses] = useState([]);
const [addAddressClicked, setAddAddressClicked] = useState(false);

  const initialValues = {
    name: "",
    contactNumber: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    zipcode: ""
  }

  const addAddress = () => {
    
    handleSubmit();

    let noError = true;

    for(const key in errors ) {
      console.log(`for error key ${key} value is ${errors[key]}`)
      if(errors[key] !== "") {
        noError = false;
        break;
      }
    }

    if(noError) {
      console.log("inside if");
       console.log("logged in user email in add address: ", getLoggedInUserDetails().email)
        addressApi.addAddress({
          ...values,
          userEmail: getLoggedInUserDetails().email
        },  
        token,
        (response) => {
          setAddAddressClicked(!addAddressClicked);
          setMessage(response.message);
          setType("success");
          showSnackBar();
        },
        (errorMessage) => {
          setMessage(errorMessage);
          setType("error");
          showSnackBar();
        }
        
        )

       
    }

  }

  const [values, errors, handleInputChange, handleSubmit] = useForms(initialValues, addressFormValidation);


  useEffect(() => {
      // make api request
     

      userApi.getAddresses(
        getLoggedInUserDetails().email,
        (response) => {
          setAddresses(response.addresses);
        },
        (errorMessage) => {
          console.log("error message is: ", errorMessage);
        }
      )
  },[addAddressClicked]);


  return (
      <div className={classes.formContainer} >
        {SnackBar}
        {/* Select Address */}
            <FormControl style={{ width: "100%", marginBottom: "5%" }} >
                <InputLabel htmlFor='address-select'>SELECT ADDRESS</InputLabel>
                <Select
                  variant='outlined'
                  inputProps={{
                    name: "address-select",
                    id: "address-select"
                  }}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                >
                 {
                     addresses.map(address => {
                       return <option value={address} key={address.address_id}>{`${address.name}-->${address.city}-->${address.street}`}</option>
                     })
                  }
                </Select>
              </FormControl>
        
            
          <div style={{marginBottom: "5%", textAlign: "center"}}>
            OR
          </div>


        <form className={classes.form}>

        <FormControl style={{ margin: "10px 0" }}>
            <TextField
              label="Name"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              autoComplete="off"
              name="name"
              value={values.name}
              onChange={handleInputChange}

            />
            {errors.name ? (<Typography>{errors.name}</Typography>) : ""}
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
          <FormControl style={{ margin: "10px 0" }}>
            <TextField
              label="Street"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              name="street"
              value={values.street}
              onChange={handleInputChange}
            />
            {errors.street ? (<Typography>{errors.street}</Typography>) : ""}
          </FormControl>
          <FormControl style={{ margin: "10px 0" }}>
            <TextField
              label="Landmark"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              autoComplete="off"
              name="landmark"
              value={values.landmark}
              onChange={handleInputChange}
            />
            {errors.landmark ? (<Typography>{errors.landmark}</Typography>) : ""}
          </FormControl>
          <FormControl style={{ margin: "10px 0" }}>
            <TextField
              label="City"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              autoComplete="off"
              name="city"
              value={values.city}
              onChange={handleInputChange}
            />
            {errors.city ? (<Typography>{errors.city}</Typography>) : ""}
          </FormControl>
          <FormControl style={{ margin: "10px 0" }}>
            <TextField
              label="State"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              autoComplete="off"
              name="state"
              value={values.state}
              onChange={handleInputChange}
            />
            {errors.state ? (<Typography>{errors.state}</Typography>) : ""}
          </FormControl>
          <FormControl style={{ margin: "10px 0" }}>
            <TextField
              label="Zip Code"
              type="number"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              autoComplete="off"
              name="zipcode"
              value={values.zipcode}
              onChange={handleInputChange}
            />
            {errors.zipcode ? (<Typography>{errors.zipcode}</Typography>) : ""}
          </FormControl>
          <FormControl>
            <Button fullWidth variant="contained" color="primary" onClick={addAddress}>ADD ADDRESS</Button>
          </FormControl>
        </form>
      </div>
  );
}

export default Address;