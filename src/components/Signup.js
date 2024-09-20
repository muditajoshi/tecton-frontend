import "../css/Signup.css";
import LOGOORANGE from "../images/TECTON beta site.png";
import LOGOSIDE from "../images/TECTON beta site side.png"
import { Link } from "react-router-dom";

function Signup(){
    return(
        <div className="Signupp">
             <nav
        id="nav-menu"
        class="navbar navbar-expand-lg navbar-light fixed-top bgset "
        style={{ backgroundColor: "black" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
          <Link to="/" onClick={()=>('.navbar-collapse').collapse('hide')}><div onClick={()=>(window).scrollTo(0,0)} class="hide-nav-pc"> <img class="first-image" src={LOGOORANGE} ></img></div>
  <div onClick={()=>(window).scrollTo(0,0)} class="hide-nav-mobile"> <img class="first-image1" src={LOGOSIDE} ></img></div>
  {/* <div onClick={()=>(window).scrollTo(0,0)}><img class="second-image" src={TECHW}></img></div> */}
  </Link>
          </a>
          <button
            class="navbar-toggler navbar-left"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ms-auto bgcolor">
              <div class="navbar-nav">
                <Link to="/true-purpose"
                  onClick={() => ".navbar-collapse".collapse("hide")}
                  class="nav-link"
                  data-toggle="collapse"
                  data-bs-target=".navbar-collapse"
                >
                  <b style={{ paddingLeft: "20px" }}>BE GREAT</b>
                </Link>
                <Link
                  to="/ambassador"
                  onClick={() => ".navbar-collapse".collapse("hide")}
                  class="nav-link"
                  data-toggle="collapse"
                  data-bs-target=".navbar-collapse"
                >
                  <b>AMBASSADOR</b>
                </Link>

                <Link
                  onClick={() => ".navbar-collapse".collapse("hide")}
                  to="/science"
                  class="nav-link"
                  href="#"
                  data-toggle="collapse"
                  data-bs-target=".navbar-collapse"
                >
                  <b>SCIENCE</b>
                </Link>
                <Link
                  to="/preorder"
                  onClick={() => ".navbar-collapse".collapse("hide")}
                  class="nav-link"
                  data-toggle="collapse"
                  data-bs-target=".navbar-collapse"
                >
                  <b>CONTACT</b>
                </Link>
                <Link
                  to="/signin"
                  onClick={() => ".navbar-collapse".collapse("hide")}
                  class="nav-link"
                  data-toggle="collapse"
                  data-bs-target=".navbar-collapse"
                >
                  <b>ACCOUNT</b>
                </Link>
                <Link
                  to="/preorder"
                  onClick={() => ".navbar-collapse".collapse("hide")}
                  class="nav-link"
                  data-toggle="collapse"
                  data-bs-target=".navbar-collapse"
                >
                  <b>SHOP</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
          <div class="container mt-5 ">

<div class="row d-flex align-items-center justify-content-center">

  <div class="col-md-6">


    <div class="card px-5 py-5">

      <span class="circle"><i class="fa fa-check"></i></span>

      <h5 class="mt-3">Join with all our <br/> learners from around the globe</h5>
    


      <div class="form-input">
          

          <i class="fa fa-envelope"></i>
          <input type="text" class="form-control" placeholder="Firstname"/>
          
        </div>

        <div class="form-input">
          

          <i class="fa fa-envelope"></i>
          <input type="text" class="form-control" placeholder="Lastname"/>
          
        </div>


      <div class="form-input">
          

        <i class="fa fa-envelope"></i>
        <input type="email" class="form-control" placeholder="Email address"/>
        
      </div>

      

      <div class="form-input">

        <i class="fa fa-lock"></i>
        <input type="password" class="form-control" placeholder="password"/>
        
      </div>

      <div class="form-input">
          

        <i class="fa fa-envelope"></i>
        <input type="text" class="form-control" placeholder="Phone number"/>
        
      </div>

      {/* <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
        <label class="form-check-label" for="flexCheckChecked">
          I agree all the statements
        </label>
      </div> */}


      <button class="mt-4 signup" style={{backgroundColor:"orange"}}>Signup</button>

{/* 
      <div class="text-center mt-3">

        <span>Or continue with these social profile</span>
        
      </div>


      <div class="d-flex justify-content-center mt-4">
        
        <span class="social"><i class="fa fa-google"></i></span>
        <span class="social"><i class="fa fa-facebook"></i></span>
        <span class="social"><i class="fa fa-twitter"></i></span>
        <span class="social"><i class="fa fa-linkedin"></i></span>
      </div> */}


      <div class="text-center mt-4">
        
        <span>Already a member?</span>
        <Link to="/signin" class="text-decoration-none">Login</Link>

      </div>
      
    </div>


    
  </div>
  
</div>

</div>
        </div>
    )
}

export default Signup;