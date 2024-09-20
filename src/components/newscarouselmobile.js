import React, { useState, useEffect } from 'react';
import "../css/shoplanding.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

const NewsCarousel = ({ logos }) => {
  const logosPerSlide = 1; // Number of logos to display per slide

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % Math.ceil(logos.length / logosPerSlide));
    }, 3000); // Change this value to adjust autoplay interval

    return () => {
      clearInterval(interval);
    };
  }, [logos.length, logosPerSlide]);

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + Math.ceil(logos.length / logosPerSlide)) % Math.ceil(logos.length / logosPerSlide));
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % Math.ceil(logos.length / logosPerSlide));
  };

  const startIndex = currentSlideIndex * logosPerSlide;
  const endIndex = startIndex + logosPerSlide;
  const visibleLogos = logos.slice(startIndex, endIndex);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <Container>
      <div className="carousel-navigation">
        <button className="back-news" onClick={prevSlide}>
          <IoIosArrowBack style={{ height: "26px" }} />
        </button>
      </div>
      <div className="logo-carousel">
        <div className="newsslide-container">
          {visibleLogos.map((logo, index) => (
            <div key={index} className="logo-info">
              <a href={logo?.newsLink} target='_blank' rel="noopener noreferrer">
                <img src={logo?.img} alt={`Logo ${index}`} />
                <p className="news-carousel-description">{capitalizeFirstLetter(logo?.newsDescription)}</p>
              </a>
            </div>
          ))}
        </div>
        {/* Add navigation buttons and indicators */}
      </div>
      <div className="carousel-navigation">
        <button className="next-news" onClick={nextSlide}>
          <IoIosArrowForward style={{ height: "26px" }} />
        </button>
      </div>
      </Container>
  );
}

export default NewsCarousel;

const Container = styled.div`
 
  background-color: #ffffff;
  +-
  display: flex;
  padding-top: 60px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  max-width: 100%; /* Ensure the carousel doesn't exceed its container's width */
`;
