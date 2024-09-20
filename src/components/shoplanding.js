import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/shoplanding.css";
import USNEWS from "../images/newshop/USNEWS.png";
import preparedfoods from "../images/newshop/preparedfoods.png";
import forbes from "../images/newshop/forbes.png";
import Thunder from "../images/newshop/thunder.png";
import Shield from "../images/newshop/shield.png";
import Sugar from "../images/newshop/sugar.png";
import Cup from "../images/newshop/cup.png";
import yelloLine from "../images/newshop/yello_line.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Vector from "../images/newshop/Vector 29.png";
import Table from "./Table"
// import NewsCarousel from "./NewsCarousel/newscarousel";
import AmbasdorCarousel from "./ambasdorcarousel";
import NewsCarousel from "./newscarousel";
import Carousel from "./carousel";
import FirstCarousel from "./firstSectionProduct";
 import LogoCarousel from "./newscarouselmobile";
import OverlayEditSub from "../skeleton/OverlayEditSub";

import { SHA256 } from "crypto-js";
import Cookies from "js-cookie";
import ScriptTag from "react-script-tag";

const ShopLanding = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cjeventValue = urlParams.get("cjevent");
  const pageview = 0;

  //set cjevent cookie
  useEffect(() => {
    if (cjeventValue) {
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 13);
      // const domain = window.location.hostname === 'localhost' ? '' : 'test.tectonlife.com';

      const domain =
        window.location.hostname === "tectonlife.com"
          ? ".tectonlife.com"
          : ".test.tectonlife.com";
      const secure = window.location.protocol === "https:" ? true : false;
      const sameSite = "None";

      Cookies.set("cje", cjeventValue, {
        expires: expirationDate,
        domain: domain,
        secure: secure,
        sameSite: sameSite,
      });

      /*
       axios
       .post(`${process.env.REACT_APP_PROXY_URL}/api/cookieintegration`, {
         cjevent: cjeventValue,
       
       })
       .then((res) => {
         console.log(res);
        
       });
       */
    }
  }, []);

  const settings = {
    dots: false, // Show dots for navigation
    infinite: true, // Loop the carousel
    arrows: true, // Show next/prev arrows
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll on arrow click
  };

  const [logos, setLogos] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/news/get-all-news`)
      .then((res) => {
        // console.log(res.data.news);
        setLogos(res.data.news);
      });
  }, []);
  const [slideItems, setAllAmbassadors] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/carousel/get-all-carousel`)
      .then((res) => {
        console.log(res.data.data);
        setAllAmbassadors(res.data.data);
      });
  }, []);

  //set the cjevent cookie
  const [cjevent, setCjevent] = useState(null);

  useEffect(() => {
    const cjeventValue = Cookies.get("cje");
    setCjevent(cjeventValue);
  }, []);

  const [productsLoaded , setProductsLoaded] = useState(false)
  const [loadedProductsValues , setLoadedProductValues] = useState();

   
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/products`)
      .then((res) => {setProductsLoaded(true);setLoadedProductValues(res.data.products)});
  }, []);

  return (
    <div>
      <div className="new_shop_desktop">
        <section className="product&description">
          <div className="shoplanding__container">
            <div className="shoplanding__container__left">
              <div className="shoplandingleft_first">
                <div className="shoplanding__container__left_heading">
                  KETONE POWERED <br />
                  HEALTH BEVERAGE
                </div>
              </div>
              <div className="shoplanding__container__left_heading_line_first">
                <img src={yelloLine} />
              </div>
              <div className="shoplandingleft2">
                <div className="shoplanding__container__left_heading_subheading">
                  Fuel your body with nature-identical ketones. No sugar. No
                  caffeine. No BS.
                </div>
                <div className="shoplanding__container__left_heading_foursection">
                  <div className="flex-div">
                    <div className="flex-div_content">
                      <div className="Vetor-img">
                        <img src={Vector} />
                      </div>
                      <div className="shoplanding__container__left_heading_foursection_one">
                        Elevate Mental <br />
                        Focus
                      </div>
                    </div>
                    <div className="flex-div_content">
                      <div className="Vetor-img">
                        <img src={Vector} />
                      </div>
                      <div className="shoplanding__container__left_heading_foursection_one">
                        Aid Muscle <br /> Recovery
                      </div>
                    </div>
                  </div>
                  <div className="flex-div">
                    <div className="flex-div_content">
                      <div className="Vetor-img">
                        <img src={Vector} />
                      </div>
                      <div className="shoplanding__container__left_heading_foursection_one">
                        Boost Physical <br /> Endurance
                      </div>
                    </div>
                    <div className="flex-div_content">
                      <div className="Vetor-img">
                        <img src={Vector} />
                      </div>
                      <div
                        className="shoplanding__container__left_heading_foursection_one surpassimg"
                       
                      >
                        Suppress{""} <br /> Cravings
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <hr />
                </div>

                <div className="shoplanding__container__left_heading_description">
                  <div className="shoplanding__container__left_heading_description_heading">
                    What is Tecton ?
                  </div>
                  <div className="shoplanding__container__left_heading_description_content">
                    Tecton is the only ketone beverage that includes 10g of
                    nature-identical
                    <br />
                    ketones in every serving, made with the same molecular
                    structure as
                    <br />
                    the ketones your body produces naturally.
                    <br />
                  </div>
                </div>
                <div className="shoplanding__container__left_heading_img">
                  <div className="shoplanding__container__left_heading_img_icon_parent_div">
                    <div className="shoplanding__container__left_heading_img_icon">
                      <img src={Thunder} />
                    </div>
                    <div className="icon_text">
                      10G OF <br /> KETONES
                    </div>
                  </div>
                  
                  <div className="shoplanding__container__left_heading_img_icon_parent_div">
                    <div className="shoplanding__container__left_heading_img_icon  sheildimage">
                      <img src={Shield} />
                    </div>
                    <div className="icon_text">
                      SAFE AT <br /> HIGH DOSAGE
                    </div>
                  </div>
                  <div className="shoplanding__container__left_heading_img_icon_parent_div">
                    <div className="shoplanding__container__left_heading_img_icon">
                      <img src={Sugar} />
                    </div>
                    <div className="icon_text">
                      ZERO <br /> SUGAR
                    </div>
                  </div>
                  <div className="shoplanding__container__left_heading_img_icon_parent_div">
                    <div className="shoplanding__container__left_heading_img_icon">
                      <img src={Cup} />
                    </div>
                    <div className="icon_text">
                      ZERO <br /> CAFFEINE
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shoplanding__container__right shoplandingright">
              <div className="product_carousel_section1">
              {productsLoaded?(<FirstCarousel loadedProductsValues={loadedProductsValues} />):(<><OverlayEditSub/></>)}
              </div>
            </div>
          </div>
        </section>
        <section className="news_Carousel">
        {logos ? <NewsCarousel logos={logos} /> : <></>}
        </section>
        <section className="product_Carousel">
          <div className="shoplandingleft_productcarousel">
            <div className="shoplanding__container__left_heading">
              UNLEASH YOUR <br />
              EXTRAORDINARY
            </div>
          </div>
          <div className="shoplanding__container__left_heading_line">
            <img src={yelloLine} />
          </div>
          <Carousel />
        </section>
        <section className="ketones_learnmore">
          <div className="ketones_learnmore_background">
            <div className="ketones_learnmore_background_content">
              <div>
                <div className="ketones_learnmore_background_heading">
                  KETONES
                </div>
                <div className="ketones_learnmore_background_subheading1">
                  THE 4TH MACRONUTRIENT
                </div>
                <div className="ketones_learnmore_background_subheading">
                  Our ancestors used to access ketones frequently because they
                  didn’t <br /> eat as much or as often as we do today, and they
                  certainly didn’t eat <br /> processed carbs. Today, however,
                  most humans are ketone-deprived,
                  <br /> meaning they are unable to achieve their extraordinary
                  potential.
                  <br /> Thanks to exogenous ketones, that can all change (for
                  the better).
                </div>
                <div className="ketones_button_learnmore">
                 <a href="https://blog.tectonlife.com/benefits-of-exogenous-ketones/"><button className="ketones_learnmore_background_button">
                    LEARN MORE
                  </button>
                  </a>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </section>
        <section className="fuel_your_potential">
          <div className="fuel_your_potential_background">
            <div className="fuel_your_potential_background_content">
              <div className="fuel_your_potential_background_heading">
                FUEL YOUR POTENTIAL
              </div>
            </div>
            <div className="shoplanding__container__left_heading_line">
              <img src={yelloLine} />
            </div>
            <div className="fuel_your_potential_background_content2">
              <div className="fuel_your_potential_background_subheading">
                Ketones are nature’s optimal fuel. The forgotten fourth macro.
                The human body
                <br />
                can produce and use up to 300 grams of ketones per day.
                <br />
                <br />
                But, thanks to industrialized food and processed carbs stuffed
                into everything
                <br />
                we eat, we have had to adapt to glucose.
                <br />
              </div>
              <div className="fuel_your_potential_button_learnmore">
              <a href="https://blog.tectonlife.com/pkstudy/">  <button className="fuel_your_potential_background_button">
                  MAYO CLINIC ANALYSIS
                </button></a>
              </div>
            </div>
          </div>
        </section>
        <section className="comparison_table">
          <div className="shoplanding">
            <div className="shoplanding__container__left_heading">
              OPTIMIZED ENERGY
            </div>
          </div>

          <div className="shoplanding__container__left_heading_line">
            <img src={yelloLine} />
          </div>
          <div className="shoplanding_table">
          <Table/> 
          </div>
        </section>
        <section className="ambassador_Carousel">
          <div className="ambsliderContainer">
            <Slider {...settings}>
              {slideItems.map((item, index) => (
                <AmbasdorCarousel key={index} {...item} />
              ))}
            </Slider>
          </div>
        </section>
      </div>
<div className="new_shop_ipad">
<section>
  <div className="ipad-first-Section" >
<div className="shoplanding__container__left">
              <div className="shoplandingleft-ipad">
                <div className="shoplanding__container__left_heading">
                  KETONE POWERED <br />
                  HEALTH BEVERAGE
                </div>
              </div>
              <div className="shoplanding__container__left_heading_line">
                <img src={yelloLine}  style={{width:"200px"}}/>
              </div>
              <div className="shoplandingleft2-ipad">
                <div className="shoplanding__container__left_heading_subheading">
                  Fuel your body with nature-identical ketones. No sugar. No
                  caffeine. No BS.
                </div>
                <div className="shoplanding__container__left_heading_foursection">
                  <div className="flex-div">
                    <div className="flex-div_content">
                      <div className="Vetor-img">
                        <img src={Vector} />
                      </div>
                      <div className="shoplanding__container__left_heading_foursection_one">
                        Elevate Mental <br />
                        Focus
                      </div>
                    </div>
                    <div className="flex-div_content">
                      <div className="Vetor-img">
                        <img src={Vector} />
                      </div>
                      <div className="shoplanding__container__left_heading_foursection_one">
                        Aid Muscle <br /> Recovery
                      </div>
                    </div>
                  </div>
                  <div className="flex-div">
                    <div className="flex-div_content">
                      <div className="Vetor-img">
                        <img src={Vector} />
                      </div>
                      <div className="shoplanding__container__left_heading_foursection_one">
                        Boost Physical <br /> Endurance
                      </div>
                    </div>
                    <div className="flex-div_content">
                      <div className="Vetor-img">
                        <img src={Vector} />
                      </div>
                      <div
                        className="shoplanding__container__left_heading_foursection_one"
                        style={{ paddingRight: "20px" }}
                      >
                        Suppress{""} <br /> Cravings
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <hr />
                </div>

                <div className="shoplanding__container__left_heading_description">
                  <div className="shoplanding__container__left_heading_description_heading">
                    What is Tecton ?
                  </div>
                  <div className="shoplanding__container__left_heading_description_content">
                    Tecton is the only ketone beverage that includes 10g of
                    nature-identical
                    <br />
                    ketones in every serving, made with the same molecular
                    structure as
                    <br />
                    the ketones your body produces naturally.
                    <br />
                  </div>
                </div>
                <div className="shoplanding__container__left_heading_img">
                  <div>
                    <div className="shoplanding__container__left_heading_img_icon">
                      <img src={Thunder} />
                    </div>
                    <div className="icon_text">
                      10G OF <br /> KETONES
                    </div>
                  </div>
                  <div>
                    <div className="shoplanding__container__left_heading_img_icon sheildimage">
                      <img src={Shield} />
                    </div>
                    <div className="icon_text">
                      SAFE AT <br /> HIGH DOSAGE
                    </div>
                  </div>
                  <div>
                    <div className="shoplanding__container__left_heading_img_icon">
                      <img src={Sugar} />
                    </div>
                    <div className="icon_text">
                      ZERO <br /> SUGAR
                    </div>
                  </div>
                  <div>
                    <div className="shoplanding__container__left_heading_img_icon">
                      <img src={Cup} />
                    </div>
                    <div className="icon_text">
                      ZERO <br /> CAFFEINE
                    </div>
                  </div>
                </div>
              </div>
            </div>
 <div className="shoplanding__container__right shoplandingright-ipad">
              <div className="product_carousel_section1">
              {productsLoaded?(<FirstCarousel loadedProductsValues={loadedProductsValues} />):(<></>)}
              </div>
            </div>
            </div>
</section>
<section className="news_Carousel">
          {logos ? <NewsCarousel logos={logos} /> : <></>}
        </section>
        <section className="product_Carousel">
          <div className="shoplandingleft-ipad">
            <div className="shoplanding__container__left_heading-ipad">
              UNLEASH YOUR <br />
              EXTRAORDINARY
            </div>
          </div>
          <div className="shoplanding__container__left_heading_line-ipad">
            <img src={yelloLine} />
          </div>
          <Carousel />
        </section>
        <section className="ketones_learnmore">
          <div className="ketones_learnmore_background_mobile"></div>
          <div className="ketones_learnmore_background_c">
            <div className="ketones_learnmore_background_subheading1">
                THE 4TH MACRO
              </div>
              </div>
              <img src={yelloLine}  />
              <div className="ketones_learnmore_background_c">
              <div className="ketones_learnmore_background_subheading">
                Our ancestors used to access ketones frequently because they
                didn’t eat as much or as often as we do today, and they
                certainly didn’t eat processed carbs. Today, however, most
                humans are ketone-deprived, meaning they are unable to achieve
                their extraordinary potential. Thanks to exogenous ketones, that
                can all change (for the better).
              </div>
              <div className="ketones_button_learnmore">
              <a href="https://blog.tectonlife.com/benefits-of-exogenous-ketones/"> <button className="ketones_learnmore_background_button">
                  LEARN MORE
                </button></a>
              </div>
            </div>
          
        </section>
        <section className="fuel_your_potential">
          <div className="fuel_your_potential_background">
            <div className="fuel_your_potential_background_content new-ipad-fuel" >
              
              <div className="fuel_your_potential_background_heading">
                FUEL YOUR POTENTIAL
              </div>
              </div>
              <img src={yelloLine} />
              <div className="fuel_your_potential_background_content">
              <div className="fuel_your_potential_background_subheading">
                Ketones are nature’s optimal fuel. The forgotten fourth macro.
                The human body can produce and use up to 300 grams of ketones
                per day.
                <br />
                <br />
                But, thanks to industrialized food and processed carbs stuffed
                into everything we eat, we have had to adapt to glucose.
                <br />
              </div>
              <div className="fuel_your_potential_button_learnmore">
              <a href="https://blog.tectonlife.com/pkstudy/">  <button className="fuel_your_potential_background_button">
                  MAYO CLINIC ANALYSIS
                </button></a>
              </div>
            </div>
          </div>
        </section>
        <section className="comparison_table">
          <div className="shoplandingleft-ipad">
            <div className="shoplanding__container__left_heading-ipad">
              OPTIMIZED ENERGY
            </div>
          </div>

          <div className="shoplanding__container__left_heading_line-ipad">
            <img src={yelloLine} />
          </div>
          <div className="shoplanding_table">
           <Table/>
          </div>
        </section>
        <section className="ambassador_Carousel">
          <div className="ambsliderContainer">
            <Slider {...settings}>
              {slideItems.map((item, index) => (
                <AmbasdorCarousel key={index} {...item} />
              ))}
            </Slider>
          </div>
        </section>
</div>
      <div className="new_shop_mobile">
        <section className="product_carousel_description_mobile">
          <div className="mobile_container">
            <div className="product_carousel_section_mobile">
            {productsLoaded?(<FirstCarousel loadedProductsValues={loadedProductsValues} />):(<></>)}
            </div>
          </div>
          <div>
            <div className="shoplandingleft">
              <div className="shoplanding__container__left_heading">
                KETONE POWERED <br />
                HEALTH BEVERAGE
              </div>
            </div>
            <div className="shoplanding__container__left_heading_line">
              <img src={yelloLine} />
            </div>
          </div>
          <div className="shoplandingleft2">
            <div className="shoplanding__container__left_heading_subheading">
              Fuel your body with nature-identical ketones. No sugar. No
              caffeine. No BS.
            </div>
            <div className="shoplanding__container__left_heading_foursection">
              <div className="flex-div_content">
                <div className="Vetor-img">
                  <img src={Vector} />
                </div>
                <div className="shoplanding__container__left_heading_foursection_one">
                  Elevate Mental Focus
                </div>
              </div>
              <div className="flex-div_content">
                <div className="Vetor-img">
                  <img src={Vector} />
                </div>
                <div className="shoplanding__container__left_heading_foursection_one">
                  Aid Muscle Recovery
                </div>
              </div>

              <div className="flex-div_content">
                <div className="Vetor-img">
                  <img src={Vector} />
                </div>
                <div className="shoplanding__container__left_heading_foursection_one">
                  Boost Physical Endurance
                </div>
              </div>
              <div className="flex-div_content">
                <div className="Vetor-img">
                  <img src={Vector} />
                </div>
                <div className="shoplanding__container__left_heading_foursection_one">
                  Suppress Cravings
                </div>
              </div>
            </div>
            <div>
              <hr />
            </div>
            <div className="shoplanding__container__left_heading_description">
              <div className="shoplanding__container__left_heading_description_heading">
                What is Tecton ?
              </div>
              <div className="shoplanding__container__left_heading_description_content">
                Tecton is the only ketone beverage that includes 10g of
                nature-identical ketones in every serving, made with the same
                molecular structure as the ketones your body produces naturally.
                <br />
              </div>
            </div>
            <div className="shoplanding__container__left_heading_img">
              <div>
                <div className="shoplanding__container__left_heading_img_icon">
                  <img src={Thunder} />
                </div>
                <div className="icon_text">
                  10G OF <br /> KETONES
                </div>
              </div>
              <div>
                <div className="shoplanding__container__left_heading_img_icon sheildimage">
                  <img src={Shield} />
                </div>
                <div className="icon_text">
                  SAFE AT <br /> HIGH DOSAGE
                </div>
              </div>
            </div>
            <div className="shoplanding__container__left_heading_img">
              <div>
                <div className="shoplanding__container__left_heading_img_icon">
                  <img src={Sugar} />
                </div>
                <div className="icon_text">
                  ZERO <br /> SUGAR
                </div>
              </div>
              <div>
                <div className="shoplanding__container__left_heading_img_icon">
                  <img src={Cup} />
                </div>
                <div className="icon_text">
                  ZERO <br /> CAFFEINE
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="new_Carousel">
        {logos ? <LogoCarousel logos={logos} /> : <></>}
        </section>
        <section className="product_Carousel">
          <div className="shoplandingleft">
            <div className="shoplanding__container__left_heading">
              UNLEASH YOUR <br />
              EXTRAORDINARY
            </div>
          </div>
          <div className="shoplanding__container__left_heading_line">
            <img src={yelloLine} />
          </div>
          <Carousel />
        </section>
        <section className="ketones_learnmore">
          <div className="ketones_learnmore_background_mobile"></div>
          <div className="ketones_learnmore_background_content">
            <div>
              <div className="ketones_learnmore_background_subheading1">
                THE 4TH MACRO
              </div>
              <img src={yelloLine} style={{ width: "250px" }} />
              <div className="ketones_learnmore_background_subheading">
                Our ancestors used to access ketones frequently because they
                didn’t eat as much or as often as we do today, and they
                certainly didn’t eat processed carbs. Today, however, most
                humans are ketone-deprived, meaning they are unable to achieve
                their extraordinary potential. Thanks to exogenous ketones, that
                can all change (for the better).
              </div>
              <div className="ketones_button_learnmore">
              <a href="https://blog.tectonlife.com/benefits-of-exogenous-ketones/"> <button className="ketones_learnmore_background_button">
                  LEARN MORE
                </button></a>
              </div>
            </div>
          </div>
        </section>
        <section className="fuel_your_potential">
          <div className="fuel_your_potential_background">
            <div className="fuel_your_potential_background_content">
              <div className="fuel_your_potential_background_heading">
                FUEL YOUR <br /> POTENTIAL
              </div>
              <img src={yelloLine} style={{ width: "250px" }} />
              <div className="fuel_your_potential_background_subheading">
                Ketones are nature’s optimal fuel. The forgotten fourth macro.
                The human body can produce and use up to 300 grams of ketones
                per day.
                <br />
                <br />
                But, thanks to industrialized food and processed carbs stuffed
                into everything we eat, we have had to adapt to glucose.
                <br />
              </div>
              <div className="fuel_your_potential_button_learnmore">
              <a href="https://blog.tectonlife.com/pkstudy/">   <button className="fuel_your_potential_background_button">
                  MAYO CLINIC ANALYSIS
                </button></a>
              </div>
            </div>
          </div>
        </section>
        <section className="comparison_table">
          <div className="shoplandingleft">
            <div className="shoplanding__container__left_heading">
              OPTIMIZED ENERGY
            </div>
          </div>

          <div className="shoplanding__container__left_heading_line">
            <img src={yelloLine} />
          </div>
          <div className="shoplanding_table">
            <Table/>
          </div>
        </section>
        <section className="ambassador_Carousel">
          <div className="ambsliderContainer">
            <Slider {...settings}>
              {slideItems.map((item, index) => (
                <AmbasdorCarousel key={index} {...item} />
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShopLanding;
