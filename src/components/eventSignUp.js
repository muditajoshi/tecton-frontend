import React, { useEffect } from "react";
import "../css/Signintwo.css";

const EventPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=V9vP9Q';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []); 

  // Function to open the Klaviyo form
  const openKlaviyoForm = () => {
    window._klOnsite = window._klOnsite || [];
    window._klOnsite.push(['openForm', 'WUqGFe']); // Replace FORMID with your form ID
  };

  // Event handler for both click and touch events
  const handleInteraction = () => {
    openKlaviyoForm();
  };

  return (
    <div>
      <div className="Login container" style={{ paddingTop: "100px" }}>
        <div className="mb-2">
          <label className="form-label" style={{ color: "orange" }}>
            <h3><b> Event Sign up</b></h3>
          </label>
        </div>

        {/* Trigger the handleInteraction function */}
        <div style={{ cursor: "pointer" }} onClick={handleInteraction} onTouchStart={handleInteraction}>
          <div className="klaviyo-form-WUqGFe"></div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
