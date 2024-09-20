import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"

const Sitemap = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div
      className="container"
      style={{ paddingTop: "100px", textAlign: "center" }}
    >
      <div className="sitemap_name" style={{ textAlign: "center" }}>
        <h1>Sitemap</h1>
      </div>
      <div className="sitemape_phone">
      <div style={{textAlign:"left"}}>
            <a href="https://tectonlife.com/"><p>https://tectonlife.com/</p></a>
            <a href="https://tectonlife.com/shop"><p>https://tectonlife.com/shop</p></a>
            <a href="https://tectonlife.com/ambassador"><p>https://tectonlife.com/ambassador</p></a>
            <a href="https://tectonlife.com/careers" ><p>https://tectonlife.com/careers</p></a>
            <a href="https://tectonlife.com/be-great"><p>https://tectonlife.com/be-great</p></a>
            <a href="https://tectonlife.com/privacyPolicy"><p>https://tectonlife.com/privacyPolicy</p></a>
            <a href="https://tectonlife.com/termsOfService"><p>https://tectonlife.com/termsOfService</p></a>
        
          <a href="https://tectonlife.com/refundpolicy"><p>https://tectonlife.com/refundpolicy</p></a>
          <a href="https://tectonlife.com/product/62de9371616a7a0cf79dc5ea"class="break-link"><p>https://tectonlife.com/product/62de9371616a7a0cf79dc5ea</p></a>
          <a href="https://tectonlife.com/product/62de9414616a7a0cf79dc630" class="break-link"><p>https://tectonlife.com/product/62de9414616a7a0cf79dc630</p></a>
          <a href="https://tectonlife.com/product/62e28ad6d0134722ac168f71" class="break-link"><p>https://tectonlife.com/product/62e28ad6d0134722ac168f71</p></a>
          <a href="https://tectonlife.com/product/62e3d7ddd0134722ac169397" class="break-link"><p>https://tectonlife.com/product/62e3d7ddd0134722ac169397</p></a>
          <a href="https://tectonlife.com/product/62e41bcc66708638230a1266"  class="break-link"><p>https://tectonlife.com/product/62e41bcc66708638230a1266</p></a>
        
 
        {userInfo ? ( // If userInfo is available
         
            <div>
              <a href="https://tectonlife.com/account"><p>https://tectonlife.com/account</p></a>
              <a href="https://tectonlife.com/subscription"><p>https://tectonlife.com/subscription</p></a>
          
              <a href="https://tectonlife.com/order"><p>https://tectonlife.com/order</p></a>
              <a href="https://tectonlife.com/billing"><p>https://tectonlife.com/billing</p></a>
            </div>
                   
        ) : null}
          </div>      
     </div>
        {/* If userInfo is not available */}
      </div>
  
  );
};

export default Sitemap;
