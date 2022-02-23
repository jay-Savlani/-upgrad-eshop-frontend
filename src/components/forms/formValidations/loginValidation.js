
import * as utils from "../../../utils/utils";


const loginValidation = (values) => {


    const errors = {
        email: "",
        password: ""
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

    return errors;
}

export default loginValidation;