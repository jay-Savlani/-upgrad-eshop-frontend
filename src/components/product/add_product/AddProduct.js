import React, {useState, useEffect, useMemo} from 'react';
import { useAuth } from '../../../contexts/authContext';
import { Navbar } from '../..';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeConstants } from '../../../routes';
import { useForms, useSnackBar } from '../../../hooks';
import productFormValidation from "../../forms/formValidations/productFormValidation";
import useStyles from '../../forms/formStyles';
import useAddProductStyles from './addProductStyles';
import { productApi } from '../../../api';
import { Button, FormControl, Typography, TextField, InputLabel } from "@material-ui/core";
import * as utils from '../../../utils/utils';
import CreatableSelect from 'react-select/creatable';

export default function AddProduct() {

    const { token, role } = useAuth();

    const navigate = useNavigate();

    const classes = useStyles();
    const classesSpecific = useAddProductStyles();

    
  
    {/*  { name, category, price, description, manufacturer, availableItems, imageUrl } */}

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        manufacturer: "",
        availableItems: "",
        imageUrl: ""
    });

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectCategoryError, setSelectCategoryError] = useState("");
    const [addProductClicked, setAddProductClick] = useState(false);

    const [values, errors, handleInputChange, handleSubmit] = useForms(productData, productFormValidation);

    const [showSnackBar, hideSnackBar, setMessage, setType , SnackBar] = useSnackBar();

    const addProduct = () => {
        handleSubmit();
        
        if(selectedCategory == "") {
            
            setSelectCategoryError("Required");
        }
        else {
            setSelectCategoryError("");
        }
        setAddProductClick(!addProductClicked);

     }

    const options = () => { 
            return categories.map(category => {
                return {value: category, label: category};
            })
        }
        
    

    useEffect(() => {
            // fetch categories
        productApi.getProductCategories(
            (response) => {
                setCategories(response.categories);
            },
            (errorMessage) => {
                
            }
        )
    }, []);

    useEffect(() => {
      
        if(selectedCategory !== "" &&  utils.isObjectEmpty(errors) && selectCategoryError === "" && role === "admin") {
        
                // make request
                productApi.addProduct(
                    {
                        ...values,
                        category: selectedCategory
                    },
                    token,
                    async (response) => {
                        setType("success");
                        setMessage(response.message);
                        showSnackBar();
                        await utils.delay(700);
                        navigate(routeConstants.PRODUCTS);

                    },
                    (errorMessage) => {
                        setType("error");
                        setMessage(errorMessage);
                        showSnackBar();
                    }
                )
        }
    }, [addProductClicked])
    
    const handleSelectInputChange = (inputValue) => {
        console.log(inputValue);
        setSelectedCategory(inputValue.value);
    }

    return (
        <div>
            {
                role === "user" ?
                    (
                        <div style={{ fontSize: "2rem", color: "red" }}>NOT AUTHORIZED</div>
                    ) :
                    (
                        <div>

                            <Navbar />

                            {SnackBar}


                                <div className={classesSpecific.title} >
                                    <Typography className={classesSpecific.heading} variant="h4">ADD PRODUCT</Typography>
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
                                            onChange = {handleInputChange}
                                        />
                                        {errors.name ? (<Typography className={classes.error} >{errors.name}</Typography>) : ""}
                                    </FormControl>
                                    <FormControl style={{ margin: "10px 0" }}>

                                        <CreatableSelect
                                            isClearable
                                            placeholder="Select Category"
                                            name= 'category'
                                            onChange={handleSelectInputChange}
                                            
                                            options={options()}
                                        />
                                        {selectCategoryError ? (<Typography className={classes.error} >{selectCategoryError}</Typography>) : ""}

                                    </FormControl>
                                    <FormControl style={{ margin: "10px 0" }}>

                                        <TextField
                                            label="Price"
                                            InputLabelProps={{ shrink: true }}
                                            variant="outlined"
                                            type="number"
                                            name="price"
                                            value={values.price}
                                            onChange = {handleInputChange}
                                        />
                                        {errors.price ? (<Typography className={classes.error} >{errors.price}</Typography>) : ""}

                                    </FormControl>
                                    <FormControl style={{ margin: "10px 0" }}>

                                        <TextField
                                            label="Description"
                                            InputLabelProps={{ shrink: true }}
                                            variant="outlined"
                                            name="description"
                                            value={values.description}
                                            onChange = {handleInputChange}
                                        />
                                        {errors.description ? (<Typography className={classes.error} >{errors.description}</Typography>) : ""}

                                    </FormControl>
                                    <FormControl style={{ margin: "10px 0" }}>

                                        <TextField
                                            label="Manufacturer"
                                            InputLabelProps={{ shrink: true }}
                                            variant="outlined"
                                            name="manufacturer"
                                            value={values.manufacturer}
                                            onChange = {handleInputChange}
                                        />
                                        {errors.manufacturer ? (<Typography className={classes.error} >{errors.manufacturer}</Typography>) : ""}

                                    </FormControl>
                                    <FormControl style={{ margin: "10px 0" }}>

                                        <TextField
                                            label="Available Items"
                                            InputLabelProps={{ shrink: true }}
                                            variant="outlined"
                                            name="availableItems"
                                            type="number"
                                            value={values.availableItems}
                                            onChange = {handleInputChange}
                                        />
                                        {errors.availableItems ? (<Typography className={classes.error} >{errors.availableItems}</Typography>) : ""}

                                    </FormControl>
                                    <FormControl style={{ margin: "10px 0" }}>

                                        <TextField
                                            label="Image Url"
                                            InputLabelProps={{ shrink: true }}
                                            variant="outlined"
                                            name="imageUrl"
                                            value={values.imageUrl}
                                            onChange = {handleInputChange}
                                        />

                                    </FormControl>
                                    <FormControl>
                                        <Button className={classes.submitBtn} fullWidth variant="contained" color="primary" onClick={addProduct} >ADD PRODUCT</Button>
                                    </FormControl>


                                </form>
                            </div>

                        </div>
                    )
            }
        </div>
    )
}
