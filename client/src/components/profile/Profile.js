import React from 'react';
import { withRouter } from 'react-router-dom';
import { useState, useContext } from "react";

import { LoginContext } from "../../context/LoginContext";

function Profile() {
    const { setIsAuth, isAut } = useContext(LoginContext);
    return <div><h1>welcome {isAut}</h1></div>;
}

export default withRouter(Profile);