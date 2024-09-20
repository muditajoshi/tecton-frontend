import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";


const OnScreenPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("popupClosed", "true");
  };

  useEffect(() => {
    const popupClosed = sessionStorage.getItem("popupClosed");

    if (!popupClosed) {
      // Delay the visibility by 3 seconds
      const timeoutId = setTimeout(() => {
        setShowPopup(true);
      }, 4000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
        sessionStorage.setItem("popupClosed", "true");
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className={`popuplanding ${showPopup ? "show" : "closed"}`} ref={popupRef}>
        <div>
          <div className="crosscontent" onClick={handleClosePopup}>
            <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: "20px", cursor: "pointer" }} />
          </div>
          <div className="shoplanding__popup_buynow">
            <p>Unlock HSA/FSA Reimbursement for Tecton</p>
          </div>
        </div>

        <div className="shoplanding__popup_buynow1">
          <p>Purchase your preferred Tecton items through your HSA or FSA, potentially saving 30-40% with pre-tax funds.</p>
        </div>

        
        <div className="HSApopup">
          <div className="HSApopup">
            <div>
              <a href="https://blog.tectonlife.com/unlock-hsa-fsa-reimbursement/">
                <button className="new_shop_buttton_buy_add-pop">LEARN MORE</button>
              </a>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div>
              <a href="/shop">
                <button onClick={handleClosePopup} className="new_shop_buttton_buy_add-pop">SHOP NOW</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnScreenPopup;
