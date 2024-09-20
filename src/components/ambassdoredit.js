import React, { useEffect } from 'react';
import { Form, Button, Image, FloatingLabel, Row, Col } from "react-bootstrap";
import "../css/productEditPage.css";
import { Link } from "react-router-dom";
import FormContainer from "../skeleton/FormContainer";
import { useState, useRef  } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Ambassdoredit = ({history,match}) => {
    

    const [name, setName] = useState("image");
    const [firstName, setFirstName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [linkToTheAmbassador, setLinkToTheAmbassador] = useState("");
  const [followers, setFollowers] = useState("");
  const [whyTecton, setWhyTecton] = useState("");
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

      useEffect(()=>{
        axios.get(`${process.env.REACT_APP_PROXY_URL}/api/carousel/get-carousel-by-id/${match.params.id}`,config).then((res)=>{
            console.log(res.data.data);
            setFirstName(res.data.data.firstName);
            setDescription(res.data.data.description);
            setImage(res.data.data.image);
            setLinkToTheAmbassador(res.data.data.linkToTheAmbassador);
            setFollowers(res.data.data.socialMedia.followers);
            setWhyTecton(res.data.data.whyTecton)

          })
      },[])

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
    if(!firstName || !description || !image || !linkToTheAmbassador || !followers || !whyTecton ){
        window.alert("please fill the form with complete details")
    }
    else{// console.log(image)  
        axios.put(`${process.env.REACT_APP_PROXY_URL}/api/carousel/update-carousel/${match?.params?.id}`,{
            firstName,
            description,
            image,
            linkToTheAmbassador,
            followers,
            whyTecton,
        },config).then((res)=>{
          history.push("/admin/AmbassdorsTestimonialList")
        })}
    

  };
   


    return (
        <div>
            <div className="productEditPage">
                <Link to="/admin/ambassdorstestimoniallist">
                    <Button className="mt-3 productEditPage_backButton">Go Back</Button>
                </Link>
                <FormContainer style={{ marginTop: "-2em" }}>
                    <h1 className="productEditPage_heading"> Update Ambassdor's Testimonial</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name">
                            <FloatingLabel
                                controlId="nameinput"
                                label={firstName?"":"Ambassador's Name"}
                                className="mb-3"
                            >
                                <Form.Control
                                    size="lg"
                                    placeholder=""
                                    type="text"
                                    aria-required={true}
                                    value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="shortdesc">
                            <FloatingLabel
                                controlId="shortdesc"
                                label={description?"":"Ambassador's Short Description"}
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
                        <Form.Group controlId="description">
                            <FloatingLabel
                                controlId="description"
                                label={whyTecton?"":"Ambassador's review"}
                                className="mb-3"
                            >
                                <Form.Control
                                    size="lg"
                                    placeholder=""
                                    type="text"
                                    value={whyTecton}
                      onChange={(e) => setWhyTecton(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group controlId="followers">
                            <FloatingLabel
                                controlId=" Ambassador's Followers"
                                label={followers?"":"Followers"}
                                className="mb-3"
                            >
                                <Form.Control
                                    size="lg"
                                    placeholder=""
                                    type="text"
                                    value={followers}
                      onChange={(e) => setFollowers(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        {/* <Form.Group controlId="ButtonText">
                            <FloatingLabel
                                controlId="ButtonText"
                                label="Button Text"
                                className="mb-3"
                            >
                                <Form.Control
                                    size="lg"
                                    placeholder=""
                                    type="text"
                                //   value=
                                />
                            </FloatingLabel>
                        </Form.Group> */}
                        <Form.Group controlId="ButtonLink">
                            <FloatingLabel
                                controlId="ButtonLink"
                                label={linkToTheAmbassador?"":"Button Link"}
                                className="mb-3"
                            >
                                <Form.Control
                                    size="lg"
                                    placeholder=""
                                    type="text"
                                    value={linkToTheAmbassador}
                                    onChange={(e) => setLinkToTheAmbassador(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        {uploading ? (
                  <div>Uploading...</div>
                ) : (
              <Form.Group controlId="image">
                    <Row>
                      <Col md={9}>
                        <FloatingLabel
                          controlId="imageinput"
                          label={image?"":"Image URL"}
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

export default Ambassdoredit;
