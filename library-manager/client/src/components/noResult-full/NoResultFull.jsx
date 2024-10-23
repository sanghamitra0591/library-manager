import React from "react";
import "./NoResultFull.css"
import noResultsImage from "../../assets/images/no-result-found.png"

const NoResultFull = () => {
    return (
        <div className="noResultsWrapperFull">
            <img
                src={noResultsImage}
                alt="no results"
            />
        </div>
    );
};

export default NoResultFull;
