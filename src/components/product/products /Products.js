import React, { useState, useEffect } from 'react';
import { Navbar, ToggleCategories } from "../../../components";
import useStyles from './productStyles';
// react router imports
import { useNavigate } from 'react-router-dom';
// importing custom hooks
import { useLoader, useBar, useSnackBar, useDeleteDialog } from '../../../hooks';
import { useAuth } from '../../../contexts/authContext';
// importing product api
import { productApi } from '../../../api';
import * as utils from "../../../utils/utils";
import { routeConstants } from '../../../routes';
// material ui imports 
import { Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, Select, Typography, Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Products() {

  const classes = useStyles();
  const { token, role } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [productData, setProductData] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(0);
  const [deleteProductName, setDeleteProductName] = useState("");
  const [isLoading, showLoader, hideLoader, Loader] = useLoader();
  const [showSnackBar, hideSnackBar, setMessage, setType, SnackBar] = useSnackBar();
  
  const defaultImageUrl = "https://www.libertyshoesonline.com/pub/media/catalog/product/cache/d27f3f74a53679e84179ee8edfe784ba/g/u/guppy1esgreen_1.jpg";
  
  const handleCategoryChange = (e, newCategory) => {
    setSelectedCategory(newCategory);
  }
  const handleSelectChange = (e) => {
    setFilter(e.target.value);
  }
  const navigateToProductDetails = (product_id) => {
    const productDetailsUrl = utils.getProductDetailsUrl(product_id);
    navigate(productDetailsUrl);
  }
  const navigateToModifyProduct = (product_id, product) => {
    const productUpdateUrl = utils.getModifyProductUrl(product_id);
    navigate(productUpdateUrl, { state: { product: product } });
  }

  const deleteIconClickHandler = (product_id, productName) => {
      openDialog();
      setDeleteProductId(product_id);
      setDeleteProductName(productName);
  }

  const deleteProduct = () => {
    // make request
    if(role === "admin") {
      productApi.deleteProduct(
        deleteProductId,
        token,
        () => {
          setType("success");
          setMessage(`Product ${deleteProductName} deleted successfully!`)
          showSnackBar();
          setDeleteClicked(!deleteClicked);
        },
        (errorMessage) => {
          setType("error");
          setMessage(errorMessage)
          showSnackBar();
        }
      );
      
      closeDialog();
    }

  }

  const [openDialog, closeDialog, onDeleteClick, DeleteDialog] = useDeleteDialog(deleteProduct);
  
    useEffect(() => {

    // mandatory fetch 

    // { category, direction, name, sortBy }
    console.log("Selected category: ", selectedCategory);

    productApi.getProducts(
      {
        category: selectedCategory,
        direction: filter === "desc" || filter === "asc" ? filter : "desc",
        name: searchValue,
        sortBy: filter === "desc" || filter === "asc" ? "price" : filter
      },
      null,
      async (response) => {
        showLoader();
        await utils.delay(700);
        console.log("Products received are: ", response.products);
        setProductData(response.products);
        hideLoader();
      },
      async () => {
        setMessage("Something went wrong");
        setType("error");
        showSnackBar();
      }
    )


  }, [filter, selectedCategory, searchValue, deleteClicked]);

  return (
    <div>
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />

      {SnackBar}

      {DeleteDialog}


      <div className={classes.mainContainer} >


        <div className={classes.productsPageContainer}>

          <div>
            {/* Toggle Button Group */}
            <ToggleCategories key={deleteClicked} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange} />

          </div>

          <div>
            {/* Filter Select */}
            <div className={classes.filterContainer}>
              <FormControl style={{ minWidth: "15%" }} >
                <InputLabel htmlFor='sort-by-select'>Sort By:</InputLabel>
                <Select
                  variant='outlined'
                  value={filter}
                  onChange={handleSelectChange}
                  inputProps={{
                    name: "sortBy",
                    id: "sort-by-select"
                  }}
                >
                  <option value="">Default</option>
                  <option value="desc">Price: High to Low</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="createdAt">Newest</option>
                </Select>
              </FormControl>
            </div>
          </div>

          <div>
            {/* Card group */}
            {
              isLoading ?
                (
                  <div className={classes.loaderContainer}>
                    <div>
                      {Loader}
                    </div>
                  </div>
                )
                :
                (
                  <div className={classes.cardContainer}>

                    {
                      productData.map(product => {
                        return (

                          <Card key={product.product_id} className={classes.card}>

                            <div style={{display: "flex", justifyContent: "center"}}>
                            <CardMedia
                              className={classes.media}
                              image={product.imageUrl ? product.imageUrl : defaultImageUrl}
                              title="shoes"
                            />
                            </div>

                            <CardContent>
                              {/* Name and Price */}
                              <div className={classes.namePrice}>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography variant="h5">{`??? ${product.price}`}</Typography>

                              </div>
                              {/* Manufactured */}
                              <Typography variant="h6">{product.manufacturer}</Typography>
                              {/* Description */}
                              <Typography varaint="body2" >{product.description}</Typography>
                            </CardContent>

                            <CardActions>
                              <div className={classes.cardActionDiv} >
                                <Button onClick={() => navigateToProductDetails(product._id)} variant="contained" color="primary" size="small">BUY</Button>

                                {/* If role is admin then add edit and delete buttons */}

                                {
                                  role === "admin" &&
                                  (
                                    <div>
                                      <IconButton onClick={() => navigateToModifyProduct(product._id, product)} >
                                        <EditIcon />
                                      </IconButton>
                                      <IconButton>
                                        <DeleteIcon onClick = {() => deleteIconClickHandler(product._id, product.name)} />
                                      </IconButton>
                                    </div>
                                  )
                                }
                              </div>
                            </CardActions>

                          </Card>
                        )
                      })
                    }


                  </div>
                )
            }

          </div>

        </div>

      </div>



    </div>
  )
}
