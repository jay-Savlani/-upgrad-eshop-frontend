import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    mainContainer: {
        // border: "1px solid black",
        position: "relative",
        top: theme.spacing(10),
        padding: "0px 10%",
        [theme.breakpoints.down("sm")]: {
            padding: "0px 5%"
        },
        [theme.breakpoints.down("xs")]: {
            padding: "0px 3%",
            top: theme.spacing(20)
        }
    },
    productsPageContainer: {
        // border: "1px solid red",
        display: "flex",
        flexDirection: "column"
    },
    
    filterContainer: {
        marginTop: theme.spacing(3)
    },
    media: {
       height: 250,
       width: 300,
       
    //    [theme.breakpoints.down("sm")]: {
    //        width: "80%",
    //    }
    },
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        margin: "0 3%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignContent: "center"
        }
    },
    card: {
        marginTop: "30px",
        width: "30%",
        [theme.breakpoints.down("sm")]: {
            width: "80%",
        }
    },
    namePrice: {
        display: "flex",
        justifyContent: "space-between"
    },
    loaderContainer: {
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    cardActionDiv: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    }

}));

export default useStyles;