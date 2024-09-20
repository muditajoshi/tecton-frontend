import { getDiscounts, deleteDiscount } from "../actions/discountActions";
import { connect } from "react-redux";

import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormContainer from "../skeleton/FormContainer";
import {
  faCircle,
  faTrash,
  faEdit,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CouponListPage = ({  deleteDiscount }) => {
  const history = useHistory();
  // useEffect(() => {
  //   getDiscounts();
  // }, [getDiscounts]);
const dispatch = useDispatch();
const [discounts , setDiscounts] = useState();
const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;
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
useEffect(()=>{
  axios.get(`${process.env.REACT_APP_PROXY_URL}/api/discount/get-all-discount`, config).then((res)=>setDiscounts(res.data))
},[])

  const handleDelete = (id) => {
    deleteDiscount(id);
  };

  const handleEdit = (id) => {
    history.push(`/admin/editcoupon/${id}`);
  };

  const convertDate = (stringdate) => {
    const timestampStr = stringdate;
    const timestamp = parseInt(timestampStr);
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  };
console.log(discounts)
  return (
    <div className="productListPage">
      <Row className="align-items-center">
        <div className="col-sm-8">
          <Col>
            <h1 className="productListPage_heading">Coupon List</h1>
          </Col>
        </div>
        <div className="col-sm-4">
          <Col>
            <Link to="/admin/createcoupon">
              <Button className="productListPage_createButton">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>&nbsp; Create
                Coupon
              </Button>
            </Link>
          </Col>
        </div>
      </Row>
      <br />
      <Table striped bordered responsive className="table-sm text-center">
        <thead>
          <tr>
            <th>COUPON CODE</th>
            <th>DISCRIPTION</th>
            <th> VALID FOR</th>
            <th>EFFECTIVE DATE</th>
            <th>EXPIRY DATE</th>
            {/* <th>MINIMUM CART VALUE</th> */}
            {/* <th>USAGE LIMIT</th> */}
            <th>DISCOUNT PERCENT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {discounts?.map((discount) => {
            const {
              _id,
              couponCode,
              description,
              discountPercentage,
              effectiveDate,
              expiryDate,
              // minimumOrderValue,
              // usageLimit,
              validforAll,
            } = discount;
            const neweffectiveDate = convertDate(effectiveDate);
            const newexpiryDate = convertDate(expiryDate);

            console.log(neweffectiveDate);
            return (
              <tr key={_id}>
                <td>{couponCode}</td>
                <td>{description}</td>
                <td>{validforAll ? "All Users" : "First Time User"}</td>
                <td>{neweffectiveDate}</td>
                <td>{newexpiryDate}</td>
                {/* <td>{minimumOrderValue}</td> */}
                {/* <td>{usageLimit}</td> */}
                <td>{discountPercentage}</td>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {/* <Link to="/admin/editcoupon"> */}{" "}
                  <Button variant="link" className="btn-sm">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => {
                        handleEdit(_id);
                      }}
                    ></FontAwesomeIcon>
                  </Button>
                  {/* </Link> */}
                  <Button
                    onClick={() => {
                      handleDelete(_id);
                    }}
                    className="btn-sm"
                    variant="danger"
                  >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
const mapStateToProps = (state) => ({
  discounts: state?.discounts?.discounts || [],
});

export default connect(mapStateToProps, { getDiscounts, deleteDiscount })(
  CouponListPage
);
