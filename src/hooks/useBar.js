import {useState} from "react";

// importing InfoBar component

import { InfoBar } from "../components";


const useBar = () => {

    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");

    const notify = (message) => {
        setShowNotification(true);
        setMessage(message);
    }

    const stopNotify = () => {
        console.log("stop notify called");
        setShowNotification(false); 
    }

    const notification = showNotification && (< InfoBar message={message} />)

    return [showNotification, notify, stopNotify, notification];

}

export default useBar;