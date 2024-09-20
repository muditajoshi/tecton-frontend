import React, { useState, useEffect } from 'react';
import "../css/shoplanding.css";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const NewsCarousel = ({ logos }) => {
    const logosPerSlide = 8; // Number of logos to display per slide

    const [visibleLogos, setVisibleLogos] = useState(logos.slice(0, logosPerSlide));

    const nextSlide = () => {
        setVisibleLogos(prevLogos => {
            const newLogos = [...prevLogos];
            const lastLogo = newLogos.pop();
            newLogos.unshift(lastLogo);
            return newLogos;
        });
    };

    const prevSlide = () => {
        setVisibleLogos(prevLogos => {
            const newLogos = [...prevLogos];
            const firstLogo = newLogos.shift();
            newLogos.push(firstLogo);
            return newLogos;
        });
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 9000); // Change this value to adjust autoplay interval

        return () => {
            clearInterval(interval);
        };
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }

    return (
        <Container>
             <div className="carousel-navigation">
             <button className="back-news" onClick={prevSlide}>
             <IoIosArrowBack style={{height:"26px"}} />
             </button>
             </div>
        <div className="logo-carousel">
            
            <div className="newsslide-container">
                {visibleLogos.map((logo, index) => (
                    <div key={index} className="logo-info">
                        <a href={logo?.newsLink} target='_blank'>
                            <img height="84px" width="340" src={logo?.img} alt={`Logo ${index}`} />
                            <p className="news-carousel-description" >{capitalizeFirstLetter(logo?.newsDescription)}</p>
                        </a>
                    </div>
                ))}
            </div>
             </div>
            
            

             <div className="carousel-navigation">
             <button className="next-news" onClick={nextSlide}>
             <IoIosArrowForward style={{height:"26px"}} />
             </button>
         </div>
         </Container>
        
    );
}

export default NewsCarousel;


const Container = styled.div`
  background-color: #ffffff;
display: flex;
padding-top:100px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  
`;