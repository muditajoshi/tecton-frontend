import React from "react";

export const InputError = ({ error }) => {
  return (
    <>
      {error && error.type === "pattern" && (
        <span className="error">{error.message}</span>
      )}
      {error && error.type === "minLength" && (
        <span className="error">{error.message}</span>
      )}
      {error && error.type === "maxLength" && (
        <span className="error">{error.message}</span>
      )}
    </>
  );
};
