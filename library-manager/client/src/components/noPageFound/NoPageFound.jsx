import React from 'react'
import noPageImage from "../../assets/images/noPageFound.jpg"
import "./NoPageFound.css";

const NoPageFound = () => {
    return (
        <div className='noAccessWrapper'>
            <img src={noPageImage} alt="noaccess" />
        </div>
    )
}

export default NoPageFound
