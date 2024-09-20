import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LogViewer = () => {
  const [logContent, setLogContent] = useState("");
  const { filename } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.accessToken}`,
      },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/log/read/${filename}`, config)
      .then((response) => setLogContent(response.data))
      .catch((error) => console.error("Error:", error));
  }, [filename]);



  return (
    <div style={{  margin:"100px 5rem" }}>
      <h1 className='productListPage_heading'>{`Log Details ${filename}`}</h1>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: logContent }} />
    </div>
  );
};

export default LogViewer;
