import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import Loader from "../skeleton/Loader";
import Message from "../skeleton/Message";
import { listAllUsers, deleteUser, refreshLogin } from "../actions/userActions";
import Paginate from "../skeleton/Paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import useDocumentTitle from "./useDocumentTitle";
import getDateString from "../utils/getDateString";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import AdminNavList from "./AdminNavList";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
const EmployeeList = ({ match, history }) => {
  useDocumentTitle("Employees - Tecton");
  useEffect(() => {
    if (userInfo?.isAdmin === false) {
      history.push("/");
    }
  });
  const [empList, setEmpList] = useState();
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error, page, pages, total } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
  };
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;
  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);
  // fetch data
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/users/employee`, config)
      .then((val) => {
        setEmpList(val?.data?.employees);
      });
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete user?"))
      dispatch(deleteUser(id));
  };
  const convertToCSV = (empList) => {
    const headers =
      "ID,Name,Email,Employee ID,Signup Date,Referrer Name,ReferrerEmail,ReferrerPhoneNo,SubUserType,Approval";
    const rows = empList.map((values) => {
      const {
        _id,
        firstName,
        lastName,
        email,
        userMetaData,
        createdAt,
        referrerFirstName,
        referrerLastName,
        referrerEmail,
        referrerPhoneNo,
        signUpAsFriendsAndfamily,
        signUpAsEmployee,
        // Add the signup date field
      } = values;
      const employeeId = userMetaData[0]?.employee?.id;
      const isApproved = userMetaData[0]?.employee?.isApproved;
      const approvalStatus = isApproved ? "Approved" : "Pending Approval";
      const subUserType =
        signUpAsFriendsAndfamily
          ? "Friend"
          : signUpAsEmployee
          ? "Employee"
          : "";

    const formattedReferrerFirstName = referrerFirstName || "";
    const formattedReferrerLastName = referrerLastName || "";
    const formattedReferrerEmail = referrerEmail || "";
    const formattedReferrerPhoneNo = referrerPhoneNo || "";
    return `${_id},"${firstName} ${lastName}",${email},${employeeId},"${getDateString(createdAt)}",${formattedReferrerFirstName},${formattedReferrerLastName},${formattedReferrerEmail},${formattedReferrerPhoneNo},${subUserType},${approvalStatus}`;
  });
    return [headers, ...rows].join("\n");
  };
  
  
  const handleDownloadEmployeeList = () => {
    const csvData = convertToCSV(empList);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "employeeData.csv";
    link.click();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentRecords = empList
    ? empList.slice(indexOfFirstPost, indexOfLastPost)
    : [];
  const nPage = empList ? Math.ceil(empList.length / postsPerPage) : 0;
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
    <div className="productListPage">
      <div class="row">
        <div class="co">
          <AdminNavList />
        </div>
        <div class="col-">
          <h1 style={{ marginTop: "50px" }} className="productListPage_heading">
            Employee, F&F List ({`${empList?.length || 0}`})
          </h1>
          <FontAwesomeIcon
            onClick={handleDownloadEmployeeList}
            icon={faFileExport}
            style={{ color: "orange", cursor: "pointer", fontSize: "25px" }}
          />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message dismissible variant="danger" duration={10}>
              {error}
            </Message>
          ) : (
            <>
              <Table
                striped
                bordered
                responsive
                className="table-sm text-center"
              >
                <thead>
                  <tr>
                    <th>USER ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>SIGNUP DATE</th>
                    <th>EMPLOYEE ID</th>
                    <th>SUB USER TYPE</th>
                    <th>EMPLOYEE REFERRER FIRST-NAME</th>
                    <th>EMPLOYEE REFERRER LAST-NAME</th>
                    <th>EMPLOYEE REFERRER PHONE.No.</th>
                    <th>EMPLOYEE REFERRER EMAIL</th>

                    <th>APPROVAL</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords &&
                    currentRecords?.map((values) => {
                      return (
                        <tr key={values?._id}>
                          <td>{values?._id}</td>
                          <td>
                            {values?.firstName} {values?.lastName}
                          </td>
                          <td>{values?.email}</td>
                          <td>{getDateString(values?.createdAt)}</td>
                          <td>{values?.userMetaData[0]?.employee?.id}</td>
                          <td>
                            {values?.signUpAsFriendsAndfamily 
                              ? "Friend"
                              : values?.signUpAsEmployee
                              ? "Employee"
                              : ""} 
                             

                          </td>
                          <td>{values?.referrerFirstName}</td>
                          <td>{values?.referrerLastName}</td>
                          <td>{values?.referrerPhoneNo}</td>
                          <td>{values?.referrerEmail}</td>
                          <td
                            style={{
                              display: "flex",
                              justifyContent: "space-evenly",
                            }}
                          >
                            {values?.userMetaData[0]?.employee?.isApproved ===
                            true ? (
                              <>approved</>
                            ) : (
                              <>
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  style={{
                                    color: "lightgreen",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    axios
                                      .post(
                                        `${process.env.REACT_APP_PROXY_URL}/api/users/approval-vet-emp`,
                                        {
                                          id: values._id,
                                          isApproved: true,
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
                                  icon={faXmark}
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={() => {
                                    axios
                                      .post(
                                        `${process.env.REACT_APP_PROXY_URL}/api/users/approval-vet-emp`,
                                        {
                                          id: values._id,
                                          isApproved: false,
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
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </>
          )}
        </div>
        {/* bootstrap pagination  */}

        {/* bootstrap pagination  */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination size="lg">
            <Pagination.First onClick={FirstPage} />
            <Pagination.Prev onClick={PrevPage} />
            <Pagination.Ellipsis />
            {numbers.map((num) => (
              <Pagination.Item
                key={num}
                active={num === currentPage}
                onClick={() => changeCpage(num)}
              >
                {num}
              </Pagination.Item>
            ))}
            <Pagination.Ellipsis />
            <Pagination.Next onClick={NextPage} />
            <Pagination.Last onClick={LastPage} />
          </Pagination>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};
export default EmployeeList;
