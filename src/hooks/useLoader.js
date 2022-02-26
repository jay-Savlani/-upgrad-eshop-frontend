import { useState } from "react";

// importing circular loader

import CircularProgress from '@material-ui/core/CircularProgress';

const useLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    const showLoader = () => {
        setIsLoading(true);
    }

    const hideLoader = () => {
        setIsLoading(false);
    }

    const Loader = isLoading && (<CircularProgress color="secondary" />)

    return [isLoading, showLoader, hideLoader, Loader ];
}   

export default useLoader;