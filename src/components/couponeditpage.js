import React, { useEffect, useRef, useState } from "react";
import FormContainer from "../skeleton/FormContainer";
import "../css/productEditPage.css";
import {
  Form,
  Button,
  Image,
  FloatingLabel,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getDiscount, updateDiscount } from "../actions/discountActions";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CouponEditPage = (props) => {
  const [couponCode, setCouponCode] = useState("");
  const [description, setDescription] = useState("");
  const [validforAll, setValidforAll] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  // const [minimumOrderValue, setminimumOrderValue] = useState(0);
  const [usageLimit, setUsageLimit] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);

  const convertDate = (datestr) => {
    const timestampString = datestr;
    const timestamp = parseInt(timestampString, 10);
    const date = new Date(timestamp);
    const newDate = date.toISOString().split("T")[0];
     return newDate;
  };

  if (!userLogin.userInfo) {
    window.location.href = "/login";
  }
  const { userInfo } = userLogin;
  const config = userInfo.isSocialLogin
    ? { headers: { Authorization: `SocialLogin ${userInfo.id}` } }
    : {
        headers: { Authorization: `Bearer ${userInfo.accessToken}` },
      };

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_PROXY_URL}/api/discount/get-discount-by-id`,
  //       { ...config, data: { id: props.match.params.id } }
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY_URL}/api/discount/get-discount-by-id/${props.match.params.id}`,
        config
      )
      .then((res) => {
        console.log(res.data);
        setCouponCode(res.data.couponCode);
        setDescription(res.data.description);
        setValidforAll(res.data.validforAll);
        setEffectiveDate(convertDate(res.data.effectiveDate));
        setExpiryDate(convertDate(res.data.expiryDate));
        console.log(effectiveDate);
        console.log(expiryDate);
        // setminimumOrderValue(res.data[0].minimumOrderValue);
        setUsageLimit(res.data.usageLimit);
        setDiscountPercentage(res.data.discountPercentage);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDiscount = {
        // couponCode,
        description,
        validforAll,
        effectiveDate,
        expiryDate,
        // minimumOrderValue,
        // usageLimit,
        discountPercentage,
      };
      const res = await props.updateDiscount(
        props.match.params.id,
        updatedDiscount,
        props.history
      );
      console.log(res.data.message);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };

  console.log("effectiveDate", effectiveDate);
  console.log("expiryDate", expiryDate);
  return (
    <div className="productEditPage">
      <Form onSubmit={onSubmit}>
        <FormContainer style={{ marginTop: "-1em" }}>
          <h1
            style={{
              textAlign: "left",
              marginTop: "0px",
              marginBottom: "20px",
            }}
            className="productEditPage_heading"
          >
            Edit Coupon
          </h1>
          <Form.Group controlId="">
            <FloatingLabel
              controlId="nameinput"
              label="Coupon code"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                placeholder="Coupon code"
                type="text"
                required
                name="couponCode"
                value={couponCode}
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
                onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => setValidforAll(e.target.value)}
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
                onChange={(e) => setEffectiveDate(e.target.value)}
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
                required
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                min={new Date().toISOString().slice(0, 10)}
              />
            </FloatingLabel>
          </Form.Group>
          {/* <Form.Group controlId="">
            <FloatingLabel
              controlId="nameinput"
              label="Minimum order value"
              className="mb-3"
            >
              <Form.Control
                size="lg"
                placeholder="Minimum order value"
                type="text"
                name="minimumOrderValue"
                value={minimumOrderValue}
                onChange={(event) => setminimumOrderValue(event.target.value)}
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
                onChange={(e) => setUsageLimit(e.target.value)}
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
                required
                step="0.01" 
                min="0"
                max="100"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            {/* <Link to="/admin/couponlist"> */}
            <Button type="submit" className="productEditPage_updateButton">
              Update coupon
            </Button>

            <Button
              className="productEditPage_updateButton"
              onClick={() => history.push("/admin/couponlist")}
            >
              Go To Coupon List
            </Button>

            {/* </Link> */}
          </div>
        </FormContainer>
      </Form>
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
    </div>
  );
};

// export default CouponCreatingPage;
CouponEditPage.propTypes = {
  getDiscount: PropTypes.func.isRequired,
  updateDiscount: PropTypes.func.isRequired,
  discount: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  discount: state.discount,
});

export default connect(mapStateToProps, { getDiscount, updateDiscount })(
  withRouter(CouponEditPage)
);
