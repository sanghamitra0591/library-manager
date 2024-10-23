import React from "react";
import "./NoResult.css"
import noResultsImage from "../../assets/images/no-result-found.png"

const NoResult = () => {
    return (
        <div className="noResultsWrapper">
            <img
                src={noResultsImage}
                alt="no results"
            />
        </div>
    );
};

export default NoResult;
