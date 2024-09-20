import React, { useState, useEffect } from "react";
import FormContainer from "../skeleton/FormContainer";
import "../css/productEditPage.css";
import { Form, Button, Image, FloatingLabel, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { createDiscount, updateDiscount } from "../actions/discountActions";

const CouponCreatingPage = ({
  createDiscount,
  updateDiscount,
  discount,
  history,
  match,
}) => {
  const [formData, setFormData] = useState({
    couponCode: "",
    description: "",
    validforAll: true,
    expiryDate: "",
    effectiveDate: "",
    minimumOrderValue: "",
    oneTimeUse: false,
    // usageLimit: "",
    discountPercentage: "",
  });


  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const {
    couponCode,
    description,
    validforAll,
    expiryDate,
    effectiveDate,
    minimumOrderValue,
    // usageLimit,
    discountPercentage,
    oneTimeUse,
  } = formData;

  const onChange = (e) => {
    if(e.target.name === "validforAll") {
      setFormData({ ...formData, [e.target.name]: e.target.value === "true"? true : false});
    }else{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createDiscount(formData, history);
      setMessage(res.data.message);

      setFormData({
        couponCode: "",
        description: "",
        validforAll: true,
        expiryDate: "",
        effectiveDate: "",
        minimumOrderValue: "",
        // usageLimit: "",
        discountPercentage: "",
        oneTimeUse: false,
      });
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="productEditPage">
      <FormContainer style={{ marginTop: "-1em" }}>
        <h1
          style={{ textAlign: "left", marginTop: "10px", marginBottom: "20px" }}
          className="productEditPage_heading"
        >
          Create Coupon
        </h1>
        <Form action="" onSubmit={handleSubmit}>
          <Form.Group controlId="">
            <FloatingLabel
              controlId="nameinput"
              label="Coupon code"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                placeholder="Coupon code"
                name="couponCode"
                type="text"
                required
                value={couponCode}
                onChange={(e) => onChange(e)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="">
            <FloatingLabel
              controlId="nameinput"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                placeholder="Description"
                type="text"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="">
            <select
              placeholder="Valid for"
              class="form-control-ship-acc"
              style={{ lineHeight: "2.3rem", width: "100%" }}
              name="validforAll"
              required
              checked={validforAll}
              onChange={(e) => onChange(e)}
            >
              <option value="" selected disabled hidden>
                Valid For{" "}
              </option>
              <option value={true}> All User</option>
              <option value={false}>First Time User</option>
            </select>
          </Form.Group>
          <br />
          <Form.Group controlId="">
            <FloatingLabel
              controlId="nameinput"
              label="Coupon Effective Date"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                placeholder="Effective Date"
                type="date"
                format="mm/dd/yyyy"
                required
                name="effectiveDate"
                value={effectiveDate}
                onChange={(e) => onChange(e)}
                min={new Date().toISOString().slice(0, 10)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="">
            <FloatingLabel
              controlId="nameinput"
              label="Coupon Expiry Date"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                placeholder="Coupon Expiry Date"
                type="date"
                format="mm/dd/yyyy"
                name="expiryDate"
                required
                value={expiryDate}
                onChange={(e) => onChange(e)}
                min={new Date().toISOString().slice(0, 10)}
              />
            </FloatingLabel>
          </Form.Group>
          {/* <Form.Group controlId="">
            <FloatingLabel
              controlId="nameinput"
              label="Minimum cart value"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                placeholder="Minimum order value"
                type="text"
                name="minimumOrderValue"
                value={minimumOrderValue}
                onChange={(e) => onChange(e)}
              />
            </FloatingLabel>
          </Form.Group> */}
          {/* <Form.Group controlId="">
            <FloatingLabel
              controlId="nameinput"
              label="Usage limit"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                placeholder="Usage limit"
                type="number"
                name="usageLimit"
                value={usageLimit}
                onChange={(e) => onChange(e)}
              />
            </FloatingLabel>
          </Form.Group> */}
          <Form.Group controlId="">
            <FloatingLabel
              controlId="nameinput"
              label="Discount Percentage"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                placeholder="Discount percentage"
                type="number"
                name="discountPercentage"
                step="0.01"
                required
                min="0"
                max="100"
                value={discountPercentage}
                onChange={(e) => onChange(e)}
              />
            </FloatingLabel>
          </Form.Group>

          {validforAll ? (
            <>
              <Form.Group>
                <Form.Check type={"checkbox"}>
                  <Form.Check.Input
                    type={"checkbox"}
                    defaultChecked={false}
                    name="oneTimeUse"
                    value={oneTimeUse}
                    checked={oneTimeUse}
                    onChange={(e) => {
                      setFormData({ ...formData, oneTimeUse: !oneTimeUse });
                    }}
                  />
                  <Form.Check.Label style={{ paddingTop: "5px" }}>
                    Check if this coupon is applicable only for one time
                  </Form.Check.Label>
                </Form.Check>
              </Form.Group>
              <br />
            </>
          ) : (
            <></>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Button type="submit" className="productEditPage_updateButton">
              Create coupon
            </Button>
            <Link to="/admin/couponlist">
              <Button className="productEditPage_updateButton">
                Go To Coupon List
              </Button>
            </Link>
          </div>
        </Form>
      </FormContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div style={{ textAlign: "center", width: "45%" }}>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
      </div>

      {/* {state15 ? state15 : null} */}
    </div>
  );
};

// export default CouponCreatingPage;

CouponCreatingPage.propTypes = {
  createDiscount: PropTypes.func.isRequired,
};

export default connect(null, { createDiscount })(
  withRouter(CouponCreatingPage)
);
