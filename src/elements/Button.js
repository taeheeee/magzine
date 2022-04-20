import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }
  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
};

const ElButton = styled.button`
  width: 100%;
  background-color: #212121;
  color: #ffffff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

const FloatButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #212121;
  color: white;
  box-sizing: border-box;
  font-size: 30px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  border: none;
  text-align: center;
  vertical-align: mieeld;
  border-radius: 30px;
`;

export default Button;
