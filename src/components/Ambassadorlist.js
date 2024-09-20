import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import useDocumentTitle from "./useDocumentTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AdminNavList from "./AdminNavList";
import "../css/orderlistpage.css";
import Pagination from "react-bootstrap/Pagination";
// add  export icon to download svg
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import getDateString from "../utils/getDateString";

function Ambassadorlist({ history }) {
  useDocumentTitle("Ambassadors - Tecton");
  useEffect(() => {
    if (userInfo?.isAdmin === false) {
      history.push("/");
    }
  });
  const [stateamb, setstateamb] = useState("");
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/ambassador`, config)
      .then((val) => {
        setstateamb(val?.data?.ambassadorsData);
        console.log("Response", val.data);
      });
  }, []);
  // console.log(stateamb)
  const [request, setRequest] = useState();
  // const appproveAmbassador=(id)=>{
  //   axios.post(`${process.env.REACT_APP_PROXY_URL}/ambassador/ambassador-approval/`,{
  //     email:id,
  //     approved:true
  //   })
  // }
  // const declineAmbassador=(id)=>{
  //   axios.post(`${process.env.REACT_APP_PROXY_URL}/ambassador/ambassador-approval/`,{
  //     email:id,
  //     approved:false
  //   })
  // }

  // download file functionality for the ambassador list here 
     console.log(stateamb);


 // download file  functionalities for the ambassador list here 

 const handleDownloadAmbassadorList = () => {
  const csvData = convertToCSV(stateamb);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'ambassadorData.csv';
  link.click();
};

const convertToCSV = (ambassadors) => {
  const headers = [
    "FIRSTNAME",
    "LASTNAME",
    "EMAIL",
    "SIGNUP DATE",
"REFERRER FIRSTNAME",
"REFERRER LASTNAME",
"REFERRER EMAIL",
    "INSTAGRAM",
    "TIK TOK",
    "TWITTER",
    "WHERE DID YOU HEAR ABOUT TECTON",
    "SHORT BIO",
    "STREET ADDRESS",
    "CITY",
    "STATE",
    "POSTAL CODE",
    "COUNTRY",
    "APPROVAL",
    "APPROVAL DATE",
    "APPROVED BY",
    "REFCODE"
  ];

  

  const rows = ambassadors.map((ambassador) => {
    const {
      firstName,
      lastName,
      email,
      createdAt,
      referrerFirstName,
      referrerLastName,
      referrerEmail,
      instagram_handle,
      tiktok_handle,
      twitter_handle,
      where_did_you_hear_about_tecton,
      short_bio,
      street_address,
      city,
      state,
      postal_code,
      country,
      approval,
      approvalTime,
      approvedBy,
      ambData
    } = ambassador;

    const cleanWhereHeard = `"${where_did_you_hear_about_tecton.replace(/"/g, '""')}"`;
    const cleanShortBio = `"${short_bio.replace(/"/g, '""')}"`;
    const streetAddressField = street_address.includes(',') ? `"${street_address}"` : street_address;
    const cityField = city.includes(',') ? `"${city}"` : city;
    const lastNameField = lastName.includes(',') ? `"${lastName}"` : lastName;
   
//  const formatRefCode = (refCode) => {
//     // Ensure refCode is a string and replace special characters
//     const cleanedRefCode = refCode?.toString()?.replace(/[,"+.]/g, '') || '';
//     return `'${cleanedRefCode}`;
//   };

  
    return [
      firstName,
      lastNameField,
      email,
     
      `"${getDateString(createdAt)}"`,
      referrerFirstName,
      referrerLastName,
      referrerEmail,
      instagram_handle,
      tiktok_handle,
      twitter_handle,
      cleanWhereHeard,
      cleanShortBio,
      streetAddressField,
      cityField,
      state,
      postal_code,
      country,
      approval,
      `"${getDateString(approvalTime)}"`,
      approvedBy,
      ambData[0]?.refCode,
      // `"${formatRefCode(ambData[0]?.refCode)}"`,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
};



 const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
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
    <>
      <div className="productListPage">
        <div class="row">
          <br />
          <div class="co">
            <AdminNavList />
          </div>
          <br />
          <div class="col-">
          <div className="orderListPage_heading_div">
            <h1 style={{ marginTop: "50px" }} className="orderListPage_heading">
              All Ambassadors &nbsp;({stateamb?.length})
            </h1>
            <FontAwesomeIcon  onClick={() => handleDownloadAmbassadorList(stateamb)}   icon={faFileExport} style={{ color: 'orange',  cursor:'pointer', fontSize:'25px'}}  />
            </div>
            <Table striped bordered responsive className="table-sm text-center">
              <thead style={{width:"20px"}}>
                <tr>
                  <th>FIRST-NAME</th>
                  <th>LAST-NAME</th>
                  <th>EMAIL</th>
                  <th>SIGNUP DATE</th>
                  <th>REFERRER-NAME</th>
                  <th>REFERRER EMAIL</th>
                  <th>INSTAGRAM</th>
                  <th>TIK TOK</th>
                  <th>TWITTER</th>
                  <th>WHERE DID YOU HEAR ABOUT TECTON</th>
                  <th>SHORT BIO</th>
                  <th>STREET ADDRESS</th>
                  <th>CITY</th>
                  <th>STATE</th>
                  <th>POSTAL CODE</th>
                  <th>COUNTRY</th>
                  <th>STATUS</th>
                  <th>APPROVAL DATE</th>
                  <th>APPROVED BY</th>
                  <th>REFCODE</th>
                </tr>
              </thead>
              <tbody>
              {currentRecords &&
              currentRecords?.map((values) => {
                    return (
                      <tr>
                        <td>{values?.firstName}</td>
                        <td>{values?.lastName}</td>
                        <td>{values?.email}</td>
                        <td>
                        {values?.createdAt && getDateString(values?.createdAt) !== 'Invalid Date' ? getDateString(values?.createdAt)  : "No Date Available"}
</td>
<td>{values?.referrerFirstName} {values?.referrerLastName}</td>
<td>{values?.referrerEmail}</td>
                        <td>{values?.instagram_handle}</td>
                        <td>{values?.tiktok_handle}</td>
                        <td>{values?.twitter_handle}</td>
                        <td>{values?.where_did_you_hear_about_tecton}</td>
                        <td>{values?.short_bio}</td>
                        <td>{values?.street_address}</td>
                        <td>{values?.city}</td>
                        <td>{values?.state}</td>
                        <td>{values?.postal_code}</td>
                        <td>{values?.country}</td>

                        <td
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly"
                            ,cursor:"pointer"
                          }}
                        >
                          {" "}
                          {values.approval ? (
                            <>{values.approval}</>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                style={{
                                  color: "green",
                                  cursor: "pointer",
                                  fontSize:"23px"
                                }}
                                onClick={() => {
                                  axios
                                    .put(
                                      `${process.env.REACT_APP_PROXY_URL}/api/ambassador/ambassador-approval`,
                                      {
                                        email: values.email,
                                        approved: true,
                                      },
                                      config
                                    )
                                    .then((res) => {
                                      if (res) {
                                        window.location.reload(false);
                                      }
                                    });
                                }}
                              />
                              &nbsp;&nbsp;&nbsp;
                              <FontAwesomeIcon
                                icon={faXmarkCircle}
                                style={{ color: "red", cursor: "pointer" ,fontSize:"23px"}}
                                onClick={() => {
                                  axios
                                    .put(
                                      `${process.env.REACT_APP_PROXY_URL}/api/ambassador/ambassador-approval`,
                                      {
                                        email: values.email,
                                        approved: false,
                                      },
                                      config
                                    )
                                    .then((res) => {
                                      if (res) {
                                        window.location.reload(false);
                                      }
                                    });
                                }}
                              />
                            </>
                          )}{" "}
                        </td>
                        <td>
  {values?.approvalTime && getDateString(values?.approvalTime) !== 'Invalid Date' ? getDateString(values.approvalTime) : ""}
</td>
                       <td>{values?.approvedBy}</td>
                        <td>{values?.ambData[0]?.refCode}</td>
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
                {numbers.map((num, i) => (
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
        </div>
      </div>
    </>
  );
}

export default Ambassadorlist;
