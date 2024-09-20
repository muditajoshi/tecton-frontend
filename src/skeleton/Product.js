import React, { useState } from 'react';
// import Rating from './Rating';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import QuickAdd from '../components/quikadd'
import '../css/product.css';
import "../css/allproduct.css"
// import ReactGA from "react-ga4"

const Product = ({ product }) => {
    const [toggle, setToggle] = useState(false);

    const handleToggle = () => {

        setToggle(pre => !pre);
        


    }
    return (<div>


        <div >
            <div id="product-1" class="single-product mx-2"  style={{ marginLeft: "10px", marginRight: "10px", marginTop: "20px", padding: "8px", width:"95%" }} 
        //     onClick={()=>ReactGA.event({
        //     category: product?.name,
        //     action: `viewing ${product?.name}`,
        //     label: "tecton drink", 
        //     value: product?.price, 
        //   })}
          >

                <Link to={`/product/${product?._id}`}>
                    <div style={{ textAlign: "center" }}>
                        <img src={product?.image} alt="" fluide style={{ height: "100%", width: "100%" }} />
                    </div>
                </Link>

                <div class="part-2" style={{ width: "100%" }}>
                    <h3 style={{ marginTop: "20px",fontFamily:"aktivExt" }} class="product-title"><b>{product?.name}</b></h3>
                    <h3 style={{ height: "16px" }} class="product-titlle">{product?.category}</h3>
                    <h4 class="product-price"><Card.Text as='h4'>
                        {product?.price &&
                            product.price.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                                style: 'currency',
                                currency: 'USD',
                            })}
                    </Card.Text></h4><br />
                    <Link to={`/product/${product?._id}`}> <button onClick={handleToggle} class="product-btn-default" >BUY NOW</button></Link>
                    {/* {toggle && <QuickAdd productData={product} close={() => setToggle(false)} />} */}
                    <div style={{textAlign:"center",marginTop:"6px"}}>
                                    {product?.subscription? (<>Subscribe & Save up to 12%</>):("")}
                                    </div>
                </div>


            </div>
        </div>
    </div>
    );
};

export default Product;
