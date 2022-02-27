import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Orders() {
    const location = useLocation();

    console.log("location state is: ", location.state);
  return (
    <div>Orders</div>
  )
}
