import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Loader from '../skeleton/Loader';
import Message from '../skeleton/Message';
import { listAllUsers, deleteUser, refreshLogin } from '../actions/userActions';
import Paginate from '../skeleton/Paginate';
import Pagination from "react-bootstrap/Pagination";
import { faCheck, faXmark, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import useDocumentTitle from './useDocumentTitle';
import axios from 'axios';
import AdminNavList from './AdminNavList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const VeteranList = ({ match, history }) => {
  useDocumentTitle("Veterans - Tecton");
  useEffect(() => {
    if (userInfo?.isAdmin === false) {
      history.push("/");
    }
  });

  const [veteranList, setVeteranList] = useState();
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error, page, pages, total } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.accessToken}`,
    },
  };

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_PROXY_URL}/api/users/veteran`, config).then((res) => {
      setVeteranList(res?.data?.veterans);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete user?'))
      dispatch(deleteUser(id));
  };

  const convertToCSV = (veteranList) => {
    const headers = "ID,Name,Email,Veteran ID,Approval";
    const rows = veteranList.map((values) => {
      const { _id, firstName, lastName, email, userMetaData } = values;
      const veteranId = userMetaData[0]?.veteran?.id;
      const isApproved = userMetaData[0]?.veteran?.isApproved;
      const approvalStatus = isApproved ? "Approved" : "Pending Approval";
      return `${_id},${firstName} ${lastName},${email},${veteranId},${approvalStatus}`;
    });

    return [headers, ...rows].join('\n');
  };

  const handleDownloadVeteranList = () => {
    const csvData = convertToCSV(veteranList);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'veteranData.csv';
    link.click();
  };

 //   paginations function
 const [currentPage, setCurrentPage] = useState(1);
 const postsPerPage = 10;
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentRecords = veteranList ? veteranList.slice(indexOfFirstPost, indexOfLastPost) : [];
 const nPage = veteranList ? Math.ceil(veteranList.length / postsPerPage) : 0;
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
    <div className='productListPage'>
      <div class="row">
        <div class="co">
          <AdminNavList />
        </div>
        <div class="col-">
          <h1 style={{ marginTop: "60px" }} className='productListPage_heading'>
            Veteran List ({`${veteranList?.length || 0}`})
          </h1>
          <FontAwesomeIcon
            onClick={handleDownloadVeteranList}
            icon={faFileExport}
            style={{ color: "orange", cursor: "pointer", fontSize: "25px" }}
          />
  
          {loading ? (
            <Loader />
          ) : error ? (
            <Message dismissible variant='danger' duration={10}>
              {error}
            </Message>
          ) : veteranList ? ( // Check if veteranList is defined
            <>
              <Table striped bordered responsive className='table-sm text-center'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>VETERAN ID</th>
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
                          <td>{values?.userMetaData[0]?.veteran?.id}</td>
                          <td style={{ display: "flex", justifyContent: "space-evenly" ,cursor:"pointer"}}>
                            {values?.userMetaData[0]?.veteran?.isApproved === true ? (
                              <>approved</>
                            ) : (
                              <>
                                <FontAwesomeIcon
                                className="hoverable-icon"
                                  icon={faCheckCircle}
                                  style={{ color: "green", cursor: "pointer",fontSize:"23px" }}
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
                                className="hoverable-icon"
                                  icon={faXmarkCircle}
                                  style={{ color: "red", cursor: "pointer",fontSize:"23px" }}
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
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
  
};

export default VeteranList
