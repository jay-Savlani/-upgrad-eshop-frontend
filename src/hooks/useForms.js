import { useState, useEffect } from "react";


const useForms = (initialValues, formValidation, apiMethod , successCallback ) => {

    const [values, setValues] = useState(initialValues);

    const [errors, setErrors] = useState({});


    const handleInputChange = (e) => {
       
        const {name, value} = e.target;

       
        setValues({
            ...values,
            [name]: value
        });
    }


    const handleSubmit = () => {
        
        setErrors(formValidation(values));

        if(!errors.email && !errors.password) {
            apiMethod(values, successCallback);
        }

    }   

    return [values , errors, handleInputChange , handleSubmit];

}

export default useForms;