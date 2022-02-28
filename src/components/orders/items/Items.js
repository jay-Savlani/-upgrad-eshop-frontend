import React from 'react';
import useStyles from './itemStyles';
// material ui imports

import { Typography } from '@material-ui/core';

export default function Items({product, quantity}) {

    const classes = useStyles();

    const defaultImage = "https://www.reliancedigital.in/medias/Apple-12-Smartphones-491901536-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3w0NTIzNHxpbWFnZS9qcGVnfGltYWdlcy9oMzQvaGE1Lzk0MDc3NDY0NDEyNDYuanBnfDA3MmMxMTU3MzQ0M2ViMjdlMTMwNjlkZGMxOWMyNDViYjdiODJiYjZlNDExYzM4ZTQwYzQxOGZiNTk4MjMyNTk";


    return (
        <div className={classes.productDetailsContainer} >

            {/* Product Details image */}

            <div className={classes.productDetailsImage}>
                <img src={defaultImage} />
            </div>

            {/* Product Description container */}

            <div className={classes.productContainer} >
                {/* Name and available Quantity */}
                <div className={classes.nameAndQuantityContainer}>
                    {/* name */}
                    <div>
                        <Typography variant="h4">{product.name}</Typography>
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
                    <Typography style={{color: "red", fontSize: "2rem"}}>
                        {`Total Price: ₹${product.price*quantity}`}
                    </Typography>
                </div>

            </div>

        </div>
    )
}
