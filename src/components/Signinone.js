import "../css/Signinone.css";
import { Link } from "react-router-dom";
import LOGOORANGE from "../images/Tecton side by side white logo.png";
import LOGOSIDE from "../images/Tecton side by side white logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import BEGREAT from "../images/BEGREAT.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/Tecton side by side white logo.png";
import {
  Navbar,
  Container,
  NavDropdown,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { useEffect, useState } from "react";

function Signinone({ history }) {
  const [select, setSelect] = useState([]);
  // console.log(select);
  const handleClick = () => {
    localStorage.setItem("Role", select);
    history.push("/signup");  
  };

  return (
    <>
      <div className="Signinone container" style={{fontFamily:"aktiv"}}>
        <form>
          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              class="form-label"
              style={{ color: "orange" }}
            >
              <h3>
                <b>Sign up</b>
              </h3>
            </label>
          </div>
          <div class="mb-2">
            <label for="exampleInputPassword1" class="form-label">
              <b>Join the (extra)ordinary club.</b>
            </label>
          </div>

          <div class="mb-4  ">
            <label for="exampleInputPassword1" class="form-label">
              Get early access to new products, rewards, health tips, and more!
            </label>
          </div>

          <div class="mb-2">
            <label for="exampleInputPassword1" class="form-label">
              <b>Select all that apply: I want to</b>
            </label>
          </div>
          <div class="mb-3 form-check">
            {select.length === 2 ? (
              <>
                <input
                  disabled
                  value="Individual"
                  onClick={(e) => setSelect([...select, e.target.value])}
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Buy products for myself
                </label>
              </>
            ) : (
              <>
                <input
                  value="Individual"
                  onClick={(e) => setSelect([...select, e.target.value])}
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Buy products for myself
                </label>
              </>
            )}
          </div>
          <div class="mb-3 form-check">
            {select.length === 2 ? (
              <>
                <input
                  disabled
                  value="Ambassador"
                  onClick={(e) => setSelect([...select, e.target.value])}
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Apply to be an ambassador
                </label>
              </>
            ) : (
              <>
                <input
                  value="Ambassador"
                  onClick={(e) => setSelect([...select, e.target.value])}
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Apply to be an ambassador
                </label>
              </>
            )}
          </div>
          <div class="mb-3 form-check">
            {select.length === 2 ? (
              <>
                <input
                  disabled
                  value="Wholeseller"
                  onClick={(e) => setSelect([...select, e.target.value])}
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Buy in bulk for resale
                </label>
              </>
            ) : (
              <>
                <input
                  value="Wholeseller"
                  onClick={(e) => setSelect([...select, e.target.value])}
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Buy in bulk for resale
                </label>
              </>
            )}
          </div>
          <button
            onClick={handleClick}
            class="btn px-5 py-2"
            style={{ backgroundColor: "orange", color: "white",borderRadius:"0px"}}
          >
            CONTINUE
          </button>
          <br/>
          <br/>
           <label for="exampleInputPassword1" class="form-label">
              Already have an account?{" "}
              <span style={{ color: "orange" }}>
                <Link to="/login">Login.</Link>
              </span>
            </label>
          <div class="mt-3">
            {/* <label for="exampleInputPassword1" class="form-label">
              Already have an account?{" "}
              <span style={{ color: "orange" }}><Link to="/login">Login.</Link></span>
            </label> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default Signinone;
