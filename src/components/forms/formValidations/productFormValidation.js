
import * as utils from "../../../utils/utils";


const productFormValidation = (values) => {


    const errors = {
        name: "",
        category: "",
        price: "",
        description: "",
        manufacturer: "",
        availableItems: ""
    }

    if(!values.name) {
        errors.name = "Required"
    }
    

    if(!values.category) {
        errors.category = "Required"
    }

    if(values.price === "0" || values.price === "") {
        errors.price = "Required"
    }

    if(!values.description) {
        errors.description = "Required"
    }
   

    if(!values.manufacturer) {
        errors.manufacturer = "Required"
    }
  

    if(values.availableItems === "0" || values.availableItems === "") {
        errors.availableItems = "Required"
    }

    return errors;
}

export default productFormValidation;