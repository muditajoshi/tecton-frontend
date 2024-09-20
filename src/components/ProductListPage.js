import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../skeleton/Loader';
import Message from '../skeleton/Message';
import "../css/productListPage.css"
import {
	listProducts,
	deleteProduct,
	createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../skeleton/Paginate';
import { refreshLogin, getUserDetails } from '../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle,faTrash,faEdit,faPlus } from '@fortawesome/free-solid-svg-icons';
import useDocumentTitle from './useDocumentTitle';

const ProductListPage = ({ history, match }) => {
	useDocumentTitle("Productlist - Tecton")
	const pageNumber = match.params.pageNumber || 1;
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, products, error, pages, page } = productList?.state || productList;
	// console.log(productList)

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		success: successCreate,
		error: errorCreate,
		product: createdProduct,
	} = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	// fetch user login info
	useEffect(() => {
		userInfo
			? userInfo.isSocialLogin
				? dispatch(getUserDetails(userInfo.id))
				: dispatch(getUserDetails('profile'))
			: dispatch(getUserDetails('profile'));
	}, [userInfo, dispatch]);

	// refresh token for expired access tokens
	useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);

	useEffect(() => {
		if (!userInfo.isAdmin) history.push('/login');
		dispatch({ type: PRODUCT_CREATE_RESET }); //reset the new product detail
		if (successCreate)
			history.push(`/admin/product/${createdProduct._id}/edit`);
		else dispatch(listProducts('', pageNumber, 10)); // 3rd parameter is the no of products to be listed per page
	}, [
		dispatch,
		history,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	]);

	// delete product after confirming
	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this product?'))
			dispatch(deleteProduct(id));
	};
	// create a new dummy product
	const handleCreateProduct = () => {
		dispatch(createProduct());
	};
	// console.log(products)
	return (
		<div className='productListPage'>
			<Row className='align-items-center'>
				<div className='col-sm-8'>
				<Col >
					<h1 className='productListPage_heading'>Products</h1>
				</Col>
				</div>
				<div className='col-sm-4'>
				<Col >
					{/* <Button
					className='productListPage_createButton'
						// className='my-3'
						// style={{
						// 	padding: '0.5em 1em',
						// 	marginTop:"100px"
						// }}
						onClick={handleCreateProduct}>
							<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>&nbsp;
						Create Product
					</Button> */}
				</Col>
				</div>
			</Row>
			{errorDelete && (
				<Message dismissible variant='danger' duration={10}>
					{errorDelete}
				</Message>
			)}
			{errorCreate && (
				<Message dismissible variant='danger' duration={10}>
					{errorCreate}
				</Message>
			)}
			{loading || loadingCreate || loadingDelete ? (
				<Loader />
			) : error ? (
				<Message dismissible variant='danger' duration={10}>
					{error}
				</Message>
			) : (
				<>
					<Table
						striped
						bordered
						responsive
						className='table-sm text-center'>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th>ACTION</th>
							</tr>
						</thead>
						<tbody>
							{products &&
								products.map((product) => {
									return (
										<tr key={product._id}>
											<td>{product?._id}</td>
											<td>{product?.name}</td>
											<td>
												{product?.price &&
													product?.price.toLocaleString(
														'en-IN',
														{
															maximumFractionDigits: 2,
															style: 'currency',
															currency: 'USD',
														}
													)}
											</td>
											<td>{product?.category}</td>
											<td>{product?.brand}</td>

											<td
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent:
														'space-around',
												}}>
												<LinkContainer
													to={`/admin/product/${product._id}/edit`}>
													<Button
														variant='link'
														className='btn-sm'>
														<FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
													</Button>
												</LinkContainer>
												<Button
													className='btn-sm'
													onClick={() =>
														handleDelete(
															product._id
														)
													}
													variant='danger'>
													<FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
												</Button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</div>
	);
};

export default ProductListPage;
