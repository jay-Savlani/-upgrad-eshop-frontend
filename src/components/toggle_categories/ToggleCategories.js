import React, {useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core';

import * as utils from "../../utils/utils";

import { useBar } from '../../hooks';

import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

import { productApi } from '../../api';

const useStyles = makeStyles((theme) => ({
    toggleButtonContainer: {
        display: "flex",
        justifyContent: "center"
    },
}))

export default function ToggleCategories(props) {

    const classes = useStyles();

    const [categories, setCategories] = useState([]);

    const [showNotification, notify, stopNotify, notification] = useBar();

    useEffect(async () => {

        productApi.getProductCategories(
            async (response) => {

                console.log("response categories: ", response.categories);
                setCategories(response.categories);

            }
        )

    }, []);

    
    return (


        <div className={classes.toggleButtonContainer}>
            <ToggleButtonGroup
                exclusive
                value={props.selectedCategory}
                onChange={props.handleCategoryChange}
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

    )
}
