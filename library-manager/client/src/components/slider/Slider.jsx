import React from "react";
import Slider from "react-slick";
import homebannerone from "../../assets/images/homebannerone.jpeg";
import homebannertwo from "../../assets/images/homebannertwo.webp";
import homebannerthree from "../../assets/images/homebannerthree.jpg";
import "./Slider.css"

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                top: "50%",
                right: "30px",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "#fff",
                fontSize: "24px",
                cursor: "pointer"
            }}
            onClick={onClick}
        >
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                top: "50%",
                left: "30px",
                transform: "translateY(-50%)",
                zIndex: 1,
                color: "#fff",
                fontSize: "24px",
                cursor: "pointer"
            }}
            onClick={onClick}
        >
        </div>
    );
}

function CustomArrows() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div className='carouselCard'>
                    <img src={homebannerone} alt='bannerone' />
                </div>
                <div className='carouselCard'>
                    <img src={homebannertwo} alt='bannertwo' />
                </div>
                <div className='carouselCard'>
                    <img src={homebannerthree} alt='bannerthree' />
                </div>
            </Slider>
        </div>
    );
}

export default CustomArrows;















































// import React, { Component } from "react";
// import Slider from "react-slick";
// import homebannerone from "../../assets/images/homebannerone.jpeg";
// import homebannertwo from "../../assets/images/homebannertwo.webp";
// import homebannerthree from "../../assets/images/homebannerthree.jpeg";

// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "block", background: "#6F4E37", width: "40px", height: "40px", placeItems: "center", placeContent: "center", borderRadius: "50%" }}
//             onClick={onClick}
//         />
//     );
// }

// function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "block", background: "#6F4E37", width: "40px", height: "40px", placeItems: "center", placeContent: "center", borderRadius: "50%" }}
//             onClick={onClick}
//         />
//     );
// }

// function CustomArrows() {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplaySpeed: 2000,
//         autoplay: true,
//         nextArrow: <SampleNextArrow />,
//         prevArrow: <SamplePrevArrow />
//     };
//     return (
//         <div className="slider-container">
//             <Slider {...settings}>
//                 <div className='carouselCard'>
//                     <img src={homebannerthree} alt='bannerone' />
//                 </div>
//                 <div className='carouselCard'>
//                     <img src={homebannertwo} alt='bannertwo' />
//                 </div>
//                 <div className='carouselCard'>
//                     <img src={homebannerone} alt='bannerthree' />
//                 </div>
//             </Slider>
//         </div>
//     );
// }

// export default CustomArrows;
