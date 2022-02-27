
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    mainContainer: {
        // border: "1px solid black",
        position: "relative",
        top: theme.spacing(10),
        padding: "0px 10%",
        [theme.breakpoints.down("sm")]: {
            padding: "0px 5%"
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0px 3%"
        }
    },
    productDetailsPageContainer: {
        display: "flex",
        flexDirection: "column",
        // border: "1px solid red"
    },
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
        minWidth: "15vw",
        minHeight: "50vh",
        // border: "1px solid black",
        overflow: "hidden",
        [theme.breakpoints.down("sm")]: {
            textAlign: "center"
        }
    },
    productContainer: {
        // border: "1px solid cyan",
        minWidth: "40vw",
        padding: "0 5%",
        "& > div": {
            marginBottom: theme.spacing(2)
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
    loaderContainer: {
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
}))

export default useStyles;