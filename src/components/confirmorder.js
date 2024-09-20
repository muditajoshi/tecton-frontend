import React from "react";
import BEGREAT from "../images/BEGREAT.png";
import "../css/confirmorder.css";
import { Link } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const Confirmorder = () => {
  const clearCart = () => {
    localStorage.removeItem("cartItems");
  };

  return (
    <div class="all-product-order">
      <ScrollToTop />
      <section class="section2-products">
        <div class="container">
          <div class="row justify-content-center ">
            <div class="col-md-10 col-lg-7">
              <div class="confm-order">
                <div class="head-order-cnfm">Order Confirmed!</div>
                <div class="thank-you-order">
                  Thank you for your order! You will receive an email shortly
                  confirming your order.
                </div>
                <div id="email-thank">
                  <div class="thank-you-order">
                    Join the (extra)Ordinary club for extra info & offers and
                    faster checkout!
                  </div>
                  <div class="a-l">
                    <input
                      class="product-btn-story-cart"
                      type="button"
                      value="SIGN UP"
                    />
                  </div>
                </div>
                <div id="email-ord">
                  <div id="email-ord" class="cnfm-bgreat">
                    <img class="pro-image" src={BEGREAT}></img>
                  </div>
                  <div class="live-life-order">
                    Live Life in High Definition.
                  </div>
                  <div></div>
                  <div class="shopping-con">
                    <Link to="/shop">
                      <input
                        class="product-btn-default-confirm"
                        type="submit"
                        onClick={clearCart}
                        value="CONTINUE SHOPPING"
                      ></input>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Confirmorder;
