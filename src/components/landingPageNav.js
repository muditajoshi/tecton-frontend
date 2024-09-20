import React from "react";
import ScrollToTop from "./ScrollToTop";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import LOGOORANGE from '../images/Tecton side by side white logo.png';
import LOGOSIDE from "../images/Tecton side by side white logo.png"
import { useState } from "react";
import { useEffect } from "react";
import "../css/landingPageNav.css";
import Logo from "../images/Tecton side by side white logo.png";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const changebg = ()=>{
    if(window.scrollY > 100){
      setnav(
        <div className="header" style={{backgroundColor:"black"}}>
      <div className="header_logo">
      <Link to="/" onClick={()=>('.navbar-collapse').collapse('hide')}> <img src={Logo} alt="Logo da Marca"></img></Link>
      </div>
      <div className="header_center">
      <Link to="/true-purpose" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" style={{borderTopLeftRadius:"22px",borderBottomLeftRadius:"22px"}}>BE GREAT</p></Link>
      <Link to="/ambassador" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem">AMBASSADOR</p></Link>
      <Link to="/science" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><p className="ghostItem">SCIENCE</p></Link>
      <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><p className="ghostItem">CONTACT</p></Link>
      <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem">ACCOUNT</p></Link>
      <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" ><NavDropdown title="SHOP">
              <NavDropdown.Item>SHOP ALL</NavDropdown.Item>
              <NavDropdown.Item>TECTON</NavDropdown.Item>
              <NavDropdown.Item>MERCHANDISE</NavDropdown.Item>
            </NavDropdown></p></Link>
            <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" style={{borderTopRightRadius:"22px",borderBottomRightRadius:"22px"}}><FontAwesomeIcon icon={faCartShopping} style={{color:"white",fontWeight:"bolder"}}/></p></Link>
        
      </div>

      {/* <div className="header_right">
         <p className="ghostItem">Shop</p>
        <p className="ghostItem">Account</p> 
        <p className="ghostItem">MENU</p>
      </div> */}

      <div className="revealGhostItems">
        <Navbar className="cont" expand={false}>
          <Container fluid>
          <Link to="/preorder"><span><FontAwesomeIcon icon={faCartShopping} style={{color:"white",fontWeight:"bolder",fontSize:"30px"}}/></span></Link>
            <Navbar.Toggle href="#" className="menu">
            <span><FontAwesomeIcon icon={faBars} style={{color:"white",fontWeight:"bolder"}}/></span>
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
              <Nav style={{textAlign:"right"}}>
            <Link to="/true-purpose" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">BE GREAT</Link>
            <Link to="/ambassador" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">AMBASSADOR</Link>
            <Link to="/science" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">SCIENCE</Link>
            <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">CONTACT</Link>
            <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">ACCOUNT</Link>
            <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><NavDropdown title="SHOP">
              <NavDropdown.Item>SHOP ALL</NavDropdown.Item>
              <NavDropdown.Item>TECTON</NavDropdown.Item>
              <NavDropdown.Item>MERCHANDISE</NavDropdown.Item>
            </NavDropdown></Link>
            <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">ACCOUNT</Link>
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

      )
     }
     else(
       setnav( <div className="header">
       <div className="header_logo">
      <Link to="/" onClick={()=>('.navbar-collapse').collapse('hide')}> <img src={Logo} alt="Logo da Marca"></img></Link>
      </div>
      <div className="header_center">
      <Link to="/true-purpose" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" style={{borderTopLeftRadius:"22px",borderBottomLeftRadius:"22px"}}>BE GREAT</p></Link>
      <Link to="/ambassador" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem">AMBASSADOR</p></Link>
      <Link to="/science" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><p className="ghostItem">SCIENCE</p></Link>
      <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><p className="ghostItem">CONTACT</p></Link>
      <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem">ACCOUNT</p></Link>
      <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" ><NavDropdown title="SHOP">
              <NavDropdown.Item>SHOP ALL</NavDropdown.Item>
              <NavDropdown.Item>TECTON</NavDropdown.Item>
              <NavDropdown.Item>MERCHANDISE</NavDropdown.Item>
            </NavDropdown></p></Link>
            <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" style={{borderTopRightRadius:"22px",borderBottomRightRadius:"22px"}}><FontAwesomeIcon icon={faCartShopping} style={{color:"white",fontWeight:"bolder"}}/></p></Link>
     
      </div>

 
       {/* <div className="header_right">
          <p className="ghostItem">Shop</p>
         <p className="ghostItem">Account</p> 
         <p className="ghostItem">MENU</p>
       </div> */}
 
       <div className="revealGhostItems">
         <Navbar className="cont" expand={false}>
           <Container fluid>
           <Link to="/preorder"><span><FontAwesomeIcon icon={faCartShopping} style={{color:"white",fontWeight:"bolder",fontSize:"30px"}}/></span></Link>
             <Navbar.Toggle href="#" className="menu">
             <span><FontAwesomeIcon icon={faBars} style={{color:"white",fontWeight:"bolder"}}/></span>
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
               <Nav style={{textAlign:"right"}}>
            <Link to="/true-purpose" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">BE GREAT</Link>
            <Link to="/ambassador" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">AMBASSADOR</Link>
            <Link to="/science" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">SCIENCE</Link>
            <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">CONTACT</Link>
            <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">ACCOUNT</Link>
            <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><NavDropdown title="SHOP">
              <NavDropdown.Item>SHOP ALL</NavDropdown.Item>
              <NavDropdown.Item>TECTON</NavDropdown.Item>
              <NavDropdown.Item>MERCHANDISE</NavDropdown.Item>
            </NavDropdown></Link>
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
            </NavDropdown>  */}
          </Nav>
               </Offcanvas.Body>
             </Navbar.Offcanvas>
           </Container>
         </Navbar>
       </div>
     </div>
       )
     )
  }

  useEffect(()=>{
  
  window.addEventListener("scroll",changebg)
  
});
//  <span style={{fontWeight:"bold"}}>MAGMA</span>

const[nav,setnav]=useState( <div className="header">
 <div className="header_logo">
      <Link to="/" onClick={()=>('.navbar-collapse').collapse('hide')}> <img src={Logo} alt="Logo da Marca"></img></Link>
      </div>
      <div className="header_center">
      <Link to="/true-purpose" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" style={{borderTopLeftRadius:"22px",borderBottomLeftRadius:"22px"}}>BE GREAT</p></Link>
      <Link to="/ambassador" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem">AMBASSADOR</p></Link>
      <Link to="/science" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><p className="ghostItem">SCIENCE</p></Link>
      <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><p className="ghostItem">CONTACT</p></Link>
      <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem">ACCOUNT</p></Link>
      <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" ><NavDropdown title="SHOP">
              <NavDropdown.Item>SHOP ALL</NavDropdown.Item>
              <NavDropdown.Item>TECTON</NavDropdown.Item>
              <NavDropdown.Item>MERCHANDISE</NavDropdown.Item>
            </NavDropdown></p></Link>
            <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}> <p className="ghostItem" style={{borderTopRightRadius:"22px",borderBottomRightRadius:"22px"}}><FontAwesomeIcon icon={faCartShopping} style={{color:"white",fontWeight:"bolder"}}/></p></Link>
      </div>


{/* <div className="header_right">
   <p className="ghostItem">Shop</p>
  <p className="ghostItem">Account</p> 
  <p className="ghostItem">MENU</p>
</div> */}

<div className="revealGhostItems">
  <Navbar className="cont" expand={false}>
    <Container fluid>
    <Link to="/preorder"><span><FontAwesomeIcon icon={faCartShopping} style={{color:"white",fontWeight:"bolder",fontSize:"30px"}}/></span></Link>
      <Navbar.Toggle href="#" className="menu">
      <span><FontAwesomeIcon icon={faBars} style={{color:"white",fontWeight:"bolder"}}/></span>
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
          <Nav style={{textAlign:"right"}}>
            <Link to="/true-purpose" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">BE GREAT</Link>
            <Link to="/ambassador" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">AMBASSADOR</Link>
            <Link to="/science" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">SCIENCE</Link>
            <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">CONTACT</Link>
            <Link to="/signinone" onClick={()=>('.navbar-collapse').collapse('hide')} className="listItem">ACCOUNT</Link>
            <Link to="/preorder" onClick={()=>('.navbar-collapse').collapse('hide')} style={{textDecoration:"none"}}><NavDropdown title="SHOP">
              <NavDropdown.Item>SHOP ALL</NavDropdown.Item>
              <NavDropdown.Item>TECTON</NavDropdown.Item>
              <NavDropdown.Item>MERCHANDISE</NavDropdown.Item>
            </NavDropdown></Link>
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



);

  return (
    <div>
    <ScrollToTop/>
    
    
    
    {nav}
    
    
    
               
        </div>
  );
};

export default Header;
