import React from "react";
import styled from "styled-components";

import logo from "./logo.svg";
import "./App.css";

const StyledTest = styled.div`
  background-color: blue;
  color: red;
`;

// `ts-ignore` でエラーを無視しないといけない記述
// const ReStyledTest = styled(StyledTest)`
//   background-color: green;
// `;

const ReStyledTest = styled<
  // StyledComponent でない型の扱いにすることで `Type of property 'defaultProps' ～` のエラーを回避
  React.FC<typeof StyledTest["defaultProps"] & { test?: boolean }>
>(
  ({
    // StyledTest には不要となる変数を除去
    test,
    ...props
  }) => <StyledTest {...props} />
)`
  background-color: green;
  color: ${(props) => (props.test ? "black" : "white")};
`;

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <StyledTest>StyledTest</StyledTest>
      <ReStyledTest>ReStyledTest</ReStyledTest>
    </div>
  );
}

export default App;
