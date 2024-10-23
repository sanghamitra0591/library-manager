import React from 'react'
import "./Loader.css"
import loadergif from "../../assets/images/loadergif.webp"

const Loader = () => {
    return (
        <div className='loaderWrapper'>
            <img src={loadergif} alt="loader" />
        </div>
    )
}

export default Loader
