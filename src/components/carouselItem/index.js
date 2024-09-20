import React from "react";
import styled from "styled-components";
import "./Carousel.css";
import StarRatings from 'react-star-ratings';
import { useHistory } from "react-router-dom";



const CarouselItem = ({ product }) => {
  const history = useHistory();
  return (
    <div className="new-carousel-box-div">
    
    <Container className="project my_project_styling">
    <a href={`/product/${product?._id}`}>
      <div className="project_header my_project_header">
        <span>
          <p className="project_header_p">12 fl oz Ketone Hydration</p>
        </span>
        <span>
          <h5 className="project_header_heading">{product?.name}</h5>
        </span>

        {/*  reviews rating detailing .... */}

         <div className="reviewsratingmaincarousel">
            <span>
              <StarRatings
                rating={product?.rating}
                starRatedColor="orange"
                // changeRating={ratingChanged}

                numberOfStars={5}
                starDimension="15px"
                starSpacing="3px"
              />
            </span>
            <div className="numericrating">
              {" "}
              <span>
                {product?.rating?.toFixed(1) == 1
                  ? product?.rating?.toFixed(1) + " " + ""
                  : product?.rating?.toFixed(1) + " " + ""}
              </span>
            </div>
          </div>

        {/* Susbcription detailing ... */}

        <div className="subscription-details-note">
          {product?.subscription ? (
                            <span style={{ color: "#6dbe4b", fontSize: "12px" }}>
                                *Subscribe & Save Up To 12%
                            </span>
                        ) : (
                            <span style={{ color: "red", fontSize: "12px" }}>
                                *Subscription currently unavailable for 4-pack
                            </span>
                        )}
          </div>
      </div>
      <div className="project_image_div">
        <img src={product?.image}  alt="loading..." className="project_img"></img>
      </div>
      <div className="project_footer_div">
        <div className="footer_price_div">
          <span className="footer_price_text">Price</span>
          <span className="footer_price_number">
            <strong className="doller_symbol">$</strong>
            {product?.price}
          </span>
        </div>
        <div className="footer_btn_div">
        <a href={`/product/${product?._id}`}>
          <button className="footer_btn" style={{ cursor: "pointer" }} onClick={()=>{history.push(`/product/${product?._id}`)}}>
            SHOP NOW
          </button>
          </a>
        </div>
      </div>
      </a>
    </Container>
  
    </div>
  );
};

export default CarouselItem;

const Container = styled.div`
  background-color: #ffffff;
  
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  
`;