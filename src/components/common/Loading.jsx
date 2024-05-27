import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
const LoaderDiv = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  height: 100%;
  background-color: #fff;
  display: grid;
  place-items: center;
  z-index: 9999999;
  img {
    animation: loader 2s linear infinite alternate;
  }
`;

const Loader = () => {
  return ReactDOM.createPortal(
    <LoaderDiv className="loader">
    </LoaderDiv>,
    document.getElementById("root")
  );
};

export default Loader;
