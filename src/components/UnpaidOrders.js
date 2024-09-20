import React, { useEffect, useState } from "react";
import getDateString from "../utils/getDateString";
import axios from "axios";
import useDocumentTitle from "./useDocumentTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import "../css/orderlistpage.css";
import Pagination from "react-bootstrap/Pagination";



const UnpaidOrders = ({ history }) => {
  useEffect(() => {
    if (userInfo?.isAdmin === false) {
      history.push("/");
    }
  });

  const userLogin = useSelector((state) => state.userLogin);
  const [stateamb, setstateamb] = useState("");
  const [total, setTotal] = useState("");
  useDocumentTitle("Unpaid orders");
  const { userInfo } = userLogin;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/orders/get-all-unpaid-orders`, config)
      .then((res) => {
        setstateamb(res.data.orders);
        setTotal(res.data.total);
      });
  }, []);

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(stateamb);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "unpaidOrdersData.csv";
    link.click();
  };
  
  const convertToCSV = (orders) => {
    const headers = [
      "ID",
      "USER",
      "USER TYPE",
      "REF-CODE",
      "AMBASSADOR-NAME",
      "COUPON-CODE",
      "EMAIL",
      "TOTAL",
      "DATE",
      "ADDRESS",
      "BILLING ADDRESS",
      "PHONE NO",
      "PRODUCT NAME",
      "QUANTITY",
      "PAID",
      "DELIVERED",
    ];
  
    const rows = orders.map((order) => {
      const userID = order._id;
      const userFullName = `${order.user && order?.shippingAddress?.firstName} ${order.user && order?.shippingAddress?.lastName} ${order?.shippingAddress?.first_name} ${order?.shippingAddress?.last_name}`;
      const userType = order?.userType?.join(" ");
      const refCode = order?.orderMetaData ? order?.orderMetaData[0]?.refCode : "";
      const ambName = order?.orderMetaData ? order?.orderMetaData[0]?.ambName : "";
      const couponCode = order?.orderMetaData ? order?.orderMetaData[0]?.couponCode : "";
      const userEmail = order?.shippingAddress?.email;
      const totalAmount = order.totalPrice.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "USD",
      });
      const orderDate = getDateString(order.createdAt, true);
      const shippingAddress = `${order?.shippingAddress?.address}, ${order?.shippingAddress?.apt}, ${order?.shippingAddress?.city}, ${order?.shippingAddress?.state}, ${order?.shippingAddress?.country}, ${order?.shippingAddress?.postalCode}`;
      const billingAddress = order?.billingAddress?.address
        ? `${order?.billingAddress?.address}, ${order?.billingAddress?.apt}, ${order?.billingAddress?.city}, ${order?.billingAddress?.state}, ${order?.billingAddress?.country}, ${order?.billingAddress?.postalCode}`
        : "same as shipping address";
      const phoneNo = order?.shippingAddress?.phoneNo;
      const productNames = order?.orderItems?.map((value) => value?.name).join(", ");
      const quantities = order?.orderItems?.map((value) => value?.qty).join(", ");
      const paidStatus = order.isPaid ? getDateString(order.paidAt) : "Not Paid";
      const deliveredStatus = order.isDelivered ? getDateString(order.deliveredAt) : "Not Delivered";
  
      return [
        userID,
        `"${userFullName}"`,
        `"${userType}"`,
        `"${refCode}"`,
        `"${ambName}"`,
        `"${couponCode}"`,
        `"${userEmail}"`,
        `"${totalAmount}"`,
        orderDate,
        `"${shippingAddress}"`,
        `"${billingAddress}"`,
        `"${phoneNo}"`,
        `"${productNames}"`,
        `"${quantities}"`,
        `"${paidStatus}"`,
        `"${deliveredStatus}"`,
      ].join(",");
    });
  
    return [headers.join(","), ...rows].join("\n");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 60;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentRecords = stateamb.slice(indexOfFirstPost, indexOfLastPost);
  const nPage = Math.ceil(stateamb.length / postsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const PrevPage = () => {
    if (currentPage !== 1) {
      console.log("clicked");
      setCurrentPage(currentPage - 1);
    }
  };
  
  const NextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeCpage = (i) => {
    setCurrentPage(i);
  };
  const FirstPage = () => {
    setCurrentPage(1);
  };
  const LastPage = () => {
    setCurrentPage(nPage);
  };





  return (
    <div className="orderListPage">
      <h1 className="orderListPage_heading">
        Unpaid Orders ({`${total || 0}`})
      </h1>
      <FontAwesomeIcon
             onClick={handleDownloadCSV}
              icon={faFileExport}
              style={{ color: "orange", cursor: "pointer", fontSize: "25px" }}
            />
    
      <Table striped bordered responsive className="table-sm text-center">
        <thead>
          <tr>
            <th>USER ID</th>
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
            <th>DELIVERED</th>
          </tr>
        </thead>
        <tbody>
        {currentRecords &&
              currentRecords?.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.user && order?.shippingAddress?.firstName}{" "}
                    {order.user && order?.shippingAddress?.lastName}{" "}
                    {order?.shippingAddress?.first_name}{" "}
                    {order?.shippingAddress?.last_name}
                  </td>
                  <td>{order?.userType?.join(" ")}</td>
                  <td>
                    {order?.orderMetaData
                      ? order?.orderMetaData[0]?.refCode
                      : ""}
                  </td>
                  <td>
                    {order?.orderMetaData
                      ? order?.orderMetaData[0]?.ambName
                      : ""}
                  </td>
                  <td>
                    {order?.orderMetaData
                      ? order?.orderMetaData[0]?.couponCode
                      : ""}
                  </td>
                  <td>{order?.shippingAddress?.email}</td>
                  <td>
                    {order.totalPrice.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>
                  <td>{getDateString(order.createdAt)}</td>
                  <td>
                    {order?.shippingAddress?.address},&nbsp;
                    {order?.shippingAddress?.apt},&nbsp;
                    {order?.shippingAddress?.city},&nbsp;
                    {order?.shippingAddress?.state},&nbsp;
                    {order?.shippingAddress?.country},<br />
                    {order?.shippingAddress?.postalCode}
                  </td>
                  <td>
                    {order?.billingAddress?.address ? (
                      <>
                        {order?.billingAddress?.address},&nbsp;
                        {order?.billingAddress?.apt},&nbsp;
                        {order?.billingAddress?.city},&nbsp;
                        {order?.billingAddress?.state},&nbsp;
                        {order?.billingAddress?.country},<br />
                        {order?.billingAddress?.postalCode}
                      </>
                    ) : (
                      <>same as shipping address</>
                    )}
                  </td>
                  <td>{order?.shippingAddress?.phoneNo}</td>
                  <td>
                    {order?.orderItems?.map((value) => (
                      <div> {value?.name}</div>
                    ))}
                  </td>
                  <td>
                    {order?.orderItems?.map((value) => (
                      <div> {value?.qty}</div>
                    ))}
                  </td>
                  <td>
                    {order.isPaid ? (
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
                    {order.isDelivered ? (
                      getDateString(order.deliveredAt)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{
                          color: "red",
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    
      
       {/* bootstrap pagination  */}
       <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop:'20px'
              }}
            >
              <Pagination size="lg">
                <Pagination.First onClick={FirstPage} />
                <Pagination.Prev onClick={PrevPage} />
                <Pagination.Ellipsis />
                {numbers.map((num) => (
                  <Pagination.Item key={num}
                   active={num === currentPage}
 
                   onClick={() => changeCpage(num)}>
                    {num}
                  </Pagination.Item>
                ))}
                <Pagination.Ellipsis />
                <Pagination.Next onClick={NextPage} />
                <Pagination.Last onClick={LastPage} />
              </Pagination>
      </div>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default UnpaidOrders;
