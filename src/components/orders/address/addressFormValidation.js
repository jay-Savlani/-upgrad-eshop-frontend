
import * as utils from "../../../utils/utils";


// { name, contactNumber, street, landmark, city, state, zipcode, userEmail }


const addressFormValidation = (values) => {


    const errors = {
        name: "",
        contactNumber: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        zipcode: ""
    }
    
    if(!values.name) {
        errors.name = "Required"
    }

    if(!values.contactNumber) {
        errors.contactNumber = "Required"
    }
    else if(values.contactNumber.toString().length < 10 ) {
        errors.contactNumber = "Please enter 10 digits"
    }
    

    if(!values.street) {
        errors.street = "Required"
    }

    if(!values.landmark) {
        errors.landmark = "Required"
    }

    if(!values.city) {
        errors.city = "Required"
    }

    if(!values.state) {
        errors.state = "Required"
    }

    if(!values.zipcode) {
        errors.zipcode = "Required"
    }
    else if(values.zipcode.toString().length != 6 ) {
        errors.zipcode = "Please enter 6 digits"
    }
    


    return errors;
}

export default addressFormValidation;