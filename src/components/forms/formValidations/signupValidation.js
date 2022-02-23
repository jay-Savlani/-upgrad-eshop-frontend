
import * as utils from "../../../utils/utils";


const signupValidation = (values) => {


    const errors = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber: ""
    }
    
    if(!values.email.trim()) {
        errors.email = "Required"
    }
    else if(!utils.checkValidEmail(values.email)) {
        errors.email = "Invalid Email"
    }

    if(!values.password) {
        errors.password = "Required"
    }
    else if(values.password.length < 6) {
        errors.password = "Password should be atleast 6 characters long"
    }

    if(!values.confirmPassword) {
        errors.confirmPassword = "Required"
    }
    else if(values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
    }

    if(values.contactNumber.toString().length < 10 ) {
        errors.contactNumber = "Contact Number should be atleast 10 digits"
    }

    return errors;
}

export default signupValidation;