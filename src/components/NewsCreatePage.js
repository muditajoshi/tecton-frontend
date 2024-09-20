import React, { useRef, useState } from 'react';
import { Form, Button, Image, FloatingLabel, Row, Col } from "react-bootstrap";
import "../css/productEditPage.css";
import { Link } from "react-router-dom";
import FormContainer from "../skeleton/FormContainer";
import axios from 'axios';
import { useSelector } from 'react-redux';

const NewsCreatePage = ({history}) => {
  const [name, setName] = useState("image");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorImageUpload, setErrorImageUpload] = useState("");
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

  const inputFile = useRef(null);

  const handleImageClick = () => {
    inputFile.current.click();
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!description || !image || !link){
      window.alert("please fill the form with complete details")
    }
    else{
      // console.log(image)  
    axios.post(`${process.env.REACT_APP_PROXY_URL}/api/news/create-news`,{
      newsDescription:description,
      img:image,
      newsLink:link
    },config).then((res)=>{
      history.push("/admin/news")
    })
    }

  };


  return (
    <div>
      <div className="productEditPage">
      <Link to="/admin/news">
        <Button className="mt-3 productEditPage_backButton">Go Back</Button>
      </Link>
      <FormContainer style={{ marginTop: "-2em" }}>
        <h1 className="productEditPage_heading"> Create News Section</h1>
              <Form onSubmit={handleSubmit}>
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
                            placeholder=""
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
                  </Form.Group>)}
                <Form.Group controlId="description">
                  <FloatingLabel
                    controlId="description"
                    label="Description"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder=""
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>    
                <Form.Group controlId="link">
                  <FloatingLabel
                    controlId="link"
                    label="Link"
                    className="mb-3"
                  >
                    <Form.Control
                      size="lg"
                      placeholder=""
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group> 
                <Button
                    type="submit"
                    className="productEditPage_updateButton"
                  >
                    Continue
                  </Button>    
               </Form>
      </FormContainer>
    </div>
    </div>
  )
}

export default NewsCreatePage;
