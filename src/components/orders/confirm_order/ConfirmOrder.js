import React from 'react';
import useStyles from './comfirmOrderStyles';
// material ui imports

import { Typography } from '@material-ui/core';

export default function ConfirmOrder({ product, address, quantity }) {

    const classes = useStyles();

    return (
        <div className={classes.orderInfoContainer}>


            {/* Product summary */}

            <div className={classes.productInfo}>
                <div>
                    <Typography className={classes.productName} variant='h5'>{product.name}</Typography>
                </div>

                <div>
                    <Typography>
                        <span>Quantity: </span>
                        <span style={{ fontWeight: "bold" }}><em>{quantity}</em></span>
                    </Typography>

                </div>

                <div>
                    <Typography>

                        <span>Category: </span>
                        <span style={{ fontWeight: "bold" }}><em>{product.category}</em></span>

                    </Typography>
                </div>

                <div>
                    <Typography>{product.description}</Typography>
                </div>

                <div>
                    <Typography className={classes.totalPrice} >{`Total Price: ₹${product.price * quantity}`}</Typography>
                </div>
            </div>


            {/* Address Info */}

            <div className={classes.addressInfo}>

                <div>
                    <Typography style={{fontSize: "2.5rem"}} variant="h5">Address Details: </Typography>
                </div>

                <div>
                    <Typography>{address.name}</Typography>
                </div>

                <div>
                    <Typography>Contact Number: {address.contactNumber}</Typography>
                </div>

                <div>
                    <Typography>{`${address.street}, ${address.landmark}`}</Typography>
                </div>

                <div>
                    <Typography>{`${address.city}, ${address.state}`}</Typography>
                </div>

                <div>
                    <Typography>{address.zipcode}</Typography>
                </div>


            </div>


        </div>
    )
}
