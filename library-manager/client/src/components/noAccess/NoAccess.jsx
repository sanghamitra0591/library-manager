import React from 'react'
import noAccessImage from "../../assets/images/no-access.png"
import "./NoAccess.css";

const NoAccess = () => {
    return (
        <div className='noAccessWrapper'>
            <img src={noAccessImage} alt="noaccess" />
        </div>
    )
}

export default NoAccess
