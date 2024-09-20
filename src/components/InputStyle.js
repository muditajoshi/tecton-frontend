import styled, { css } from "styled-components";

const inputCommons = css`
  padding: 0.375rem 0.75rem;
  height: 40px;
  border: 1px solid transparent;
  font-size: 0.9375rem;
  margin-bottom: 0;
  border-radius:0.25rem
`;

export const Input = styled.input`
  ${inputCommons}
  margin-right: 0;
  border-radius: 5px;
  border: 1px solid lightgray;
  &:focus {
    border: black;
    
  }
  ::placeholder {
    color: gray;
    opacity: 1;
    font-size: 0.9375rem;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 184%;
  margin-right: 0;
  margin-bottom: 1rem;
  .label,
  .error {
    font-size: 0.8rem;
  }
  .label {
    font-size: 1.375rem;
    color: black;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }
  span.required {
    margin: auto 0 auto 0.5rem;
    padding: 0;
    color: red;
  }
  span.error {
    margin-top: 0.3rem;
    color: red;
  }
  input.error {
    border-color: red;
  }
  input {
    width: 50%;
    margin-right: 0;
  }
`;