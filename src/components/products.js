import React from 'react';
import "../css/products.css";
import { useEffect, useState } from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import ReactStars from "react-rating-stars-component";
import BEGREAT from '../images/BEGREAT.png';
// import AddToCart from '../components/addtocart';



const Products = () => {

const[cane1,setcane1]=useState("white");
const[cane2,setcane2]=useState("white");
const[cane3,setcane3]=useState("white");
const[desc,setdesc]=useState("none");
const[nutri,setnutri]=useState("none");
const[ingre,setingre]=useState("none")


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

const displaydesc=()=>{
	setdesc("block");
	if(desc==="block"){
		setdesc("none")
	}
}

const displaynutri=()=>{
	setnutri("block");
	if(nutri==="block"){
		setnutri("none")
	}
}


const displayingre=()=>{
	setingre("block");
	if(ingre==="block"){
		setingre("none")
	}
}


	const [toggle, setToggle] = useState(false);

	const handleToggle = () => {
		setToggle(pre => !pre)
	}



	const ratingChanged = (newRating) => {
		// console.log(newRating);
	};
	document.getElementById("star-icon")




	return (
		<div class="all-product">
			<section class="section2-products">
				<div class="row">
					<div class="col-sm-2 ">
						<div id="product-side">

						</div>
					</div>

					<div class="col-sm-4">
						<div id="product-11" class="single2-product">
							<div class="part-11">

							</div>

						</div>
					</div>
                         <div class="col-sm-6">
						<div id="product-21" class="single22-product">

							<div class="pro-part1">
								<div class="pro-duct-only" >
									<h4 >Magma</h4>   </div>
								<div class="product-k">Ketone Hydration</div>

								<div style={{ paddingBottom: "40px" }}>
									<div class="star-icon">

										{/* <ReactStars
											count={5}
											onChange={ratingChanged}
											size={24}
											isHalf={true}
											emptyIcon={<i className="far fa-star"></i>}
											halfIcon={<i className="fa fa-star-half-alt"></i>}
											fullIcon={<i className="fa fa-star"></i>}
											activeColor="#ffd700"
										/> */}


									</div>
								</div>
								<div class="product-old-p">Flavour</div>

								<FontAwesomeIcon icon={faCircle} style={{ color: "#8080802e", size: "30px", paddingRight: "5px" }} /><FontAwesomeIcon icon={faCircle} style={{ color: "#8080802e", size: "2px" }} />
								<div class="glow-m">Magma glows from its passion for life with <br />refreshing fruity berry notes. </div>
								<div class="inline-buttons">
									<p>
										<span class="one-third  button" style={{cursor:"pointer",backgroundColor:`${cane1}`}} onClick={handlecolour1}>Single cane</span>
										<span class="one-third button" style={{cursor:"pointer",backgroundColor:`${cane2}`}} onClick={handlecolour2}>4-pack</span>
										<span class="one-third button" style={{cursor:"pointer",backgroundColor:`${cane3}`}} onClick={handlecolour3}>12-pack</span>
									</p>
								</div>
								<h3 class="product-price"><b>$00.00</b></h3>
								<div class=" sub-scribe">
									<input class="product-btn-single" type="submit" value="Subscribe and save 5%" ></input>
								</div>
								<br />
								<br />
								<div class="arrow-cart">
									<button class="sort-arrow"> <i class="arrow left"></i>&nbsp; 1 &nbsp;<i class="arrow right"></i></button>

									<button onClick={handleToggle} class="product-btn-default-single" >ADD TO CART</button>
									{/* {toggle && <AddToCart close={() => setToggle(false)} />} */}
								</div>
								<div class="ask-add" >
									<input class="product-btn-subs-add" type="submit" value="ADD TO FAVORITES" ></input>
								</div>
								<br />
								<div class="disc-tec">
									<p>Tecton inspire seismic shifts in your life. Enjoys once or twice daily to experience<br />  mental clarity, endurance, muscle recovery and Hydration.<br />
										<br />
									Without the boom-bust of the carbs and the jitery dehydration of caffeine.
													</p>
								</div>
							</div>
						</div>
					</div>
					<div class="container">
						<div class="row">
							<div class="mor-info-open">
								<div class="full-desc">
									FULL DESCRIPTION <button type="button" class="collapsible" onClick={displaydesc}>+</button>
									<div class="contents" style={{display:`${desc}`}} >
										<p>A Focused Performance beverage that hydrates, focuses and energizes you in the pursuit
										of making the most of your goals at any moment. Whether it’s on the battlefield, gym, office,
										club or in your own home.
                                           <br />
										Delicious, refreshing taste.
										<br />
										No caffeine, no jitters.
										<br />
										No carbohydrates or sugars.
										<br />
										Non-carbonated so it’s easy to chug.
										<br />
										Non-insulin response, non-caloric natural sweetener system (trade secret).
										<br />
										Non-Diuretic.
										<br />
                                        Just 50 calories/serving from our 10g of our proprietary Ketone Ester</p>
									</div>
								</div>
								<div><hr style={{ border: "2px solid orange", width: "94%" }}></hr></div>
								<br />
								<div class="full-desc">
									NUTRITION<button type="button" class="collapsible" onClick={displaynutri}>+</button>
									<div class="contents"  style={{display:`${nutri}`}}>
										<p>Serving  Size: 1 Can
										<br />
										Calories: 50
										<br />
										Total Fat: 0g
										<br />
										Sodium: 140mg
										<br />
										Total Carbohydrate: 0g
										<br />
										Protein: 0g
										<br />
                                        50 Calories from Ketones: Not a significant source of Saturated Fat, Trans Fat, Cholesterol,
										Dietary Fiber, Total Sugars, Added Sugars, Vitamin D, Calcium, Iron and Potassium.</p>
									</div>
								</div>
								<div><hr style={{ border: "2px solid orange", width: "94%" }}></hr></div>
								<br />
								<div class="full-desc">
									INGREDIENTS <button type="button" class="collapsible" onClick={displayingre}>+</button>
									<div class="contents" style={{display:`${ingre}`}}>
										<p>Water, Ketone Ester, Contains 1% or less of: Natural Flavors, Citric Acid, Sodium Beta
									 Hydroxybutyrate Salt, Monk Fruit Extract, Monopotassium Phosphate, Fruit & Vegetable Juice (color)</p>
									</div>
								</div>
								<div><hr style={{ border: "2px solid orange", width: "94%" }}></hr></div>
								<br />
							</div>
							<div class="ask-q" >
								<input class="product-btn-subs" type="submit" value="FREQUENTLY ASKED QUESTION" ></input>
							</div>
						</div>
						<div class="image-story">
							<div id="image-product">

							</div>
						</div>
						<div class="review-all">
							<div class="review-sec">
								<h4>Reviews</h4>
							     00 Reviews
								 </div>
							<div class="star-r">
								<b> Jane D.</b> &nbsp; verified buyer

								 </div>
							<div class="star-icon">

								{/* <ReactStars
									count={5}
									onChange={ratingChanged}
									size={24}
									isHalf={true}
									emptyIcon={<i className="far fa-star"></i>}
									halfIcon={<i className="fa fa-star-half-alt"></i>}
									fullIcon={<i className="fa fa-star"></i>}
									activeColor="#ffd700"
								/> */}
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut </p>
							</div>
							<div class="star-icon">
								{/* <ReactStars
									count={5}
									onChange={ratingChanged}
									size={24}
									isHalf={true}
									emptyIcon={<i className="far fa-star"></i>}
									halfIcon={<i className="fa fa-star-half-alt"></i>}
									fullIcon={<i className="fa fa-star"></i>}
									activeColor="#ffd700"
								/> */}

								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut </p>
							</div>
							<div className="btn-our" style={{ textAlign: "center", paddingTop: "10px" }}>
								<input class="product-btn-read-product" type="submit" value="READ MORE" ></input>

							</div>
							<div className="btn-single-down" style={{ textAlign: "center" }}>
								<input class="product-btn-down-cart" type="submit" value="LEAVE A REVIEW" ></input>
							</div>
						</div>
						<div class="review-all-leave">
							<div class="review-leave">
								More ways to <img class="pro-image" src={BEGREAT} ></img>
							</div>
						</div>
					</div>
				</div>

				<div class="down-product">
					<div class="container">
						<div class="row">

							<div class="  leave-one col-sm-4">
								<div class="part-car">

								</div>
								<div class="part-2">
									<h3 class="product-great"><b>Product</b></h3>
									<h3 class="product-bgreat">details</h3>

								</div>
							</div>
							<div class=" leave-two col-sm-4">
								<div class="part-car">

								</div>
								<div class="part-2">
									<h3 class="product-great"><b>Product</b></h3>
									<h3 class="product-bgreat">details</h3>

								</div>
							</div>
						
						</div>
					</div>
				</div>
			</section>

		</div>
	)
}

export default Products;


