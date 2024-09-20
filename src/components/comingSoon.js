import React from "react";
import Typewriter from "typewriter-effect";
import "./comingSoon.css";
import typewriterimage from "../images/redcan.png";

const ComingSoon = () => {
  return (
    <div className="typewriter">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("Coming Soon...")
            .callFunction(() => {
              console.log("String typed out!");
            })
            .pauseFor(1500)
            .deleteChars(8)
            .typeString(" <strong> Very Soon...</strong>")
            .callFunction(() => {
              console.log("All strings were deleted");
            })
            .start();
        }}
      />
      <img className="prod-image" src={typewriterimage} alt="" />
    </div>
  );
};

export default ComingSoon;
