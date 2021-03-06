import React from "react";
import { Route } from "react-router-dom";
import Login from  './Routes/Login';
import Home from "./Routes/Home";
import Admin from "./Routes/Admin";

import Checkout from "./Routes/Checkout";
 const Routes: React.FC = () => {
    return (
        <>
            <Route exact path="/" component={Login} />
            <Route path='/Home' component={Home} />
            <Route path='/Admin' component={Admin} />

            <Route path='/Checkout' component={Checkout} />
        </>
    )
}

export default Routes;