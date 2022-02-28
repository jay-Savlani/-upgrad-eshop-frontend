import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/authContext';
import { Navbar } from '../..';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeConstants } from '../../../routes';
import { useForms, useSnackBar, useLoader } from '../../../hooks';
import productFormValidation from "../../forms/formValidations/productFormValidation";
import useStyles from '../../forms/formStyles';
import useModifyProductStyles from './modifyProductStyles';
import { productApi } from '../../../api';
import { Button, FormControl, Typography, TextField } from "@material-ui/core";
import * as utils from '../../../utils/utils';

export default function ModifyProduct() {

    const { token, role } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, showLoader, hideLoader, Loader] = useLoader();
    const { name, category, price, description, manufacturer, availableItems, imageUrl } = location.state.product;
    const classes = useStyles();
    const classesSpecific = useModifyProductStyles();

    {/*  { name, category, price, description, manufacturer, availableItems, imageUrl } */ }
    const [productData, setProductData] = useState({
        name: name,
        category: category,
        price: price,
        description: description,
        manufacturer: manufacturer,
        availableItems: availableItems,
        imageUrl: imageUrl
    });

    const [values, errors, handleInputChange, handleSubmit] = useForms(productData, productFormValidation);
    const [showSnackBar, hideSnackBar, setMessage, setType, SnackBar] = useSnackBar();

    const modifyProduct = () => {
        handleSubmit();
        if (utils.isObjectEmpty(errors)) {
            // make request
            productApi.modifyProduct(
                location.state.product.product_id,
                values,
                token,
                async (response) => {
                    setMessage(response.message);
                    setType("success");
                    showSnackBar();
                    await utils.delay(1000);
                    navigate(routeConstants.PRODUCTS);
                },
                (errorMessage => {
                    setMessage(errorMessage);
                    setType("error");
                    showSnackBar();
                })

            )
        }
    }

    useEffect(async () => {
        showLoader();
        await utils.delay(700);
        hideLoader();
    }, []);

    return (
        <div>
            {
                role === "user" ?
                    (
                        <div style={{ fontSize: "2rem", color: "red" }}>NOT AUTHORIZED</div>
                    ) :
                    isLoading ? (<div className={classesSpecific.loaderContainer}>{Loader}</div>)
                        :
                        (
                            <div>

                                <Navbar />

                                {SnackBar}


                                <div className={classesSpecific.title} >
                                    <Typography className={classesSpecific.heading} variant="h4">MODIFY PRODUCT</Typography>
                                </div>

                                <div className={classesSpecific.formContainer} >


                                    <form className={classes.form}>
                                        <FormControl style={{ margin: "10px 0" }}>
                                            <TextField
                                                label="Name"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                name="name"
                                                value={values.name}
                                                onChange={handleInputChange}
                                            />
                                            {errors.name ? (<Typography>{errors.name}</Typography>) : ""}
                                        </FormControl>
                                        <FormControl style={{ margin: "10px 0" }}>

                                            <TextField
                                                label="Category"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                name="category"
                                                value={values.category}
                                                onChange={handleInputChange}
                                            />
                                            {errors.category ? (<Typography>{errors.category}</Typography>) : ""}

                                        </FormControl>
                                        <FormControl style={{ margin: "10px 0" }}>

                                            <TextField
                                                label="Price"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                type="number"
                                                name="price"
                                                value={values.price}
                                                onChange={handleInputChange}
                                            />
                                            {errors.price ? (<Typography>{errors.price}</Typography>) : ""}

                                        </FormControl>
                                        <FormControl style={{ margin: "10px 0" }}>

                                            <TextField
                                                label="Description"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                name="description"
                                                value={values.description}
                                                onChange={handleInputChange}
                                            />
                                            {errors.description ? (<Typography>{errors.description}</Typography>) : ""}

                                        </FormControl>
                                        <FormControl style={{ margin: "10px 0" }}>

                                            <TextField
                                                label="Manufacturer"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                name="manufacturer"
                                                value={values.manufacturer}
                                                onChange={handleInputChange}
                                            />
                                            {errors.manufacturer ? (<Typography>{errors.manufacturer}</Typography>) : ""}

                                        </FormControl>
                                        <FormControl style={{ margin: "10px 0" }}>

                                            <TextField
                                                label="Available Items"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                name="availableItems"
                                                type="number"
                                                value={values.availableItems}
                                                onChange={handleInputChange}
                                            />
                                            {errors.availableItems ? (<Typography>{errors.availableItems}</Typography>) : ""}

                                        </FormControl>
                                        <FormControl style={{ margin: "10px 0" }}>

                                            <TextField
                                                label="Image Url"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                name="imageUrl"
                                                value={values.imageUrl}
                                                onChange={handleInputChange}
                                            />

                                        </FormControl>
                                        <FormControl>
                                            <Button className={classes.submitBtn} fullWidth variant="contained" color="primary" onClick={modifyProduct} >MODIFY PRODUCT</Button>
                                        </FormControl>


                                    </form>
                                </div>

                            </div>
                        )
            }
        </div>
    )
}
