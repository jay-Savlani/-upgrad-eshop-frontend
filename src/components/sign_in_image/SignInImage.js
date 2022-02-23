import React from 'react'

// material ui imports

import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';

export default function SignInImage(props) {
  return (
    <div style={{textAlign: "center"}}>
        
        <LockOpenRoundedIcon fontSize='large' style={{color: "red"}} />
        <h3>{props.title}</h3>
    </div>
  )
}
