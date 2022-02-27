import React, { useState, useEffect } from 'react';

import { Navbar } from "../../../components";

import useStyles from './productStyles';

// importing custom hooks

import { useLoader, useBar } from '../../../hooks';

import { useAuth } from '../../../contexts/authContext';

// importing product api

import { productApi } from '../../../api';

import * as utils from "../../../utils/utils";

// material ui imports 

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Card, CardActions, CardContent, CardMedia, FormControl, InputLabel, Select, Typography, Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Products() {

  const classes = useStyles();

  const {role} = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("");

  const [filter, setFilter] = useState("");

  const [searchValue, setSearchValue]  = useState("");

  const [categories, setCategories] = useState([]);

  const [productData, setProductData] = useState([]);


  const [isLoading, showLoader, hideLoader, Loader] = useLoader();

  const [showNotification, notify, stopNotify, notification] = useBar();

  const defaultImageUrl = "https://www.libertyshoesonline.com/pub/media/catalog/product/cache/d27f3f74a53679e84179ee8edfe784ba/g/u/guppy1esgreen_1.jpg";

  const handleCategoryChange = (e, newCategory) => {
    setSelectedCategory(newCategory);
  }

  const handleSelectChange = (e) => {
    setFilter(e.target.value);
  }

  useEffect(() => {

    // mandatory fetch 

    // { category, direction, name, sortBy }
    
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
          setProductData(response.products);
          hideLoader();
        },
        async () => {
          notify("Something went wrong");
          await utils.delay(2000);
          stopNotify();
        }
      )
  
    
  }, [filter, selectedCategory, searchValue]);

  useEffect(async () => {

    productApi.getProductCategories(
      async (response) => {
        
      
        setCategories(response.categories);
        
      },
      async () => {
        notify("Error in fetching categores");
        await utils.delay(2000);
        stopNotify();
      }
    )

  }, []);


  return (
    <div>
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />


      <div className={classes.mainContainer} >
        Main Container

        <div className={classes.productsPageContainer}>

          <div>
            {/* Toggle Button Group */}
            <div className={classes.toggleButtonContainer}>
              <ToggleButtonGroup
                exclusive
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
              <ToggleButton value="">
                ALL
              </ToggleButton>
                {
                  categories.map((category, index) => {

                    return <ToggleButton value={category.toLowerCase()} key={index}>
                      {category.toUpperCase()}
                    </ToggleButton>
                  })
                }
              </ToggleButtonGroup>
            </div>
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

                            <CardMedia
                              className={classes.media}
                              image={product.imageUrl ? product.imageUrl : defaultImageUrl}
                              title="shoes"
                            />

                            <CardContent>
                              {/* Name and Price */}
                              <div className={classes.namePrice}>
                                <Typography variant="h5">{product.name}</Typography>
                               <Typography variant="h5">{`₹ ${product.price}`}</Typography>

                              </div>
                              {/* Manufactured */}
                              <Typography variant="h6">{product.manufacturer}</Typography>
                              {/* Description */}
                              <Typography varaint="body2" >{product.description}</Typography>
                            </CardContent>

                            <CardActions>
                                <div className={classes.cardActionDiv} >
                                    <Button variant="contained" color="primary" size="small">BUY</Button>
                                
                                {/* If role is admin then add edit and delete buttons */}
                               
                                {
                                  role === "admin" && 
                                  (
                                    <div>
                                        <IconButton>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteIcon />
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
