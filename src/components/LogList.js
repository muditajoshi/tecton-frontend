import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';

const LogList = () => {
  const [logs, setLogs] = useState([]);

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
      .get(`${process.env.REACT_APP_PROXY_URL}/api/log/list`, config)
      .then((response) => setLogs(response.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const downloadLog = (logFilename) => {
    axios
      .get(`${process.env.REACT_APP_PROXY_URL}/api/log/download/${logFilename}`, config)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/plain' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', logFilename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div style={{ marginTop: '100px', margin: '8rem' }}>
      <h1 className="productListPage_heading">Log Files</h1>
      <Table striped bordered responsive className="table-sm text-center">
        <thead>
          <tr>
            <th>SL No</th>
            <th>Date</th>
            <th>FILE NAME</th>
            <th>VIEW</th>
            <th>DOWNLOAD</th>
          </tr>
        </thead>
        <tbody >

        {logs.map((log, index) => (
          
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{log.split('_')[1].split('.')[0]}</td>
              <td>{log}</td>
              <td>
                <Link to={`/admin/logs/${log}`}>
                  <p style={{ color: 'blue', textDecoration: 'underline' }}>View</p>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => downloadLog(log)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} style={{ fontSize: '1rem', color: 'blue' }} />
                </button>
              </td>
            </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LogList;
