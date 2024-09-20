import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import useDocumentTitle from "./useDocumentTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";

function Subscriptionlist({ history }) {
  useDocumentTitle("Subscription List");

  const userLogin = useSelector((state) => state.userLogin);
  const [stateamb, setstateamb] = useState("");
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo?.isAdmin === false) {
      history.push("/");
    }
  }, [history, userInfo]);


  const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
    },
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PROXY_URL}/api/subscription/admin/subscriptions-list`,config);
        setstateamb(response.data.subscription);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    if (userInfo?.isAdmin) {
      fetchData();
    } else {
      history.push("/");
    }
  }, [userInfo, history]);




 


  
  const downloadCSV = () => {
    const csvData = stateamb.map((values) => {
      const productNames = values.order.orderItems.map((val) => val.name).join(', ');
      const frequencies = values.stripeData.map((valus) => `${valus?.items?.data[0]?.plan?.interval_count} ${valus?.items?.data[0]?.plan?.interval}s`).join(', ');
  
      const prices = values.stripeData.map((valm, inn) => {
        const totalPrice = ((values?.order?.orderItems[inn]?.itemTotalPrice - values?.order?.orderItems[inn]?.itemTotalPrice * (valm?.discount?.coupon?.percent_off / 100)) + values?.order?.shippingPrice + values?.order?.orderItems[inn]?.taxPercent) || 0;
        return totalPrice.toFixed(2);
      });
  
      const quantities = values.stripeData.map((item) => item?.items?.data[0]?.quantity).join(', ');
  
      return [
        values.user || "", 
        `"${values?.order?.shippingAddress?.firstName || ""} ${values?.order?.shippingAddress?.lastName || ""}"`,
        values?.order?.shippingAddress 
          ? `"${[values?.order?.shippingAddress?.address, values?.order?.shippingAddress?.apt, values?.order?.shippingAddress?.city, values?.order?.shippingAddress?.state, values?.order?.shippingAddress?.country, values?.order?.shippingAddress?.postalCode].filter(Boolean).join(", ")}"`
          : "", 
        `"${values?.order?.shippingAddress?.email || ""}"`,
        `"${values?.userType?.[0] || ""}"`, 
        values?.order?.billingAddress
          ? `"${[values?.order?.billingAddress?.address, values?.order?.billingAddress?.apt, values?.order?.billingAddress?.city, values?.order?.billingAddress?.state, values?.order?.billingAddress?.country, values?.order?.billingAddress?.postalCode].filter(Boolean).join(", ")}"`
          : '"same as shipping address"',
        `"${productNames}"`,
        `"${frequencies}"`,
        `"${prices.join(', ')}"`,
        `"${quantities}"`,
      ].join(',');
    });
  
    const csvString = [
      "USER ID,NAME,ADDRESS,EMAIL,USER TYPE,BILLING ADDRESS,PRODUCT NAME,FREQUENCY,TOTAL PRICE,QUANTITY",
      ...csvData,
    ].join('\n');
  
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscriptions.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  //   paginations function
 const [currentPage, setCurrentPage] = useState(1);
 const postsPerPage =9;
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentRecords =  stateamb.slice(indexOfFirstPost, indexOfLastPost);
 const nPage =  Math.ceil(stateamb.length / postsPerPage);
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
        Subscriptions ({stateamb?.length})
      </h1>
      <FontAwesomeIcon
            onClick={downloadCSV}
              icon={faFileExport}
              style={{ color: "orange", cursor: "pointer", fontSize: "25px" }}
            />

      <Table striped bordered responsive className="table-sm text-center">
        <thead>
          <tr>
            <th>USER ID</th>
            <th>USER NAME</th>
            <th>ADDRESS</th>
            <th>EMAIL</th>
            <th>USER TYPE</th>
            <th>BILLING ADDRESS</th>
            <th>PRODUCT NAME</th>
            <th>FREQUENCY</th>
            <th>TOTAL PRICE</th>
            <th>QUANTITY</th>
          </tr>
        </thead>
        <tbody>
        {currentRecords &&
              currentRecords?.map((values,index) => {
              return (
                <tr key={`${index}-${values.user}`}>
                  <td>{values.user}</td>
                  <td>{values?.order?.shippingAddress?.firstName}&nbsp;{values?.order?.shippingAddress?.lastName}</td>
                  <td>
                    {values?.order?.shippingAddress?.address}, {values?.order?.shippingAddress?.apt}, {values?.order?.shippingAddress?.city}, {values?.order?.shippingAddress?.state}, {values?.order?.shippingAddress?.country},<br />{values?.order?.shippingAddress?.postalCode}
                  </td>
                  <td>{values?.order?.shippingAddress?.email}</td>
                  <td>{values?.userType[0]}</td>
                  <td>
                    {values?.order?.billingAddress?.address ? (
                      <>
                        {values?.order?.billingAddress?.address}, {values?.order?.billingAddress?.apt}, {values?.order?.billingAddress?.city}, {values?.order?.billingAddress?.state}, {values?.order?.billingAddress?.country},<br />{values?.order?.billingAddress?.postalCode}
                      </>
                    ) : (
                      <>same as shipping address</>
                    )}
                  </td>
                  <td>{values.order.orderItems.map((val) => <div key={val._id}>{val.name}</div>)}</td>
                  <td>{values.stripeData.map((valus) => <div key={valus._id}>{valus?.items?.data[0]?.plan?.interval_count} {valus?.items?.data[0]?.plan?.interval}s</div>)}</td>
                  <td>{values?.stripeData?.map((valm, inn) => ((values?.order?.orderItems[inn]?.itemTotalPrice - values?.order?.orderItems[inn]?.itemTotalPrice * (valm?.discount?.coupon?.percent_off / 100) + values?.order?.shippingPrice + values?.order?.orderItems[inn]?.taxPercent) || 0).toFixed(2)).join(', ')}</td>
                  <td>{values.stripeData.map((item) => <div key={item._id}>{item?.items?.data[0]?.quantity}</div>)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      
    <br/>
     {/* bootstrap pagination  */}
     <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop:'0px'
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

    </div>
  );
}

export default Subscriptionlist;
