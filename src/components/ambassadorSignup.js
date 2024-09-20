import React, { useEffect } from "react";
import "../css/Signintwo.css";

const AmbassadorSignup = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=V9vP9Q';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []); 


  const openKlaviyoForm = () => {
    window._klOnsite = window._klOnsite || [];
    window._klOnsite.push(['openForm', 'TaLMZp']); 
  };


  const handleInteraction = () => {
    openKlaviyoForm();
  };

  return (
    <div>
      <div className="Login container" style={{ paddingTop: "100px" }}>
        <div className="mb-2">
          <label className="form-label" style={{ color: "orange" }}>
            <h3><b>  Ambassador Event Sign-Up</b></h3>
          </label>
        </div>
      
     
        <div style={{ cursor: "pointer" }} onClick={handleInteraction} onTouchStart={handleInteraction}>
        <div class="klaviyo-form-TaLMZp"></div>


        </div>
      </div>
    </div>
  );
};

export default  AmbassadorSignup;
