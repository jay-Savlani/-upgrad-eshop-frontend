
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
   
    
    productDetailsContainer: {
        // border: "1px solid purple",
        display: "flex",
        flexDirection: "row",
        marginTop: theme.spacing(8),
        padding: "0px 10%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            padding: "0px 5%"
        }

    },
    productDetailsImage: {
        width: "30vw",
        height: "50vh",
        display: "flex",
        // border: "1px solid black",
        overflow: "hidden",
        [theme.breakpoints.down("sm")]: {
            textAlign: "center"
        },
        [theme.breakpoints.down("xs")]: {
            width: "80vw",
            justifyContent: "center"
        }
    },
    nameAndQuantityContainer: {
        // border: "1px solid red",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            "& > div": {
                margin: "10px 0"
            }
        }
    },
    availableQuantity: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        minWidth: "30%",
        padding: theme.spacing(1),
        textAlign: "center",
        borderRadius: theme.spacing(2)
    },
    productContainer: {
        // border: "1px solid cyan",
        minWidth: "20vw",
        padding: "0 5%",
        "& > div": {
            marginBottom: theme.spacing(2)
        }

    },
}))

export default useStyles;