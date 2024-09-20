/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
import { confirmUser } from '../actions/userActions';
// import Meta from '../components/Meta';

const ConfirmPage = ({ match, history }) => {
	const dispatch = useDispatch();
	const userConfirm = useSelector((state) => state.userConfirm); // get the userInfo to check if user is confirmed or not
	const { loading, error, isConfirmed } = userConfirm;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (userInfo) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	useEffect(() => {
		// confirm user once the email token is available
		dispatch(confirmUser(match.params.token, isLoggedIn));
	}, [dispatch, match, isLoggedIn]);

	if (loading || (!isConfirmed && !error)) {
		// return <Loader />;
	} else if (error) {
		// redirect to login page after a 10 seconds
		setTimeout(() => {
			history.push('/login');
		}, 10000);
		// return (
		// 	<Message dismissible variant='danger' duration={10}>
		// 		Verfication Failed. Please try to login again.
		// 	</Message>
		// );
	} else if (isConfirmed) {
		// set a variable in local storage to fill email aftrer redirecting to login page after email confirmation
		localStorage.setItem('fillEmailOnLoginPage', 'true');
		return (
			<Card style={{ border: 'none', margin: '100 auto' }}>
				{/* <Meta title='Confirm Password | Kosells' /> */}
				<Card.Body>
					<Card.Title> <div className="Signinthree container">
          
		  <form>
			<div class="mb-3">
			  <label for="exampleInputEmail1" class="form-label" style={{color:"orange"}}><h3><b>Sign up</b></h3></label>
			</div>
			<div class="mb-2">
			  <label for="exampleInputPassword1" class="form-label"><b>Verification Done ✅</b></label>
		  
			</div>
		  
			<div class="mb-4  ">
			{/* <label for="exampleInputPassword1" class="form-label">Please check your email to verify your account.</label> */}
			</div>
		  
			{/* <div class="mb-2">
			  <label for="exampleInputPassword1" class="form-label"><b>Verification Code</b></label>
			</div> */}
			{/* <div class="vbox">
				<input name='code' class='code-input' required/>
				<input name='code' class='code-input' required/>
				<input name='code' class='code-input' required/>
				<input name='code' class='code-input' required/>
				<input name='code' class='code-input' required/>
				<input name='code' class='code-input' required/>
			  </div> */}
		  
			{/* <button type="submit" class="btn px-5 py-2" style={{backgroundColor:"orange",color:"white"}}>LETS GO</button> */}
			<div class="mt-3">
			  <label for="exampleInputPassword1" class="form-label" ><span style={{color:"black"}}>{setIsLoggedIn
							? 'Your account has been successfully verified!'
							: `Your account has been successfully verified! Please
						login and start exploring the best deals on all your
						favorite products.`}
					
					</span></label>
					{!setIsLoggedIn ? <Link to="/login">Login</Link> : null}
					<br />
					<br />
					<Link to="/login"><button class="btn px-5 py-2" style={{backgroundColor:"orange",color:"white"}}>Login</button></Link>
		  
			</div>
		  </form>
		  
				  </div></Card.Title>
					
						
				</Card.Body>
			</Card>
		);
	}
};

export default ConfirmPage;
