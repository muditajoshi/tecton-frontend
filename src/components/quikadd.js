
import "../css/quikadd.css";

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactStars from "react-rating-stars-component";
import { faTimes } from '@fortawesome/react-fontawesome';


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	Card,
	Button,
	ListGroup,
	Form,
	FloatingLabel,
} from 'react-bootstrap';
// import ImageMagnifier from '../components/ImageMagnifier'; // to magnify image on hover
import Rating from '../skeleton/Rating';
import Meta from '../skeleton/Meta';
import Loader from '../skeleton/Loader';
import Message from '../skeleton/Message';
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import { listMyOrders } from '../actions/orderActions';
import { refreshLogin, getUserDetails } from '../actions/userActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import getDateString from '../utils/getDateString';


const QuickAdd =({close,match,history,productData})=> {
	
	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(0);
	const [review, setReview] = useState('');
	const [allReviews, setAllReviews] = useState([]);
	const [hasOrderedItem, setHasOrderedItem] = useState(false); // bool to check if the user has ordered this product
	const [showReviewForm, setShowReviewForm] = useState(false); // bool to decide whether to show the review form or not
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	const productCreateReview = useSelector(
		(state) => state.productCreateReview
	);
	const {
		loading: loadingCreateReview,
		success: successCreateReview,
		error: errorCreateReview,
	} = productCreateReview;

	const orderListUser = useSelector((state) => state.orderListUser);
	const { orders } = orderListUser;

	// fetch user login info
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// refresh the access tokens for accessing user details
	useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);

	useEffect(() => {
		dispatch(listMyOrders());
	}, [dispatch]);

	// add a new review, and reset the stored product review in the redux store
	useEffect(() => {
		if (successCreateReview) {
			window.alert('Review Submitted!!');
			setRating(0);
			setReview('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(match?.params?.id));
	}, [match, dispatch, successCreateReview]);

	useEffect(() => {
		if (product && product.reviews && userInfo) {
			let flag = 0; // to check if this user has already reviewed this product
			for (let review of product.reviews) {
				if (review.user === userInfo.id) {
					flag = 1;
					break;
				}
			}
			flag ? setShowReviewForm(false) : setShowReviewForm(true);
		} else {
			setShowReviewForm(true);
		}
	}, [product, userInfo]);

	useEffect(() => {
		if (orders && orders.length) {
			let flag = 0; // to check is this user has ordered this item
			for (let obj of orders) {
				for (let ele of obj.orderItems) {
					if (ele.product.toString() === match.params.id) {
						flag = 1;
						break;
					}
				}
			}
			flag ? setHasOrderedItem(true) : setHasOrderedItem(false);
		} else {
			setHasOrderedItem(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orders]);

	// arrange all reviews in reverse chronological order
	useEffect(() => {
		if (product && product.reviews) {
			const sortedArr = product.reviews.sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
			setAllReviews(sortedArr);
		}
	}, [product]);

	const handleAddToCart = (e) => {
		history.push(`/cart/${match.params.id}?qty=${quantity}`);
	};

	const handleReviewSubmit = (e) => {
		dispatch(
			createProductReview(match.params.id, {
				rating,
				review,
			})
		);
	};
	const ratingChanged = (newRating) => {
		// console.log(newRating);
    };
	document.getElementById("star-icon")

	const[cane1,setcane1]=useState("white");
	const[cane2,setcane2]=useState("white");
	const[cane3,setcane3]=useState("white");
	
	// console.log(productData)
	
	const handlecolour1=()=>{
	setcane1("orange");
	setcane2("white");
	setcane3("white")
	}
	
	const handlecolour2=()=>{
		setcane2("orange");
	setcane1("white");
	setcane3("white")
	}
	
	const handlecolour3=()=>{
		setcane3("orange");
	setcane2("white");
	setcane1("white")
	}


	return (
		<div className="popup-box-quick">
		{/* <aside className='login' > */}
		<div className="box-quick">
		<div class="all-product">
			
			<div class="container">
			<div class=" cont-act-for col-sm-8">
                        <div class="row">
                            <div class="m-acc">
                                <h3 class="pro-duct-quick" >Quick Add</h3>
								
							<span className="close-icon" onClick={() => close()} > x</span>
						
                            </div>
							
							</div>
							
							</div>
				<div class="row">

				
					<div class="col-sm-6">
						<div id="product-11" class="single2-product">
							<div style={{textAlign:"center"}} class="part-quick">
							<img style={{width:"100%",marginLeft:"",marginTop:"10px"}} src={productData?.image} alt="" />
							</div>

						</div>
					</div>



					<div class="col-sm-6">
						<div id="product-2" class="single22-product">

							<div class="pro-part1">
								<div class="pro-duct-only-quick" >
									<h3 >{productData?.name}</h3>   </div>
								<div class="product-k">{productData?.category}</div>

								<div style={{ paddingBottom: "40px" }}>
									<div class="star-icon">

										<ReactStars
											count={5}
											onChange={ratingChanged}
											size={24}
											isHalf={true}
											emptyIcon={<i className="far fa-star"></i>}
											halfIcon={<i className="fa fa-star-half-alt"></i>}
											fullIcon={<i className="fa fa-star"></i>}
											activeColor="#ffd700"
										/>


									</div>
								</div>
								<div class="product-old-p">Flavour</div>

								<FontAwesomeIcon icon={faCircle} style={{ color: "#8080802e", size: "30px", paddingRight: "5px" }} /><FontAwesomeIcon icon={faCircle} style={{ color: "#8080802e", size: "2px" }} />
								<div class="glow-m">{product?.description} </div>
								<div class="inline-buttons">
									<p>
								
										<span class="one-third button" style={{cursor:"pointer",backgroundColor:`${cane2}`}} onClick={handlecolour2}>4-pack</span>
										<span class="one-third button" style={{cursor:"pointer",backgroundColor:`${cane3}`}} onClick={handlecolour3}>12-pack</span>
									</p>
								</div>
								<h3 class="product-price"><b>${productData?.price}</b></h3>
								<div class=" sub-scribe">
									<input class="product-btn-single" type="submit" value="Subscribe and save 5%" ></input>
								</div>
								<br />
								<br />
								<div class="arrow-cart-new">
									<button class="sort-arrow"> <i class="arrow left"></i>&nbsp; 1 &nbsp;<i class="arrow right"></i></button>
									<input class="product-btn-default-single-quick" type="submit" value="ADD TO CART" ></input>
								</div>
								<div class="ask-add-quick" >
									<input class="product-btn-subs-add-quick" type="submit" value="ADD TO FAVORITES" ></input>
								</div>
								<br />
                                <br />
                                <br />
                                <br />
                                <div class=" sub-scribe-quick">
									<input class="product-btn-single" type="submit" value="More information" ></input>
								</div>
								
							</div>
						</div> 
					  </div>
                    </div> 
					</div>
                   

		</div>
		</div>
		</div>
		
	)
}

export default QuickAdd;