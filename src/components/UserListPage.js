import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import Loader from "../skeleton/Loader";
import Message from "../skeleton/Message";
import getDateString from "../utils/getDateString";
import { listAllUsers, deleteUser, refreshLogin } from "../actions/userActions";
import Paginate from "../skeleton/Paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import editimg from "../images/edit.png"
import {
  faCircle,
  faTrash,
  faEdit,
  faPlus,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import useDocumentTitle from "./useDocumentTitle";

import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import Pagination from "react-bootstrap/Pagination";



const UserListPage = ({ match, history }) => {
  useDocumentTitle("All Users");
  const pageNumber = match.params.pageNumber || 1; // to fetch various pages of orders
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error, page, pages, total } = userList;
  console.log(users)
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;
  // console.log(userDetails)
  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) dispatch(listAllUsers(pageNumber));
    else history.push("/login");
  }, [dispatch, history, userInfo, successDelete, pageNumber]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete user?"))
      dispatch(deleteUser(id));
  };

  // handle edit row functionality
  console.log(users);
  
 
 
   // download file  functionalities for the userList  here 

  const convertToCSV = (users) => {
    const headers = "user Id,firstName,lastName,email,signup date,isConfirmed,isAdmin ";
    const rows = users.map(obj => {
    const {_id,firstName,lastName,email,createdAt,isConfirmed,isAdmin } = obj;
  
    return `${_id},${firstName},${lastName},${email},"${getDateString(createdAt)}",${isConfirmed},${isAdmin}`;
    });
    return [headers, ...rows].join('\n');
  };

   const handleDownloadUserList = (users) => {
   const csvData = convertToCSV(users);
   console.log(csvData);
   const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
   const link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   link.download = 'rowData.csv';
   link.click();
 };

//  bootstrap pagination functionalities here

  // const [currentPageUser, setCurrentPageUser] = useState(1);
  // const postsPerPageUser = 40;
  // const indexOfLastPostUser = currentPageUser * postsPerPageUser;
  // const indexOfFirstPostUser = indexOfLastPostUser - postsPerPageUser;
  // const currentRecordsUsers = users.slice(indexOfFirstPostUser, indexOfLastPostUser);
  // const nPageUser = Math.ceil( users.length / postsPerPageUser);
  // const numbersofUsers = [...Array(nPageUser + 1).keys()].slice(1);

  // const PrevPage = () => {
  //   if (currentPageUser !== 1) {
  //     console.log("clicked");
  //     setCurrentPageUser(currentPageUser - 1);
  //   }
  // };
  // const NextPage = () => {
  //   if (currentPageUser !== nPageUser) {
  //     setCurrentPageUser(currentPageUser + 1);
  //   }
  // };
  // const changeCpage = (i) => {
  //   setCurrentPageUser(i);
  // };
  // const FirstPage = () => {
  //   setCurrentPageUser(1);
  // };
  // const LastPage = () => {
  //   setCurrentPageUser(nPageUser);
  // }; 

  return (
    <div className="productListPage">
     <div style={{width:'92vw', display:'flex',justifyContent: 'space-between',alignItems: 'center ' }}>
      <h1 className="productListPage_heading">Users ({`${total || 0}`})</h1>
      <FontAwesomeIcon  onClick={() => handleDownloadUserList(users)}   icon={faFileExport} style={{ color: 'orange',marginRight:'10px', marginTop:'90px', cursor:'pointer', fontSize:'25px'}}  />
      </div>
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
              <th>USER ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>SIGNUP DATE</th>
              <th>CONFIRMED</th>
              <th>ADMIN</th>
              <th>DELETE</th>

            {/* adding the edit buttons for user editing */}
              {/* <th>EDIT</th> */}
            </tr>
          </thead>
          <tbody>
            {users && 
              users?.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>
                      {user?.firstName} {user?.lastName}
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{getDateString(user?.createdAt)}</td>
                    <td>
                      {user.isConfirmed ? (
                        <FontAwesomeIcon
                          style={{ color: "green" }}
                          icon={faCheck}
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          style={{ color: "red" }}
                          icon={faTimes}
                        ></FontAwesomeIcon>
                      )}
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <FontAwesomeIcon
                          style={{ color: "green" }}
                          icon={faCheck}
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          style={{ color: "red" }}
                          icon={faTimes}
                        ></FontAwesomeIcon>
                      )}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </Button>
                    </td>
                    {/* <td>
                      <button style={{border:'none', curser:'pointer'}} onClick={()=>handleEditUser(user._id)} >
                        <img src={editimg} alt="loading" height={'30px'} width={'35px'}
                        style={{border:'none', background:'none', backgroundColor:'none'}}
                        
                        ></img>
                      </button>
                    </td> */}
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
	  <br/>
	  <br/>
	   <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Paginate pages={pages} page={page} isAdmin={true} forUsers={true} />
	  </div>
	  <br/>
	  <br/>

       {/* bootstrap pagination  */}
 
        {/* <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Pagination size="lg">
           <Pagination.First onClick={FirstPage} /> 
           <Pagination.Prev onClick={PrevPage} /> 
          <Pagination.Ellipsis />
          {numbersofUsers.map((num, i) => (
            <Pagination.Item key={i} onClick={() => changeCpage(i)}>
              {num}
            </Pagination.Item>
          ))}
          <Pagination.Ellipsis />
           <Pagination.Next onClick={NextPage} /> 
           <Pagination.Last onClick={LastPage} /> 
        </Pagination>
       </div>  */}
    </div>
  );
};

export default UserListPage;
