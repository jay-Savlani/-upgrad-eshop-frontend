import React, { useEffect, useState } from 'react';
import useStyles from './productDetailsStyles';
import { ToggleCategories } from '../..';
import { Navbar } from '../..';
import { Typography, TextField, Button } from '@material-ui/core';
import { routeConstants } from '../../../routes';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { productApi } from '../../../api';
import { useAuth } from '../../../contexts/authContext';
import { useLoader, useSnackBar } from '../../../hooks';
import * as utils from "../../../utils/utils";

export default function ProductDetails() {

  const classes = useStyles();
  const [isLoading, showLoader, hideLoader, Loader] = useLoader();
  const [showSnackBar, hideSnackBar, setMessage, setType , SnackBar] = useSnackBar();
  const defaultImage = "https://www.reliancedigital.in/medias/Apple-12-Smartphones-491901536-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3w0NTIzNHxpbWFnZS9qcGVnfGltYWdlcy9oMzQvaGE1Lzk0MDc3NDY0NDEyNDYuanBnfDA3MmMxMTU3MzQ0M2ViMjdlMTMwNjlkZGMxOWMyNDViYjdiODJiYjZlNDExYzM4ZTQwYzQxOGZiNTk4MjMyNTk";
  const { role } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  // states
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [placeOrderClicked, setPlaceOrderClicked] = useState(false);
  const [orderError, setOrderError] = useState("");

  const navigateToProductsPage = () => {
    navigate(routeConstants.PRODUCTS);
  }

  const handleOrderChange = (e) => {
    setQuantity(e.target.value);
  }

  const handleOrderClick = () => {

    if (quantity <= 0 || quantity > Number(product.availableItems)) {
      setPlaceOrderClicked(!placeOrderClicked);
      setOrderError("Invalid Order Quantity");

    }
    else {
      setPlaceOrderClicked(!placeOrderClicked);
      setOrderError("");

    }
  }

  useEffect(() => {
    if (!orderError && quantity > 0) {
      if (role === "user") {
        navigate(routeConstants.ORDERS, { state: { product: product, quantity: quantity } });
      }
      else {
          setMessage("Only users can order");
          setType("warning");
          showSnackBar();
      }
    }
  }, [placeOrderClicked])

  useEffect(() => {
    // make request
    productApi.getProducts(
      null,
      [id],
      async (response) => {
        showLoader();
        await utils.delay(600);
        setProduct(response.product);
        hideLoader();
      },
      (errorMessage) => {
        console.log("Error in getting produt details: ", console.errorMessage);
      }
    )
  }, []);

  return (

    <div>
      <Navbar />
      {SnackBar}
      {
        isLoading ?
          (<div className={classes.loaderContainer}>{Loader}</div>)
          :
          (
            <div className={classes.mainContainer}>

              {/* Product details container */}
              <div className={classes.productDetailsPageContainer}>
                {/* Product categories */}
                <div>
                  <ToggleCategories />
                </div>

                <div  className={classes.backToProducts}>
                  <Button onClick={navigateToProductsPage} variant='contained' color="secondary" size="medium">
                    BACK TO PRODUCTS
                  </Button>
                </div>

                <div className={classes.productDetailsContainer} >

                  {/* Product Details image */}

                  <div className={classes.productDetailsImage}>
                    <img src={ product.imageUrl ? product.imageUrl : defaultImage} />
                  </div>

                  {/* Product Description container */}

                  <div className={classes.productContainer} >
                    {/* Name and available Quantity */}
                    <div className={classes.nameAndQuantityContainer}>
                      {/* name */}
                      <div>
                        <Typography variant="h4">{product.name}</Typography>
                      </div>

                      {/* Avaiable Quantity */}

                      <div className={classes.availableQuantity}>
                        <Typography>
                          {`AVAILABLE QUANTITY: ${product.availableItems}`}
                        </Typography>
                      </div>

                    </div>

                    <div>
                      <Typography>
                        {`Company: ${product.manufacturer}`}
                      </Typography>
                    </div>

                    <div>
                      <Typography>
                        {`Category: ${product.category}`}
                      </Typography>
                    </div>

                    <div>
                      <Typography>
                        {product.description}
                      </Typography>
                    </div>

                    <div>
                      <Typography>
                        {`₹ ${product.price}`}
                      </Typography>
                    </div>

                    {/* Quantity input */}
                    <div>
                      <TextField
                        variant='outlined'
                        label="Enter Quantity"
                        value={quantity}
                        onChange={handleOrderChange}
                      />
                    </div>

                    <div>
                      <Button onClick={handleOrderClick} variant='contained' color="primary" >
                        PLACE ORDER
                      </Button>
                    </div>

                    {orderError ?
                      (
                        <div>
                          <Typography style={{marginTop: "10px", fontWeight: "bold", color: "red", fontSize: "1rem"}} >{orderError}</Typography>
                        </div>
                      )
                      :
                      ""
                    }

                  </div>

                </div>


              </div>

            </div>
          )
      }

    </div>
  )
}
