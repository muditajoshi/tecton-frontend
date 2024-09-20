import React, { useEffect, useState } from 'react'
import FormContainer from "../skeleton/FormContainer";
import "../css/productEditPage.css";
import { Form, Button, Image, FloatingLabel, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import OverlayEditSub from "../skeleton/OverlayEditSub";
import { useSelector } from 'react-redux';
const EditShippingPrice = () => {
    const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
    const [overlay, setoverlay] = useState();
  const [show, setShow] = useState(false);
    const [shippingPrice,setShippingPrice] = useState();
    useEffect(()=>{
        setoverlay(<OverlayEditSub />);
    setShow(true);
        axios.get(`${process.env.REACT_APP_PROXY_URL}/api/shipping/get-shipping-price`).then((res)=>{
            setShippingPrice(res.data.shippingPrice);
            setShow(false)
        }).catch((err)=>{
          if(err){
            setShow(false)
          }
        })
      },[])
      const [newShippingPrice,setNewShippingPrice] = useState();
      const config = userInfo.isSocialLogin
		? {
			headers: {
				Authorization: `SocialLogin ${userInfo.id}`,
			},
		}
		: {
			headers: {
				Authorization: `Bearer ${userInfo.accessToken}`,
			},
		};
  return (
    <div className="productEditPage">
 {show ? overlay : <></>}
    
      <FormContainer style={{ marginTop: "-1em" }}>
        <h1 style={{ textAlign: "left", marginTop: "0px", marginBottom: "20px" }} className="productEditPage_heading">Set Standard Shipping Price</h1>
       <br/>
       
       <label style={{fontSize:"20px",paddingBottom:"5px"}}> Current Shipping Value</label>    
       <label style={{fontSize:"18px",paddingBottom:"5px",color:"#757575"}}>${shippingPrice}</label>

       <br/>
           <label style={{fontSize:"20px",paddingBottom:"5px"}}>Shipping Value</label>    
        <Form.Group controlId="">
          <FloatingLabel
       
            controlId="nameinput"
           
            className="mb-3"
          >
            <Form.Control
              size="lg"
              style={{paddingTop:"0px",height:"0px"}}
              type="number"
              value={newShippingPrice}
              onChange={(e)=>{
                setNewShippingPrice(e.target.value)
              }}

            />
          </FloatingLabel>
        </Form.Group>

<br/>
        <div className="d-flex">
          
            <Button
              onClick={() => {setoverlay(<OverlayEditSub />);
              setShow(true);axios.put(`${process.env.REACT_APP_PROXY_URL}/api/shipping/update-shipping-price`,{
                shippingPrice:newShippingPrice
              },config).then((res)=>{
if(res){
    
        axios.get(`${process.env.REACT_APP_PROXY_URL}/api/shipping/get-shipping-price`).then((res)=>{
            setShippingPrice(res.data.shippingPrice);
            setShow(false)
        })
}

              })}}
              className="productEditPage_updateButton"
            >
              Update Shipping Value
                  </Button>
        </div>
      </FormContainer>
      
    </div>
  )
}

export default EditShippingPrice;