
import "../css/shipping.css";

import { Link } from 'react-router-dom';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Applpay from '../images/aplpy.png';
import Paypal from '../images/pypal.png';
import Applpaya from '../images/bigapp.png';
import Paypala from '../images/bigpay.png';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import FormContainer from '../skeleton/FormContainer';
import CheckoutStatus from '../skeleton/CheckoutStatus';
import { saveShippingAddress } from '../actions/cartActions';
import { refreshLogin, getUserDetails } from '../actions/userActions';

import { addItem, removeItem } from "../actions/cartActions";
import Message from "../skeleton/Message";
import LoginShop from './loginshop';


const Next = ({history,match,location}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems, shippingAddress } = cart;
	const [totalItems, setTotalItems] = useState(0);
  const productID = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; // fetch from the query string


  // get cart, userInfo and userdetails from redux store



	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error } = userDetails;
	// console.log(userDetails)

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);
	const [state, setState] = useState(shippingAddress.state);
	const [phoneNo, setPhoneNo] = useState(shippingAddress.phoneNo);
	const [apt, setApt] = useState(shippingAddress.apt);

	// fetch user details from the redux store
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);
	

	useEffect(() => {
		if (error && userInfo && !userInfo.isSocialLogin) {
		  const user = JSON.parse(localStorage.getItem("userInfo"));
		  user && dispatch(refreshLogin(user.email));
		}
	  }, [error, dispatch, userInfo]);
	
	  // add item to cart
	  useEffect(() => {
		if (productID) {
		  dispatch(addItem(productID, qty));
		}
	  }, [dispatch, productID, qty]);
	
	  // remove item from cart
	  const handleRemoveFromCart = (id) => {
		dispatch(removeItem(id));
	  };
	

	// update access token to a new ine using the refresh tokens
	useEffect(() => {
		if (error && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [error, dispatch, userInfo]);

	useEffect(() => {
		if (!(cartItems.length && userInfo)) {
			history.push('/');
		}
	}, [cartItems, history, userInfo]);

	useEffect(() => {
		if (cartItems) {
		  setTotalItems(cartItems.reduce((acc, item) => acc + item.qty, 0));
		}
	  }, [cartItems]);

	// save shipping address and move to payment screen
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			saveShippingAddress({
				address,
				city,
				postalCode,
				state,
				apt,
				phoneNo,
				country,
			})
		);
		history.push('/payment');
	};
	const clearCart = () => {
		localStorage.removeItem("cartItems");
		history.push("/cart");
	  };
	const toggleLogin = () => {
	  setIsOpen(!isOpen);
	}


	return (
		<div class="all-product">
			<section class="section2-products">
				<div class="container">
					<div class="prog-bar">
					<Link className="clr-dot" to="/cart"> Your Cart </Link> <i class="arrow right"></i><Link  className="clr-dot" to="/Shipping"> Contact and Shipping </Link><i class="arrow right"></i><Link  className="clr-dot" to="/payment"> Payment </Link> <i class="arrow right"></i><Link  className="clr-dot" to="/Summary"> Summary </Link>
					</div>
					<div class=" cont-act-cart col-sm-10">
						<div class="row">
							<div class="m-acc">
								<h4 class="pro-duct-your-cart" >Checkout</h4>
							</div>
							<div class="review-leave-ship">
								Express Checkout
							</div>
							<div id="ship-ing1" class="ship-sign">
							
								<div class="inline-buttons-ship">
								<input class="product-btn-story-cart-ship"
      type="button"
      value="SIGN IN"
      onClick={toggleLogin}
    />
	{isOpen && <LoginShop
      loginshop={<> </>}
      handleClose={toggleLogin}
    />}
									<a class="app-image" href="http://example/">  <img class="app-image" src={Applpay} ></img></a>
									<a class="app-image" href="http://example/"> <img class="app-image" src={Paypal} ></img></a>
								</div>
							</div>
							<div id="ship-ing2" class="ship-sign-pay">
							<div style={{ paddingBottom: "10px" }}>
	<a class="product-btn-story-cart-ship-pay" href="http://example/">SIGN IN</a>
</div>
<div style={{ paddingBottom: "10px" }}>
	<a class="app-image" href="http://example/">  <img class="appbig-image" src={Applpaya} ></img></a>
</div>
<div style={{ paddingBottom: "10px" }}>
	<a class="app-image" href="http://example/"> <img class="appbigs-image" src={Paypala} ></img></a>
</div>

</div>
							
						</div>
					</div>
					<div class="row">
						<div class="col-md-6 col-sm-12">
						<div class="review-leave-ship-pay">
								Shipping Information
							</div>
							<div id="product-11" class="single2-product">
								<div class="detail-ship">
									<div class="col">
										<input type="text" class="form-control-ship " placeholder="Email" id="fname" name="fname" value={userDetails?.user?.email} />
									</div>
									<br />
									<div class='join-now'>
										<input type="checkbox" />
										Join the (extra)Ordinary club for info and other
								    </div>
									<br />
									<div class="col-cvv">
										<input type="text" class="form-control-ship-exp " placeholder="First Name" id="fname" name="fname" value={userDetails?.user?.firstName}/>
										<input type="text" class="form-control-ship-exp " placeholder="Last Name" id="fname" name="fname" value={userDetails?.user?.lastName}/>
									</div>
									<br />

									<div class="col">
										<input type="text" class="form-control-ship " placeholder="Street Address" id="fname" name="address" value={address}
							required
							onChange={(e) => setAddress(e.target.value)} />
									</div>
									<br />

									<div class="col">
										<input type="text" class="form-control-ship " placeholder="Apt #,suit,etc.(optional)" id="fname" name="apt" value={apt}
							required
							onChange={(e) => setApt(e.target.value)} />
									</div>
									<br />
									<div class="col">
										<input type="text" class="form-control-ship " placeholder="City" id="fname" name="city" value={city}
							required
							onChange={(e) => setCity(e.target.value)} />
									</div>
									<br />
									<div class="col-cvv" >
										<input type="text" class="form-control-ship-exp " placeholder="State" id="fname" name="state" value={state}
							required
							onChange={(e) => setState(e.target.value)} />
										<input type="text" class="form-control-ship-exp " placeholder="Zip Code" id="fname" name="postalCode" value={postalCode}
							required
							onChange={(e) => setPostalCode(e.target.value)}/>
									</div>
									<br />
									<div class="col">
										<input type="text" class="form-control-ship " placeholder="Country/Region" id="fname" name="country" value={country}
							required
							onChange={(e) => setCountry(e.target.value)} />
									</div>
									<br />
									<div class="col">
										<input type="text" class="form-control-ship " placeholder="Phone Number" id="fname" name="phoneNo" value={phoneNo}
							required
							onChange={(e) => setPhoneNo(e.target.value)} />
									</div>
									<br />
									<div  class='join-now'>
										<input class="tik-tack" type="checkbox" />
										Join the (extra)Ordinary club for info and other
								</div>
									<br />
								</div>

							</div>

							<div class="row">                                               
							<div class="review-leave-ship-pay">
								Shipping Method
							</div>

							<div class="col-sm-12 col-md-11">
							<div class="boundry-wall">
							<div class="ship-method">
							<input class="radio-btn" type="radio"></input>
							<b>Standard</b>  <b style= {{float:"right" }}>$00.00</b>
							</div>
							
							<div class="type-method">
							
						     3-5 business days<br/>
						    Estimated: Jan 1 - Jan 6
							</div>
							</div>
							<br/>
							<div class="boundry-wall">
							<div class="ship-method">
							<input class="radio-btn" type="radio"></input>
							<b>Two-Day</b>< b style= {{float:"right" }}>$00.00</b>
							</div>
							
							<div class="type-method">
							
						    2 Business Days: Arrives Jan 2
							</div>
							</div>
							<br/>
							<div class="boundry-wall">
							<div class="ship-method">
							<input class="radio-btn" type="radio"></input>
							<b>Overnight</b>  <b style= {{float:"right" }}>$00.00</b>
							</div>
							
							
							<div class="type-method">
						    1 Business Day: Arrives by Jan 1
							</div>
							</div>
							</div>
							
						</div>
						</div>
					
							
							
						<div class="col-md-6 col-sm-12">


							<div class="review-leave-ship-pay-ord">
								In Your Cart
							</div>

							<div class="order-detail-1">
							<div class="row">
            {!cartItems.length ? (
					<Message>
						Your Cart is empty. <Link to='/' style={{textDecoration:"underline"}}>Go Back.</Link>{' '}
					</Message>
				) : (<>
              {/* <div class="col-md-6 col-sm-12">
                <div class="order-detail-11"> */}
                  {cartItems.map((item) => (
                    <div class="row" key={item.product}>
                     
                
                      <div class="col-4">
                        <div class=" cart-two-ship-pay">
                          <div class="arrow-cart-one-ship-pay">
                            <button class="sort-arrow-cart-ship">
                              {" "}
                              <button
                                style={{ cursor: "pointer", border: "none" }}
                                disabled={item.qty === 1}
                                onClick={() => {
                                  dispatch(
                                    addItem(item.product, Number(item.qty - 1))
                                  );
                                }}
                              >
                                {" "}
                                &lt;
                              </button>{" "}
                              &nbsp; {item?.qty} &nbsp;{" "}
                              <button
                                style={{ cursor: "pointer", border: "none" }}
                                onClick={() => {
                                  dispatch(
                                    addItem(item.product, Number(item.qty + 1))
                                  );
                                }}
                              >
                                &gt;
                              </button>
                            </button>
                          </div>
                        
                        </div>
                      </div>
                     
                    </div>
                  ))}
                {/* </div>
              </div> */}
              <div class="col-md-6 col-sm-12">
                <div id="product-21" class="single22-product">
                  <div class="cart-hr-line2">
              

                  </div>

                 
                </div>
              </div>
              
              </> )}
               
                </div>
							</div>
							<div id="con-tinue">
							<div class="row">
							<div  class="payment-button" >
									<a class="product-btn-story-cart-ship-pay-new" href="http://example/">Continue Shopping</a>
								</div>
								</div>
								</div>
							<div class="order-detail">
							<div class="row">
								<div class="sumup col-sm-10 col-md-12 ">
								<div class="review-leave-ship-pay-ord ">
									Summary
							</div>
								<div class="col-cnfm">
									<input type="text" class="form-control-ship-exp-cnfm " placeholder="Add a promo code" id="fname" name="fname" />
									<input class="product-btn-default-cnfm" type="submit" value="Apply" ></input>
								</div>
								</div>
								</div>
								<div class="sub-total-cnfm">
									<div class="cart-sub-hr-line">
										<hr ></hr>
									</div>
									<div class="order-total">
										<br />
												Subtotal
												<br />
												Discount
												<br />
												Shipping
												<br />
												Tax
												</div>
									<div class="amount-totl">
										<br />
						$00.00
						<br />
						$00.00
						<br />
						$00.00
						<br />
						$00.00
						<br />
									</div>
									<div class="cart-sub-hr-line">
										<hr ></hr>
									</div>
									<div class="sub-tt">
										Total
									</div>
									<div class="sub-tot">
										$00.00
									</div>
									<div class="sales-amt">
										1% of sales supports Veteran causes.
									</div>

									<div class="continue-btn">
										<input class="product-btn-default-cnfm-CON" type="submit" value="PROCEED TO PAYMENT" onClick={handleSubmit}></input>
									</div>

								</div>
							</div>
						</div>
					</div>

				</div>
			</section>

		</div>
	)
}

export default Next;