import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    orderInfoContainer: {
        border: "1px solid lightgrey",
        width: "100%",
        height: "70vh",
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        }
    },
    productInfo: {
        width: "60%",
        paddingTop: "4%",
        paddingLeft: theme.spacing(2),
        "& > div": {
            margin: theme.spacing(2,0)
        },
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "2%",
           "& > div" : {
               margin: "5px 0"
           }
        }
    },
    addressInfo: {
        "& > div": {
            margin: theme.spacing(1,0)
        },
        borderLeft: "1px solid lightgrey",
        paddingLeft: theme.spacing(2),
        paddingTop: "4%",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "2%",
           "& > div" : {
               margin: "5px 0"
           }
        }
    },
    productName: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
           fontSize: "1.5rem",
         }
    },
    totalPrice: {
        fontSize: "3rem",
        color: "red",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.5rem",
          }
    }
}));    

export default useStyles;