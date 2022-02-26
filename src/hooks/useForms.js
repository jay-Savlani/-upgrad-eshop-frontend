import { useState, useEffect } from "react";


const useForms = (initialValues, formValidation, apiMethod, successCallback) => {

    const [values, setValues] = useState(initialValues);

    const [errors, setErrors] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {

        const { name, value } = e.target;


        setValues({
            ...values,
            [name]: value
        });
    }


    useEffect(() => {
    let noError = true;
        for (const key in errors) {
            if (errors[key] !== "") {
                noError = false;
            }
        }
        // submit button is clicked at least once otherwise when the page loads it will run the useEffects
        if (noError && isSubmitted) {
            apiMethod(values, () => {
                if(successCallback) 
                successCallback();
            });
        }
    }, [errors])

    const handleSubmit = () => {
        setIsSubmitted(true);
        setErrors(formValidation(values))

    }

    return [values, errors, handleInputChange, handleSubmit];

}

export default useForms;