import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/ambassador2.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/Tecton side by side blk.png";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";

function Ambassador2() {
  const data = localStorage.getItem("userInfo");
  const data1 = JSON.parse(data);
  const inputFile = useRef(null);
  const userDetails = useSelector((state) => state?.userDetails);
  const { loading, user, error } = userDetails;
  // console.log(user)

  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload(false);
  };
  return (
    <div class="acc">
      <div class="Act"></div>
      <div id="dep2">
        <div class="row">
          <div class=" navl col-sm-1">
            <div class="contact-info">
              <div class="outl">
                <div className="header" style={{ backgroundColor: `white` }}>
                  <div className="header_logo">
                    <a
                      href="/"
                      onClick={() => ".navbar-collapse".collapse("hide")}
                    >
                      {" "}
                      <img src={Logo} alt="Logo da Marca"></img>
                    </a>
                  </div>
                  <div className="header_center headergayab">
                    <a
                      href="/true-purpose"
                      onClick={() => ".navbar-collapse".collapse("hide")}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p
                        className="ghostItem"
                        style={{
                          borderTopLeftRadius: "22px",
                          borderBottomLeftRadius: "22px",
                          color: "black",
                        }}
                      >
                        BE GREAT
                      </p>
                    </a>
                    <a
                      href="/ambassador1"
                      onClick={() => ".navbar-collapse".collapse("hide")}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p className="ghostItem" style={{ color: "black" }}>
                        AMBASSADOR
                      </p>
                    </a>
                    {/* <a  href="/science" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><p className="ghostItem" style={{color:"black"}}>SCIENCE</p></a > */}
                    <a
                      onClick={() => ".navbar-collapse".collapse("hide")}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <NavDropdown title="SCIENCE" id="basic-nav-dropdown">
                        <NavDropdown.Item href="science">
                          TECTON SCIENCE
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/sugar">
                          KETONES
                        </NavDropdown.Item>
                        {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                      </NavDropdown>
                    </a>
                    {/* <a   onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><p className="ghostItem" style={{color:"black"}}>CONTACT</p></a > */}

                    <a
                      href="/be-great"
                      onClick={() => ".navbar-collapse".collapse("hide")}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p className="ghostItem" style={{ color: "black" }}>
                        ABOUT US
                      </p>
                    </a>
                    {/* <a  href="/signup" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" style={{color:"black"}}>ACCOUNT</p></a > */}
                    <a
                      onClick={() => ".navbar-collapse".collapse("hide")}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <NavDropdown title="SHOP" id="basic-nav-dropdown">
                        <NavDropdown.Item href="allproduct">
                          SHOP ALL
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          TECTON
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                          MERCHANDISE
                        </NavDropdown.Item>
                        {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                      </NavDropdown>
                    </a>
                    {!data1?.id ? (
                      <a
                        href="/signintwo"
                        onClick={() => ".navbar-collapse".collapse("hide")}
                        style={{ textDecoration: "none", display: "none" }}
                      >
                        {" "}
                        <p className="ghostItem">ACCOUNT</p>
                      </a>
                    ) : (
                      <a
                        href="/account"
                        onClick={() => ".navbar-collapse".collapse("hide")}
                        style={{ textDecoration: "none" }}
                      >
                        <NavDropdown
                          style={{ textDecoration: "none" }}
                          title={
                            <div>
                              <img
                                src={data1?.avatar}
                                width="20px"
                                height="20px"
                                style={{ borderRadius: "10px" }}
                              ></img>
                              {/* <h1>{data?.avatar}</h1> */}
                            </div>
                          }
                          id="basic-nav-dropdown"
                        >
                          <NavDropdown.Item href="/account">
                            Profile
                          </NavDropdown.Item>
                          <NavDropdown.Item onClick={logout}>
                            <a href="/">Logout</a>
                          </NavDropdown.Item>
                          {data1?.isAdmin === true ? (
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                              <NavDropdown.Item href="/admin/productlist">
                                Product list
                              </NavDropdown.Item>
                              <NavDropdown.Item href="/admin/userlist">
                                User list
                              </NavDropdown.Item>
                              <NavDropdown.Item href="/admin/orderlist">
                                Order list
                              </NavDropdown.Item>
                              {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                            </NavDropdown>
                          ) : (
                            <NavDropdown.Item
                              style={{ display: "none" }}
                            ></NavDropdown.Item>
                          )}

                          {/* <NavDropdown.Item href="#action/3.3">MERCHANDISE</NavDropdown.Item> */}
                          {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                      </a>
                    )}

                    <a
                      href="/cart"
                      onClick={() => ".navbar-collapse".collapse("hide")}
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      <p
                        className="ghostItem"
                        style={{
                          borderTopRightRadius: "22px",
                          borderBottomRightRadius: "22px",
                        }}
                      >
                        <a href="./cart">
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            style={{ color: "black", fontWeight: "bolder" }}
                          />
                        </a>
                      </p>
                    </a>
                  </div>

                  {/* <div className="header_right">
     <p className="ghostItem">Shop</p>
    <p className="ghostItem">Account</p> 
    <p className="ghostItem">MENU</p>
  </div> */}

                  <div className="revealGhostItems">
                    <Navbar className="cont" expand={false}>
                      <Container fluid>
                        <a href="/cart">
                          <span>
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              style={{
                                color: "black",
                                fontWeight: "bolder",
                                fontSize: "30px",
                              }}
                            />
                          </span>
                        </a>
                        <Navbar.Toggle href="#" className="menu">
                          <span>
                            <FontAwesomeIcon
                              icon={faBars}
                              style={{ color: "black", fontWeight: "bolder" }}
                            />
                          </span>
                        </Navbar.Toggle>
                        <Navbar.Offcanvas
                          id="offcanvasNavbar"
                          aria-labelledby="offcanvasNavbarLabel"
                          placement="end"
                        >
                          <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
                          </Offcanvas.Header>
                          <Offcanvas.Body>
                            <Nav style={{ textAlign: "right" }}>
                              {!data1?.id ? (
                                <a
                                  href="/signintwo"
                                  onClick={() =>
                                    ".navbar-collapse".collapse("hide")
                                  }
                                  style={{
                                    textDecoration: "none",
                                    display: "none",
                                  }}
                                >
                                  {" "}
                                  <p className="ghostItem">ACCOUNT</p>
                                </a>
                              ) : (
                                <a
                                  href="/account"
                                  onClick={() =>
                                    ".navbar-collapse".collapse("hide")
                                  }
                                  style={{ textDecoration: "none" }}
                                >
                                  <NavDropdown
                                    style={{ textDecoration: "none" }}
                                    title={
                                      <div>
                                        <img
                                          src={data1?.avatar}
                                          width="20px"
                                          height="20px"
                                          style={{ borderRadius: "10px" }}
                                        ></img>
                                        {/* <h1>{data?.avatar}</h1> */}
                                      </div>
                                    }
                                    id="basic-nav-dropdown"
                                  >
                                    <NavDropdown.Item href="/account">
                                      Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout}>
                                      <a href="/">Logout</a>
                                    </NavDropdown.Item>
                                    {data1?.isAdmin === true ? (
                                      <NavDropdown
                                        title="Admin"
                                        id="basic-nav-dropdown"
                                      >
                                        <NavDropdown.Item href="/admin/productlist">
                                          Product list
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/admin/userlist">
                                          User list
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/admin/orderlist">
                                          Order list
                                        </NavDropdown.Item>
                                        {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                      </NavDropdown>
                                    ) : (
                                      <NavDropdown.Item
                                        style={{ display: "none" }}
                                      ></NavDropdown.Item>
                                    )}

                                    {/* <NavDropdown.Item href="#action/3.3">MERCHANDISE</NavDropdown.Item> */}
                                    {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                  </NavDropdown>
                                </a>
                              )}

                              <a
                                href="/true-purpose"
                                onClick={() =>
                                  ".navbar-collapse".collapse("hide")
                                }
                                className="listItem"
                              >
                                BE GREAT
                              </a>
                              <a
                                href="/ambassador"
                                onClick={() =>
                                  ".navbar-collapse".collapse("hide")
                                }
                                className="listItem"
                              >
                                AMBASSADOR
                              </a>
                              {/* <a href="/science" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">SCIENCE</a> */}
                              <a
                                onClick={() =>
                                  ".navbar-collapse".collapse("hide")
                                }
                                style={{ textDecoration: "none" }}
                              >
                                {" "}
                                <NavDropdown
                                  title="SCIENCE"
                                  id="basic-nav-dropdown"
                                >
                                  <NavDropdown.Item href="science">
                                    TECTON SCIENCE
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/sugar">
                                    KETONES
                                  </NavDropdown.Item>
                                  {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                </NavDropdown>
                              </a>
                              {/* <a  onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">CONTACT</a> */}
                              <a
                                href="/signup"
                                onClick={() =>
                                  ".navbar-collapse".collapse("hide")
                                }
                              >
                                <NavDropdown
                                  title="ACCOUNT"
                                  id="basic-nav-dropdown"
                                >
                                  <NavDropdown.Item href="./order">
                                    ORDERS
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/billing">
                                    BILLING
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/subscription">
                                    SUBSCRIPTION
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/reward">
                                    REWARDS
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/ambassador">
                                    AMBASSDOR
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/refer">
                                    REFER A FRIEND
                                  </NavDropdown.Item>
                                  <NavDropdown.Item href="/account">
                                    ACCOUNT SETTING
                                  </NavDropdown.Item>
                                </NavDropdown>
                              </a>
                              <a
                                onClick={() =>
                                  ".navbar-collapse".collapse("hide")
                                }
                                style={{ textDecoration: "none" }}
                              >
                                <NavDropdown title="SHOP">
                                  <NavDropdown.Item href="./allproduct">
                                    SHOP ALL
                                  </NavDropdown.Item>
                                  <NavDropdown.Item>TECTON</NavDropdown.Item>
                                  <NavDropdown.Item>
                                    MERCHANDISE
                                  </NavDropdown.Item>
                                </NavDropdown>
                              </a>
                              {/* <NavDropdown
                title="More"
                id="offcanvasNavbarDropdown"
                className="listItem"
              >
                <NavDropdown.Item href="#action3">
                  Cybertruck
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Roadster
                </NavDropdown.Item>
                <NavDropdown.Item href="#action5">Semi</NavDropdown.Item>
                <NavDropdown.Item>News</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="English">
                <NavDropdown.Item>Portuguese-Br</NavDropdown.Item>
                <NavDropdown.Item>Portuguese-Pt</NavDropdown.Item>
                <NavDropdown.Item>Italian</NavDropdown.Item>
                <NavDropdown.Item>Spanish</NavDropdown.Item>
                <NavDropdown.Item>French</NavDropdown.Item>
              </NavDropdown> */}
                            </Nav>
                          </Offcanvas.Body>
                        </Navbar.Offcanvas>
                      </Container>
                    </Navbar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4 ">
          <div class="contact-info">
            <div id="dep1">
              <ul class="menu-drop">
                <li>
                  <a href="/order">ORDERS</a>
                </li>
                <li>
                  <a href="/subscription">SUBSCRIPTIONS</a>
                </li>
                <li>
                  <a href="/billing">BILLING</a>
                </li>
                <li>
                  <a href="/reward">REWARDS</a>
                </li>
                <li>
                  <a href="/refer">REFER A FRIEND</a>
                </li>
                <li>
                  <a href="/account">ACCOUNT SETTING</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div class="col-sm-8 ">
          <div class="row">
            <div class="m-amb">
              <h3 class="bcm">Hi there, Ambassador!</h3>
              <div>
                <p class="as-info">
                  Share Tecton® with your friends by copying the link below.
                </p>
              </div>
              <div class="para-code">
                <p class="para-qr">My QR Code</p>
                <div class="square"></div>
              </div>
              <div class="conFR-for">
                <div class="form-group">
                  <label class="control-label col-sm-2" for="fname">
                    Your Ambassador link
                  </label>
                  <div class="col-sm-10">
                    <input
                      type="link"
                      class="form-control"
                      id="fname"
                      name="fname"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ambassador2;
