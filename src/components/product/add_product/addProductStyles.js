import { makeStyles } from "@material-ui/styles";

const useAddProductStyles = makeStyles(theme => ({
        title: {
            marginTop: theme.spacing(12),
            textAlign: "center",
            [theme.breakpoints.down("xs")]: {
                marginTop: theme.spacing(20)
            }
        },
        heading: {
            fontSize: "1.5rem",
            textDecoration: "underline"
        },
        formContainer: {
            width: "100%",
            minHeight: "80vh",
            position: "relative",
            top: theme.spacing(2),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            
        }
}));

export default useAddProductStyles