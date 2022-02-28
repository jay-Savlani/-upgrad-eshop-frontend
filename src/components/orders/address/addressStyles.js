
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
   formContainer: {
    //    border: "1px solid black",
       width: "30%",
       marginBottom: "3%",
       [theme.breakpoints.down("md")]: {
           width: "70%"
       },
       [theme.breakpoints.down("sm")]: {
        width: "80%"
    },
   },
   form: {
    //    border: "1px solid blue",
       display: "flex",
       flexDirection: "column",
   }
   
}))

export default useStyles;