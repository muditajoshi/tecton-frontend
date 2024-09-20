import React, { useEffect } from "react";
import "../css/Signintwo.css";

const EventRequest = () => {
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
    window._klOnsite.push(['openForm', 'TyQjPb']); 
  };


  const handleInteraction = () => {
    openKlaviyoForm();
  };

  return (
    <div>
      <div className="Login container" style={{ paddingTop: "100px" }}>
        <div className="mb-2">
          <label className="form-label" style={{ color: "orange" }}>
            <h3><b> Event Requests</b></h3>
          </label>
        </div>

     
        <div style={{ cursor: "pointer" }} onClick={handleInteraction} onTouchStart={handleInteraction}>
        <div class="klaviyo-form-TyQjPb"></div>

        </div>
      </div>
    </div>
  );
};

export default EventRequest;
