import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../skeleton/Loader";
import Message from "../skeleton/Message";
import Paginate from "../skeleton/Paginate";
import { refreshLogin } from "../actions/userActions";
import { listAllOrders } from "../actions/orderActions";
import getDateString from "../utils/getDateString";
import "../css/orderlistpage.css";
import useDocumentTitle from "./useDocumentTitle";
const ProductListPage = ({ history, match }) => {
  useDocumentTitle("All orders")
  const pageNumber = match.params.pageNumber || 1; // to fetch various pages of orders
  const dispatch = useDispatch();
  const orderListAll = useSelector((state) => state.orderListAll); // to avoid blank screen display
  const { loading, orders, error, page, pages, total } = orderListAll;
  // console.log(orders);
console.log(orders)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  // refresh access tokens aif user details are failed
  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  // get all orders by pagenumber
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) dispatch(listAllOrders(pageNumber));
    else history.push("/login");
    // console.log(match);
  }, [dispatch, history, userInfo, pageNumber]);

  return (
    <div className="orderListPage">
      <Row className="align-items-center ">
        <Col>
          <h1 className="orderListPage_heading">
          All Orders ({`${total || 0}`}) 
          </h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message dismissible variant="danger" duration={10}>
          {error}
        </Message>
      ) : (
        <Table striped bordered responsive className="table-sm text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER-NAME</th>
              <th>USER TYPE</th>
              <th>REF-CODE</th>
              <th>AMBASSADOR-NAME</th>
              <th>COUPON-CODE</th>
              <th>EMAIL</th>
              <th>TOTAL</th>
              <th>DATE</th>
              <th>ADDRESS</th>
              <th>BILLING ADDRESS</th>
              <th>PHONE NO</th>
              <th>PRODUCT NAME</th>
              <th>QUANTITY</th>
			        <th>PAID</th>
              <th>STATUS</th>
              {/* <th>EDIT</th> */}
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders?.map((order) => {
                return (
                  <tr key={order?._id}>
                    <td>{order?._id}</td>
                    <td>
                      {order?.user && order?.shippingAddress?.firstName}&nbsp;
                      {order?.user && order?.shippingAddress?.lastName}
					  {order?.shippingAddress?.first_name}&nbsp;
					  {order?.shippingAddress?.last_name}
                    </td>
                    <td>{order?.userType?.map((val)=>val+" ")}</td>
                    <td>{order?.orderMetaData[0]?.refCode}</td>
                    <td>{order?.orderMetaData[0]?.ambName}</td>
                    <td>{order?.orderMetaData[0]?.couponCode}</td>
                    
					<td>
						{order?.shippingAddress?.email}
					</td>

          
                    <td>
                      {order?.totalPrice?.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "USD",

                      })}
                    </td>
                    <td>{getDateString(order?.createdAt)}</td>
					
                                        {/* <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="link" className="btn-sm">
                          View Details
                        </Button>
                      </LinkContainer>
                    </td> */}
					<td>
						{order?.shippingAddress?.address},&nbsp;{order?.shippingAddress?.apt},&nbsp;{order?.shippingAddress?.city},&nbsp;{order?.shippingAddress?.state},&nbsp;{order?.shippingAddress?.country},<br/>{order?.shippingAddress?.postalCode}
					</td>
          <td>
						{order?.billingAddress?.address?(<>{order?.billingAddress?.address},&nbsp;{order?.billingAddress?.apt},&nbsp;{order?.billingAddress?.city},&nbsp;{order?.billingAddress?.state},&nbsp;{order?.billingAddress?.country},<br/>{order?.billingAddress?.postalCode}</>):(<>same as shipping address</>)}
					</td>
					<td>
					{order?.shippingAddress?.phoneNo}
					</td>
					<td>
					{order?.orderItems?.map((value)=> <div> {value?.name}</div>)}
					</td>
					<td>
					{order?.orderItems?.map((value)=> <div> {value?.qty}</div>)}
					</td>
					<td>
                      {order?.isPaid ? (
                        getDateString(order.paidAt)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{
                            color: "red",
                          }}
                        />
                      )}
                    </td>
                    <td>
                      {/* {order?.isDelivered ? (
                        getDateString(order?.deliveredAt)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{
                            color: "red",
                          }}
                        />
                      )} */}
                      {order?.orderMetaData[0]?.orderStatus}
                    </td>
                    {/* <td><button onClick={() => history.push({

pathname: `/api/orders/${order._id}/toedit`,

state: { order: order }

})}>Edit</button></td> */}

                  </tr>
                
                 
                );
              })}
          </tbody>
        </Table>
      )}
      <br/>
      <Paginate pages={pages} page={page} isAdmin={true} forOrders={true} />
      <br/>
      <br/>
    </div>
  );
};

export default ProductListPage;
