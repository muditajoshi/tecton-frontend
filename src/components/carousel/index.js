import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import CarouselItem from "../carouselItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import Glacier from "../../images/newshop/Glacier Magma mixed 4 pack 2023 (2) 2 (2).png";
import Glacier2 from "../../images/newshop/Glacier Magma mixed 4 pack 2023 (2) 2 (3).png";
import "./Carousel.css";

var settings = {
  className: "center",
  centerMode: true,
  centerPadding: "-20px",
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        centerPadding: "0px",
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        centerMode: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        centerMode: true,
        centerPadding: "0px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};
const Carousel = () => {
  const arrowRef = useRef(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      image: { Glacier },
      name: "Product 1",
      rating: 4.5,
      price: 20,
    },
    {
      id: 2,
      image: Glacier2,
      name: "Product 2",
      rating: 3.8,
      price: 20,
    },
    {
      id: 3,
      image: Glacier,
      name: "Product 3",
      rating: 4.2,
      price: 20,
    },
    {
      id: 4,
      image: Glacier2,
      name: "Product 4",
      rating: 3.7,
      price: 20,
    },
    {
      id: 5,
      image: Glacier,
      name: "Product 5",
      rating: 4.8,
      price: 20,
    },
  ]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_PROXY_URL}/api/products`).then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  return (
    <Container >
      <Slide className="slide">
        <div className="carousel-navigation-main">
          <button
            className="back-news-main"
            onClick={() => arrowRef.current.slickPrev()}
          >
            <IoIosArrowBack style={{ height: "26px" }} />
          </button>
        </div>
        {/* <div className="product-carousel-arrow">
          <button onClick={() => arrowRef.current.slickPrev()}  className="back-arrow-product">
            <IoIosArrowBack />
          </button>
          </div> */}
        <div>
          <Slider ref={arrowRef} {...settings}>
            {products &&
              products.map((product) => {
                return <CarouselItem product={product} key={product.id} />;
              })}
          </Slider>
        </div>
        <div className="carousel-navigation-main">
          <button
            className="next-news-main"
            onClick={() => arrowRef.current.slickNext()}
          >
            <IoIosArrowForward style={{ height: "26px" }} />
          </button>
        </div>
        {/* <div className="product-carousel-arrow">
          <button onClick={() => arrowRef.current.slickNext()} className="next-arrow-product">
            <IoIosArrowForward />
          </button>
        </div> */}
      </Slide>
    </Container>
  );
};

export default Carousel;

const Container = styled.div`
margin: 0 auto;
  width: 100%;
  padding: 0rem 0;
  max-width: 1399px;
  position: relative;

  @media (max-width: 1500px) {
    max-width: 1150px;
  }

  @media (min-width: 1800px) and (max-width: 2200px) {
    max-width: 1550px;
  }
  
`;
const Slide = styled.div``;
const Buttons = styled.div`

  


  }
`;
