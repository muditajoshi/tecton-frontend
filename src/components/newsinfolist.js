import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import "../css/productListPage.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NewsInfoList = () => {

    const [news,setNews] = useState("")
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_PROXY_URL}/api/news/get-all-news`).then((res)=>{
            // console.log(res.data.news);
            setNews(res.data.news)
          })
    },[])
    const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = userInfo?.isSocialLogin
    ? {
        headers: {
          Authorization: `SocialLogin ${userInfo?.id}`,
        },
      }
    : {
        headers: {
          Authorization: `Bearer ${userInfo?.accessToken}`,
        },
      };
    return (
    
            <div className='productListPage'>
                <Row className='align-items-center'>
                    <div className='col-sm-8'>
                        <Col >
                            <h1 className='productListPage_heading'>News Information</h1>
                        </Col>
                    </div>
                    <div className='col-sm-4'>
                        <Col >
                            <Link to="/admin/createNews"><Button
                                className='productListPage_createButton'>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>&nbsp;
                                Create News Tab
                            </Button></Link>
                        </Col>
                    </div>
                </Row>
                <>
                <Table
                    striped
                    bordered
                    responsive
                    className='table-sm text-center'>
                    <thead>
                        <tr>
                            <th>IMAGE</th>
                            <th>DESCRIPTION</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {news &&
								news.map((val) => {
									return (
										<tr>
                            {/* <td><a href={`${val?.img}`} target='blank'>click here</a></td> */}
                            <td><img src={`${val?.img}`} width="50"></img></td>
                            <td>{val?.newsDescription}</td>
                            <td
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent:
                                        'space-around',
                                }}>
                                <Link to={`/admin/editnews/${val?._id}`}><Button
                                        variant='link'
                                        className='btn-sm'>
                                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                    </Button> </Link>
                                     
                                <Button
                                    className='btn-sm'
                                    variant='danger'
                                    onClick={()=>{
                                        if (window.confirm('Are you sure you want to delete this news?'))
                                        axios.delete(`${process.env.REACT_APP_PROXY_URL}/api/news/delete-news/${val?._id}`,config).then((res)=>{
                                            axios.get(`${process.env.REACT_APP_PROXY_URL}/api/news/get-all-news`).then((res)=>{
                                                setNews(res.data.news)
                                              })
                                          })
                                    }}
                                    >
                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                </Button>
                            </td>
                        </tr>
									);
								})}
                        
                    </tbody>
                </Table>
                </>
            </div>
    )
}
export default NewsInfoList;
