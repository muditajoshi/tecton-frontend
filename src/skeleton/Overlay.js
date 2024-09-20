import React, { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-modal-overlay";
import "../css/overlay-modal.css";
import Loader from "react-loader";

const Overlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(true);
  });
  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
      <Modal show={isOpen} closeModal={() => setIsOpen(false)}>
        <div style={{ marginTop: "5%" }}>
          <Loader
            lines={13}
            length={10}
            width={5}
            radius={15}
            corners={1}
            rotate={0}
            direction={1}
            color="orange"
            speed={1}
            trail={60}
            shadow={false}
            hwaccel={false}
            className="spinner"
            zIndex={2e9}
            top="25%"
            left="50%"
            scale={1.0}
            loadedClassName="loadedContent"
          />
        </div>
        <h6  className=" overlaytext"style={{ marginTop: "10%", marginBottom: "20px",color:"black",fontSize:"18px" }}>
          {" "}
          <strong>
            Please do not refresh the page. Wait while we process your
            payment.{" "}
          </strong>
        </h6>
      </Modal>
    </div>
  );
};

export default Overlay;
