import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import useDocumentTitle from "./useDocumentTitle";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import getDateString from "../utils/getDateString";

function Unsubscibesurveylist({ history }) {
  useEffect(() => {
    if (userInfo?.isAdmin === false) {
      history.push("/");
    }
  });

  const userLogin = useSelector((state) => state.userLogin);
  const [stateamb, setstateamb] = useState("");

  const { userInfo } = userLogin;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/subscription/admin/unsubscribe-list`, config)
      .then((res) => setstateamb(res.data.unsubscribe));
  }, []);

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(stateamb);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "unsubscribeData.csv";
    link.click();
  };

  const convertToCSV = (unsubscribeData) => {
    const headers = ["FIRSTNAME", "EMAIL","DATE", "REASON", "MESSAGE"];
  
    const rows = unsubscribeData.map((values) => {
      const reasons = values.reason.join(", "); // Join reasons with a comma and space
      const cleanMessage = values.message?.replace(/[\r\n]+/g, ' '); // Replace line breaks with a space
  
      const row = [values.firstName, values.email, `"${getDateString(values?.createdAt)}"`, `"${reasons}"`, `"${cleanMessage}"`];
      return row.join(",");
    });
  
    return [headers.join(","), ...rows].join("\n");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentRecords = stateamb ? stateamb.slice(indexOfFirstPost, indexOfLastPost) : [];
  const nPage = stateamb ? Math.ceil(stateamb.length / postsPerPage) : 0;
//   const currentRecords = stateamb.slice(indexOfFirstPost, indexOfLastPost);
//  const nPage = Math.ceil(stateamb.length / postsPerPage);
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
        Unsubscribe reasons&nbsp;({stateamb?.length})
      </h1>
      <FontAwesomeIcon
                onClick={handleDownloadCSV}
              icon={faFileExport}
              style={{ color: "orange", cursor: "pointer", fontSize: "25px" }}
            />
     
      <Table striped bordered responsive className="table-sm text-center">
        <thead>
          <tr>
            <th>FIRST-NAME</th>
            <th>EMAIL</th>
            <th>DATE</th>
            <th>REASON</th>
            <th>MESSAGE</th>
          </tr>
        </thead>
        <tbody>
        {currentRecords &&
              currentRecords?.map((values,index) => {
              return (
                <tr key={`${index}-${values.email}`}>
                  <td>{values.firstName}</td>
                  <td>{values.email}</td>
                  <td>{getDateString(values?.createdAt)}</td>
                  <td>
                    <div>{values.reason.map((val) => <div key={val}>{val}</div>)}</div>
                  </td>
                  <td>{values.message}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
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
    </div>
  );
}

export default Unsubscibesurveylist;
