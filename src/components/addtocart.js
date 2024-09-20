import React from 'react'
import BEGREAT from '../images/BEGREAT.png';
import "../css/addtocart.css";
import { Link } from 'react-router-dom';
import useDocumentTitle from './useDocumentTitle';


function AddToCart({close})     {
    return (
        <div className="popup-box-add">
        {/* <aside className='login' > */}
        <div className="box-add">
            <div class="all-product">
            
           < div>
           <i class="arrow left"></i><Link  className="clr-dot" to="/product">Back</Link>
                        
                    </div>
                <div class="container">
                    
                    <div class=" cont-add col-sm-12">
                        <div class="row">
                            <div class="hedd-ing">
                                <h3>Add to Cart</h3>
                              
							<div className="close-icon" onClick={() => close()} > x</div>
						
                            </div>

                          
                        <div class=" col-sm-4">
                            <div class="part-cart-pro-add">

                            </div>
                          
                        </div>
                            <div class=" col-sm-4">
                        <div class="part-2-cart-add">
                                <h3 class="product-great"><b>Product</b></h3>
                                <h3 class="product-kgreat">details</h3>
                                
                            </div>
                            <div class="part-3-cart-add">
                            <h3 class="product-price-add"><b>$00.00</b></h3>
                            <div class=" sub-shop-cart" style={{ marginTop:"-5px"}}  >
                                       
                                    </div>
                               </div>
                            </div>
                            <div class="row">
                            <div class="review-all-leave-add">
							<div class="review-leave-add">
								More ways to <img class="pro-image" src={BEGREAT} ></img>
							</div>
                            </div>
                            </div>
						
                        <div class="row">
                       
                   
                       <div class="col-sm-6">
                           <div id="product-1" class="single-product">
                               <div class="part-add-pro">
                                   
                               </div>
                               <div class="part-2">
                                   <h3 class="product-title-add"><b>Product</b></h3>
                                   <h3 class="product-title-de">details</h3>
                                   {/* <h4 class="product-price">$00.00</h4><br/> */}
                                   <input class="product-btn-default-more" type="submit" value="QUICK ADD" ></input>
                                  
                               </div>
                              
                              
                           </div>
                       </div>
                      

                       <div class="col-sm-6 ">
                           <div id="product-2" class="single-product">
                               <div class="part-add-pro">
                                   
                               </div>
                               <div class="part-2">
                                   <h3 class="product-title-add"><b>Product</b></h3>
                                   <h3 class="product-title-de">Details</h3>
                                   {/* <h4 class="product-price">$00.00</h4><br/> */}
                                   <input class="product-btn-default-more" type="submit" value="QUICK ADD" ></input>
                               </div>
                               
                           </div>
                       </div>
                    
                       </div>
                       <div class="total-amount">
                            <div class="row">
                               
                                <div class="col-sm-6">
                                <div class="sub-price">
                                  Subtotal
</div>
                                </div>
                                <div class="col-sm-6">
                                <div class="sub-price">
                                      $00.00
</div>
                                    </div>
                            </div>
                            <div class="de-tail-p">
                            Shipping and Taxes added at checkout.<br/>
1% of sales supports Veteran causes.
                            </div>
                            <div class=" sub-shop-addcart"  >
                                        <input class="product-btn-single-addcart" type="submit" value="continue shopping" ></input>
                                    </div>
                                    <div class="continue-btn">
                                    <div class="product-btn-default-CON-addcart">
										<Link className="con-dot" to="/cart"  type="submit">VIEW CART</Link>
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

export default AddToCart;
