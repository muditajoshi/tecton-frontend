import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Row, Col } from "react-bootstrap";
import useDocumentTitle from "./useDocumentTitle";



function Contactlist({history}){
  useDocumentTitle("contactlist - Tecton")
  useEffect(()=>{
    if(userInfo?.isAdmin===false){
history.push("/")
    }
})
    const[stateamb,setstateamb]=useState("")
    const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.accessToken}`,
        },
    };

    useEffect(()=>{
        axios
          .get(`${process.env.REACT_APP_PROXY_URL}/api/contact`,config).then((val)=>setstateamb(val?.data?.ContactUsData))
          
    },[])
    // console.log(stateamb)
    
return(
    <div className="orderListPage">
  <h1 className="orderListPage_heading">
    People who contacted&nbsp;({stateamb?.length})
  </h1>
  <Table striped bordered responsive className="table-sm text-center">
  <thead>
            <tr>
            <th>FIRSTNAME</th>
            <th>LASTNAME</th>
              <th>EMAIL</th>
              <th>HOW CAN WE HELP YOU</th>
              <th>MESSAGE</th>
              
			        </tr>
          </thead>
          <tbody>
          {stateamb &&
              stateamb?.map((values) => {
                return (
                    <tr>
                    <td>{values?.firstName}</td>
                    <td>{values?.lastName}</td>
                    <td>{values?.email}</td>
                    <td>{values?.howCanWeHelpYou}</td>
                    <td>{values?.message}</td>
                    
                    </tr>
                    
                 
                );
              })}
          </tbody>
          </Table>
    </div>
)
}


export default Contactlist;