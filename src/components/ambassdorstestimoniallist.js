import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit,faPlus } from '@fortawesome/free-solid-svg-icons';
import "../css/productListPage.css";
import axios from 'axios';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Ambassdorstestimoniallist = ({history}) => {

	const [allmbassadors,setAllAmbassadors] = useState("")
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_PROXY_URL}/api/carousel/get-all-carousel`).then((res)=>{
            console.log(res.data.data);
			setAllAmbassadors(res.data.data);
            
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
    <div>
      <div className='productListPage'>
			<Row className='align-items-center'>
				<div className='col-sm-8'>
				<Col >
					<h1 className='productListPage_heading'> Ambassdors Testimonial</h1>
				</Col>
				</div>
				<div className='col-sm-4'>
				<Col >
				<Link to="/admin/createAmbassadorTestimonial">		<Button
					className='productListPage_createButton'>
							<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>&nbsp;
						Create New Testimonial
					</Button>
					</Link>
				</Col>
				</div>
			</Row>
					<Table
						striped
						bordered
						responsive
						className='table-sm text-center'>
						<thead>
							<tr>
								<th>NAME</th>
								<th>IMAGE</th>
								<th>LINK</th>
								<th>SHORT DESCRIPTION</th>
								<th>REVIEW</th>
								<th>FOLLOWERS</th>
                <th>ACTION</th>
								</tr>
						</thead>
						<tbody>
								
						{allmbassadors &&
								allmbassadors.map((val) => {
									return (
										<tr>
                           <td>{val?.firstName}</td>
						   <td><img src={`${val?.image}`} width="50"></img></td>
											<td><a href={val?.linkToTheAmbassador}>click here</a></td>
											<td>{val?.description}</td>
											<td>{val?.whyTecton}</td>
											<td>{val?.socialMedia?.followers}</td>
                            <td
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent:
                                        'space-around',
                                }}>
                                <Link to={`/admin/editAmbassdorTestimonial/${val?._id}`}><Button
                                        variant='link'
                                        className='btn-sm'>
                                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                    </Button> </Link>
                                     
                                <Button
                                    className='btn-sm'
                                    variant='danger'
                                    onClick={()=>{
                                        if (window.confirm('Are you sure you want to delete this ambassador testimonial?'))
                                        axios.delete(`${process.env.REACT_APP_PROXY_URL}/api/carousel/delete-carousel/${val?._id}`,config).then((res)=>{
                                            axios.get(`${process.env.REACT_APP_PROXY_URL}/api/carousel/get-all-carousel`).then((res)=>{
                                                setAllAmbassadors(res.data.data)
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
		</div>
    </div>
  )
}

export default Ambassdorstestimoniallist;

