import React from "react";
import './../css/reviewrating.css'

const RatingReview = () => {

    return (
        <>
            <div className="container pt-5 mt-5 reviewcontainer">
            <div className="review-star-product">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star"></i>
                            </div>
                <h2 className="text-center">4.8 Star Rating</h2>
                <p className="lead"> 100 Reviews </p>


                <div className="review-container">
                    <h3 className="text-center">RATE THIS PRODUCT</h3>
                    <div className="text-center mb-3">
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                    </div>
                    <form>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Leave  Comment</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="7" placeholder="Text..."></textarea>
                        </div>
                        <div className="mb-3 float-end ">
                            <button className="btn btn-review-cancle">Cancel</button>
                            <button className="btn btn-reviw-submit">ADD REVIEW</button>
                        </div>
                    </form>


                </div>

                <div className="reviewtext">

                    <div className="row reviewtext-user py-4">

                        <div className="col-4">
                            <h3 className="text-uppercase">John Smith</h3>
                            <h5>Atlanta, GA</h5>
                            <div className="review-star">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            </div>
                        </div>

                        <div className="col-8">
                            <h5>10 hours ago</h5>
                            <p className="user-review-message">
                                Lorem ipsum dolor sit amet consectetur. Sit metus eu euismod etiam malesuada posuere purus suspendisse sit. Dolor dolor rhoncus neque arcu eget eu.
                            </p>
                        </div>

                        <hr />
                        <div className="col-4">
                            <h3 className="text-uppercase">Amy Williams</h3>
                            <h5>New York, NY</h5>
                            <div className="review-star">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            </div>
                        </div>

                        <div className="col-8">
                            <h5>2 days ago</h5>
                            <p className="user-review-message">
                                Lorem ipsum dolor sit amet consectetur. Sit metus eu euismod etiam malesuada posuere purus suspendisse sit. Dolor dolor rhoncus neque arcu eget eu.
                            </p>
                        </div>
                        <hr />
                        <div className="col-4">
                            <h3 className="text-uppercase">Rachel Brown</h3>
                            <h5>Miami, FL</h5>
                            <div className="review-star">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star"></i>
                            </div>
                        </div>

                        <div className="col-8">
                            <h5>1 weeks ago</h5>
                            <p className="user-review-message">
                                Lorem ipsum dolor sit amet consectetur. Sit metus eu euismod etiam malesuada posuere purus suspendisse sit. Dolor dolor rhoncus neque arcu eget eu.
                            </p>
                        </div>



                    </div>

                    <a className="review-link mt-5">View all 100 reviews</a>

                </div>


            </div>
        </>
    )
}

export default RatingReview;