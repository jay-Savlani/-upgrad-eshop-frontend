import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
        searchBar: {
            background: theme.palette.primary.light,
            color: "white",
            width: "20%"
        },
        logo: {
            color: "white"
        },
        toolBar: {
            display: "flex",
            justifyContent: "space-between"
        },
        logoContainer: {
            display: "flex",
            alignItems: "center",
        },
        loginBtnGroup: {
            display: "flex",
            alignItems: "center",
            "& button": {
                background: "none",
                border: "none",
                color: "white",
                textDecoration: "underline",
                margin: theme.spacing(2,2),
                cursor: "pointer"
            },
            "& #logout-btn": {
                background: "#f55b81",
                textDecoration: "none",
                "&:hover": {
                    background: "#eb4b72"
                }
            }
        },
}));

export default useStyles;