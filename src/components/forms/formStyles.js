import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
        form: {
            display: "flex",
            flexDirection: "column",
            width: "25%",
            [theme.breakpoints.down("md")]: {
                width: "60%"
            },
            [theme.breakpoints.down("xs")]: {
                width: "80%"
            },
            "& #sign-in-link" : {
                textDecoration: "underline",
                border: "none",
                background: "none",
                textAlign: "right",
                textTransform: 'lowercase',
            }

        },
        formContainer: {
            width: "100%",
            minHeight: "80vh",
            position: "relative",
            top: theme.spacing(10),
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        formControl: {
            marginTop: "10px",
            marginBottom: "10px"
        },
        submitBtn: {
            marginTop: theme.spacing(1)
        },
        error: {
            color: "red"
        }
}));

export default useStyles;