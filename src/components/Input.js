import React, { forwardRef } from "react";
import { InputError } from "./InputError";
import { Input as InputStyle, InputWrapper } from "./InputStyle";

export const Input = forwardRef((props, ref) => {
  const { label, error, width, name } = props;
  return (
    <InputWrapper
      className="input-wrapper"
      width={width || "100%"}
      noMargin={props.noMargin ? true : false}
      noMarginBottom={props.noMarginBottom ? true : false}
    >
      {label && (
        <label htmlFor={name} className="label">
          {label}{" "}
          {error && error.type === "required" && (
            <span className="required">*</span>
          )}
        </label>
      )}
      <InputStyle className={error && "error"} ref={ref} {...props} />
      <InputError error={error} />
    </InputWrapper>
  );
});
