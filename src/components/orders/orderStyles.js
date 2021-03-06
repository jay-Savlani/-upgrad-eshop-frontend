
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
            padding: "0px 3%",
            top: theme.spacing(20)  
        }
    },
    stepperBody: {
        minHeight: "70vh",
        // border: "1px solid red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    nextPreviousButtonDiv: {
        display: "flex",
        justifyContent: "center"
    },
    loaderContainer: {
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
   
}))

export default useStyles;