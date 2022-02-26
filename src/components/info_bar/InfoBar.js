import React from 'react'
import "./infoBar.css";

export default function InfoBar(props) {

    return (

        <div id="bar-div">
            {props.message}
        </div>

    )
}
        