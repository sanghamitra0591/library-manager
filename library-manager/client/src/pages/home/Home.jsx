import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import thegoldenyears from "../../assets/images/bookscover/thegoldenyears.jpg";
import crescentmoon from "../../assets/images/bookscover/crescentmoon.jpg";
import fourstartsofdestiny from "../../assets/images/bookscover/fourstartsofdestiny.webp";
import spare from "../../assets/images/bookscover/spare.jpg";
import comeletsrun from "../../assets/images/bookscover/comeletsrun.jpg";
import asgoodasmyword from "../../assets/images/bookscover/asgoodasmyword.jpg";
import reflections from "../../assets/images/bookscover/reflections.jpg";
import justaspire from "../../assets/images/bookscover/justaspire.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomArrows from '../../components/slider/Slider';

import authorone from "../../../src/assets/images/authors/authorone.webp";
import authortwo from "../../../src/assets/images/authors/authortwo.webp";
import authorthree from "../../../src/assets/images/authors/authorthree.webp";
import authorfour from "../../../src/assets/images/authors/authorfour.jpeg";
import authorfive from "../../../src/assets/images/authors/authorfive.jpeg";
import authorsix from "../../../src/assets/images/authors/authorsix.webp";
import authorseven from "../../../src/assets/images/authors/authorseven.avif";
import authoreight from "../../../src/assets/images/authors/authoreight.avif";
import authornine from "../../../src/assets/images/authors/authornine.avif";
import authorten from "../../../src/assets/images/authors/authorten.avif";
import authoreleven from "../../../src/assets/images/authors/authoreleven.avif";
import authortwelve from "../../../src/assets/images/authors/authortwelve.webp";



const Home = () => {
  const navigate = useNavigate();
  
  const popularBooks = [
    {
      author: "Ruskin Bond",
      category: "novel",
      publishYear: "2017",
      quantity: 5,
      title: "The Golden Years",
      cover: thegoldenyears
    },
    {
      author: "Rabindranath Tagore",
      category: "fiction",
      publishYear: "2023",
      quantity: 4,
      title: "Crescent Moon",
      cover: crescentmoon
    },
    {
      author: "General Manoj Mukund Naravane",
      category: "history",
      publishYear: "2013",
      quantity: 7,
      title: "Four Stars of Destiny",
      cover: fourstartsofdestiny
    },
    {
      author: "J. R. Moehringer",
      category: "science",
      publishYear: "2019",
      quantity: 3,
      title: "Spare",
      cover: spare
    }, {
      author: "Ma. Subramanian",
      category: "novel",
      publishYear: "2021",
      quantity: 8,
      title: "Come! Let's Run",
      cover: comeletsrun
    },
    {
      author: "KM Chandrashekhar",
      category: "fiction",
      publishYear: "2006",
      quantity: 9,
      title: "As Good As My Word",
      cover: asgoodasmyword
    },
    {
      author: "Narayanan Vaghul",
      category: "science",
      publishYear: "2012",
      quantity: 7,
      title: "Reflections",
      cover: reflections
    },
    {
      author: "Ajai Chowdhry",
      category: "history",
      publishYear: "2016",
      quantity: 4,
      title: "Just Aspire",
      cover: justaspire
    },
  ]

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const authorResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };

  const authors = [
    {
      name: "Bhavik Sarkhedi",
      avatar: authorone
    },
    {
      name: "Arundhati Roy",
      avatar: authortwo
    },
    {
      name: "Sarita Chandra",
      avatar: authorthree
    },
    {
      name: "Amrita Pritam",
      avatar: authorfour
    },
    {
      name: "R.K. Narayan",
      avatar: authorfive
    },
    {
      name: "Aravind Adiga",
      avatar: authorsix
    },
    {
      name: "Morgan Housel",
      avatar: authorseven
    },
    {
      name: "Amish Tripathi",
      avatar: authoreight
    },
    {
      name: "Monika Halan",
      avatar: authornine
    },
    {
      name: "John Grishan",
      avatar: authorten
    },
    {
      name: "Ruskin Bond",
      avatar: authoreleven
    },
    {
      name: "Agatha Christie",
      avatar: authortwelve
    }
  ]

  return (
    <div className="home-container">
      <div className='banner slider-container'>
        <CustomArrows />
      </div>
      <div className="slider">
        <h2>Popular Books : </h2>
        <Carousel responsive={responsive}>
          {popularBooks.length > 0 && popularBooks.map(book => (
            <div key={book._id} className='bookCardHomeWrapper'>
              <div>
                <img src={book.cover} alt="bookcover" />
              </div>
              <div>
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Published Year: {book.publishYear}</p>
                <p>Category: {book.category}</p>
                <p>Available Quantity: {book.quantity}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="authorslider">
        <h2>Featured Authors : </h2>
        <Carousel responsive={authorResponsive}>
          {authors.length > 0 && authors.map(author => (
            <div key={author._id} className='authorCardHomeWrapper'>
              <div>
                <img src={author.avatar} alt="authorcover" />
              </div>
              <div>
                <h3>{author.name}</h3>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="main-content">
        <div className="features">
          <h2>Explore Our Collection</h2>
          <div className="feature-boxes">
            <div className="feature" onClick={() => navigate("/books")}>
              <h3>📚 Extensive Collection</h3>
              <p>Discover thousands of books across various genres.</p>
            </div>
            <div className="feature" onClick={() => navigate("/about")}>
              <h3>🌍 Community Events (Coming Soon)</h3>
              <p>Join us for workshops, readings, and more!</p>
            </div>
            <div className="feature" onClick={() => navigate("/about")}>
              <h3>💡 Study Spaces</h3>
              <p>Enjoy quiet and comfortable spaces for studying.</p>
            </div>
          </div>
        </div>

        <div className="call-to-action">
          <h2>Join Us Today!</h2>
          <p>Sign up to access exclusive resources and events.</p>
          <button className="join-button" onClick={() => navigate("/signup")}>Join Now</button>
        </div>
      </div>

      <div className="footer">
        <p>&copy; {new Date().getFullYear()} Library Management System</p>
      </div>
    </div>
  );
};

export default Home;