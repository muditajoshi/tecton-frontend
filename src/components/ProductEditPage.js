import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Image, FloatingLabel, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";
import "../css/productEditPage.css";
// import Loader from '../components/Loader';
// import Message from '../components/Message';
import { refreshLogin, getUserDetails } from "../actions/userActions";

import FormContainer from "../skeleton/FormContainer";

const ProductEditPage = ({ match, history }) => {
  // all variable for stroing product details
  const productId = match.params.id;
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [section_image, setSectionImage] = useState("");
  const [full_description, setFull_description] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [number_of_cans, setNumberOfCans] = useState();
  const [price, setPrice] = useState(0.0);
  const [countInStock, setCountInStock] = useState(0);
  const [subscription , setSubscription] = useState(false);

  // to upload product image
  const [uploading, setUploading] = useState(false);

  const [uploading1, setUploading1] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [uploading3, setUploading3] = useState(false);
  const [uploading4, setUploading4] = useState(false);
  const [uploading5, setUploading5] = useState(false);
  const [errorImageUpload, setErrorImageUpload] = useState("");
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  // fetch user login details
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  // fetch new access tokens if user details fail, using the refresh token
  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  useEffect(() => {
    dispatch(listProductDetails(productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update the product details in state
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setImage1(product.image1);
        setImage2(product.image2);
        setImage3(product.image3);
        setImage4(product.image4);
        setSectionImage(product.section_image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setFull_description(product.full_description);
        setIngredients(product.ingredients);
        setNutrition(product.nutrition);
        setCountInStock(product.countInStock);
        setNumberOfCans(product.number_of_cans);
        setSubscription(product.subscription)
      }
    }
  }, [product, dispatch, productId, history, successUpdate]);

  // submit the product details
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        brand,
        price,
        category,
        description,
        countInStock,
        image,
        image1,
        image2,
        image3,
        image4,
        section_image,
        full_description,
        ingredients,
        nutrition,
        number_of_cans,
        subscription
      })
    );
  };

  // for image input, use a ref
  const inputFile = useRef(null);

  // click the above ref, to handle the overlay div above the product image
  const handleImageClick = () => {
    inputFile.current.click();
  };

  // submit file to aws bucket, get the url
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}/api/upload`,
        formData,
        config
      );
      setImage(data);
      // console.log(image);
      setUploading(false);
    } catch (error) {
      setErrorImageUpload("Please choose a valid image");
      setUploading(false);
    }
  };

  // Image 1
  // for image input, use a ref
  const inputFile1 = useRef(null);

  // click the above ref, to handle the overlay div above the product image
  const handleImageClick1 = () => {
    inputFile1.current.click();
  };

  // submit file to aws bucket, get the url
  const handleFileUpload1 = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    setUploading1(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}/api/upload`,
        formData,
        config
      );
      setImage1(data);
      // console.log(image);
      setUploading1(false);
    } catch (error) {
      setErrorImageUpload("Please choose a valid image");
      setUploading1(false);
    }
  };

  // Image 2
  // for image input, use a ref
  const inputFile2 = useRef(null);

  // click the above ref, to handle the overlay div above the product image
  const handleImageClick2 = () => {
    inputFile2.current.click();
  };

  // submit file to aws bucket, get the url
  const handleFileUpload2 = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    setUploading2(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}/api/upload`,
        formData,
        config
      );
      setImage2(data);
      setUploading2(false);
    } catch (error) {
      setErrorImageUpload("Please choose a valid image");
      setUploading2(false);
    }
  };
  // Image 3
  // for image input, use a ref
  const inputFile3 = useRef(null);

  // click the above ref, to handle the overlay div above the product image
  const handleImageClick3 = () => {
    inputFile3.current.click();
  };

  // submit file to aws bucket, get the url
  const handleFileUpload3 = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    setUploading3(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}/api/upload`,
        formData,
        config
      );
      setImage3(data);
      setUploading3(false);
    } catch (error) {
      setErrorImageUpload("Please choose a valid image");
      setUploading3(false);
    }
  };

  // Image 4
  // for image input, use a ref
  const inputFile4 = useRef(null);

  // click the above ref, to handle the overlay div above the product image
  const handleImageClick4 = () => {
    inputFile4.current.click();
  };

  // submit file to aws bucket, get the url
  const handleFileUpload4 = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    setUploading4(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}/api/upload`,
        formData,
        config
      );
      setImage4(data);
      setUploading4(false);
    } catch (error) {
      setErrorImageUpload("Please choose a valid image");
      setUploading4(false);
    }
  };

  // Section Image
  // for image input, use a ref
  const inputFile5 = useRef(null);

  // click the above ref, to handle the overlay div above the product image
  const handleImageClick5 = () => {
    inputFile5.current.click();
  };

  // submit file to aws bucket, get the url
  const handleFileUpload5 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading5(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}/api/upload`,
        formData,
        config
      );
      setSectionImage(data);
      setUploading5(false);
    } catch (error) {
      setErrorImageUpload("Please choose a valid image");
      setUploading5(false);
    }
  };

  return (
    <div className="productEditPage">
      <Link to="/admin/productlist">
        <Button className="mt-3 productEditPage_backButton">Go Back</Button>
      </Link>
      <FormContainer style={{ marginTop: "-2em" }}>
        <h1 className="productEditPage_heading">Edit Product</h1>
        {loadingUpdate ? (
          // <Loader />""
          ""
        ) : errorUpdate ? (
          { errorUpdate }
        ) : (
          <>
            {loading ? (
              // <Loader />
              ""
            ) : (
              <Form onSubmit={handleSubmit}>
                {error && { error }}
                <Form.Group controlId="name">
                  <FloatingLabel
                    controlId="nameinput"
                    label="Name"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="price">
                  <FloatingLabel
                    controlId="priceinput"
                    label="Price"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter price"
                      type="number"
                      value={price}
                      // min="0"
                      // max="1000"
                      // step="0.1"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                {errorImageUpload && errorImageUpload}
                {uploading ? (
                  <div>Uploading...</div>
                ) : (
                  <Form.Group controlId="image">
                    <Row>
                      <Col md={9}>
                        <FloatingLabel
                          controlId="imageinput"
                          label="Image URL"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            placeholder="Enter image URL"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={3}>
                        <input
                          accept="image/*"
                          type="file"
                          id="file"
                          name="image"
                          ref={inputFile}
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                        <div
                          className="profile-page-image"
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            src={image}
                            alt={name}
                            title="Click to input file"
                            style={{
                              width: "100%",
                              border: "1px solid #ced4da",
                              marginBottom: "1em",
                              cursor: "pointer",
                              borderRadius: "0.25rem",
                            }}
                          />
                          <div
                            className="image-overlay-product"
                            onClick={handleImageClick}
                          >
                            Click to upload image
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {uploading1 ? (
                  <div>Uploading...</div>
                ) : (
                  <Form.Group controlId="image1">
                    <Row>
                      <Col md={9}>
                        <FloatingLabel
                          controlId="imageinput1"
                          label="Image URL"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            placeholder="Enter image URL"
                            type="text"
                            value={image1}
                            onChange={(e) => setImage1(e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={3}>
                        <input
                          accept="image/*"
                          type="file"
                          name="image1"
                          id="file"
                          ref={inputFile1}
                          onChange={handleFileUpload1}
                          style={{ display: "none" }}
                        />
                        <div
                          className="profile-page-image"
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            src={image1}
                            alt={name}
                            title="Click to input file"
                            style={{
                              width: "100%",
                              border: "1px solid #ced4da",
                              marginBottom: "1em",
                              cursor: "pointer",
                              borderRadius: "0.25rem",
                            }}
                          />
                          <div
                            className="image-overlay-product"
                            onClick={handleImageClick1}
                          >
                            Click to upload image
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {uploading2 ? (
                  <div>Uploading...</div>
                ) : (
                  <Form.Group controlId="image1">
                    <Row>
                      <Col md={9}>
                        <FloatingLabel
                          controlId="imageinput1"
                          label="Image URL"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            placeholder="Enter image URL"
                            type="text"
                            value={image2}
                            onChange={(e) => setImage2(e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={3}>
                        <input
                          accept="image/*"
                          type="file"
                          name="image2"
                          id="file"
                          ref={inputFile2}
                          onChange={handleFileUpload2}
                          style={{ display: "none" }}
                        />
                        <div
                          className="profile-page-image"
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            src={image2}
                            alt={name}
                            title="Click to input file"
                            style={{
                              width: "100%",
                              border: "1px solid #ced4da",
                              marginBottom: "1em",
                              cursor: "pointer",
                              borderRadius: "0.25rem",
                            }}
                          />
                          <div
                            className="image-overlay-product"
                            onClick={handleImageClick2}
                          >
                            Click to upload image
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {uploading3 ? (
                  <div>Uploading...</div>
                ) : (
                  <Form.Group controlId="image1">
                    <Row>
                      <Col md={9}>
                        <FloatingLabel
                          controlId="imageinput1"
                          label="Image URL"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            placeholder="Enter image URL"
                            type="text"
                            value={image3}
                            onChange={(e) => setImage3(e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={3}>
                        <input
                          accept="image/*"
                          type="file"
                          name="image3"
                          id="file"
                          ref={inputFile3}
                          onChange={handleFileUpload3}
                          style={{ display: "none" }}
                        />
                        <div
                          className="profile-page-image"
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            src={image3}
                            alt={name}
                            title="Click to input file"
                            style={{
                              width: "100%",
                              border: "1px solid #ced4da",
                              marginBottom: "1em",
                              cursor: "pointer",
                              borderRadius: "0.25rem",
                            }}
                          />
                          <div
                            className="image-overlay-product"
                            onClick={handleImageClick3}
                          >
                            Click to upload image
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {uploading4 ? (
                  <div>Uploading...</div>
                ) : (
                  <Form.Group controlId="image1">
                    <Row>
                      <Col md={9}>
                        <FloatingLabel
                          controlId="imageinput1"
                          label="Image URL"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            placeholder="Enter image URL"
                            type="text"
                            value={image4}
                            onChange={(e) => setImage4(e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={3}>
                        <input
                          accept="image/*"
                          type="file"
                          name="image4"
                          id="file"
                          ref={inputFile4}
                          onChange={handleFileUpload4}
                          style={{ display: "none" }}
                        />
                        <div
                          className="profile-page-image"
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            src={image4}
                            alt={name}
                            title="Click to input file"
                            style={{
                              width: "100%",
                              border: "1px solid #ced4da",
                              marginBottom: "1em",
                              cursor: "pointer",
                              borderRadius: "0.25rem",
                            }}
                          />
                          <div
                            className="image-overlay-product"
                            onClick={handleImageClick4}
                          >
                            Click to upload image
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {uploading5 ? (
                  <div>Uploading...</div>
                ) : (
                  <Form.Group controlId="image">
                    <Row>
                      <Col md={9}>
                        <FloatingLabel
                          controlId="imageinput"
                          label="Section Image"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            placeholder="Section Image"
                            type="text"
                            value={section_image}
                            onChange={(e) => setSectionImage(e.target.value)}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={3}>
                        <input
                          accept="image/*"
                          type="file"
                          id="file"
                          name="section_image"
                          ref={inputFile5}
                          onChange={handleFileUpload5}
                          style={{ display: "none" }}
                        />
                        <div
                          className="profile-page-image"
                          style={{
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            src={section_image}
                            alt={name}
                            title="Click to input file"
                            style={{
                              width: "100%",
                              border: "1px solid #ced4da",
                              marginBottom: "1em",
                              cursor: "pointer",
                              borderRadius: "0.25rem",
                            }}
                          />
                          <div
                            className="image-overlay-product"
                            onClick={handleImageClick5}
                          >
                            Click to upload image
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                <Form.Group controlId="brand">
                  <FloatingLabel
                    controlId="brandinput"
                    label="Brand"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter brand"
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="category">
                  <FloatingLabel
                    controlId="categoryinput"
                    label="Category"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter category"
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="description">
                  <FloatingLabel
                    controlId="descinput"
                    label="Description"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter description URL"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="description">
                  <FloatingLabel
                    controlId="descinput"
                    label="Full Description"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter full description"
                      as="textarea"
                      rows={5}
                      value={full_description}
                      onChange={(e) => setFull_description(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="description">
                  <FloatingLabel
                    controlId="descinput"
                    label="Ingredients"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter Ingredients"
                      as="textarea"
                      rows={5}
                      value={ingredients}
                      onChange={(e) => setIngredients(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="description">
                  <FloatingLabel
                    controlId="descinput"
                    label="Nutrition"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter Nutrition"
                      as="textarea"
                      rows={5}
                      value={nutrition}
                      onChange={(e) => setNutrition(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="countInStock">
                  <FloatingLabel
                    controlId="countinstockinput"
                    label="CountInStock"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter Count In Stock"
                      type="number"
                      min="0"
                      max="10000000"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="countInStock">
                  <FloatingLabel
                    controlId="countinstockinput"
                    label="Enter number of cans each pack have."
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder="Enter number of cans each pack have."
                      type="number"
                      min="0"
                      max="1000"
                      value={number_of_cans}
                      onChange={(e) => setNumberOfCans(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="subscription">
                <label for="subscription">Subscription</label>
                  {/* <FloatingLabel
                    controlId="subscriptioninput"
                    label="subscription."
                    className="mb-3" style={{marginBottom: "10px"}}
                  > </FloatingLabel> */}
                    {/* <Form.Control
                      size="lg"
                      placeholder="subscription."
                      type="select"
                      value={subscription}
                      onChange={(e) => setSubscription(e.target.value)}
                    /> */}

                       <select value={subscription}  placeholder="Subscription" class="form-control-ship-acc" style={{lineHeight:"2.3rem", width:"100%"}} onChange={(e)=>setSubscription(e.target.value)}>
                           <option  value={true} >True</option>
                           <option  value={false}>False</option>
                      </select>
                 
                </Form.Group>
                <br/>
                <div className="d-flex">
                  <Button
                    type="submit"
                    className="productEditPage_updateButton"
                  >
                    Update Product
                  </Button>
                </div>
              </Form>
            )}
          </>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditPage;
