import React from "react";
import styled from "styled-components";
import avaImg from "../img/ava.jpg";

const Nick = styled.div`
  display: block;
  height: 14px;
  font-weight: bold;
  margin-top: 12.5px;
  color: white;
`;
const Ava = styled.span`
  height: 20px;
  width: 20px;
  background: url(${avaImg}) no-repeat;
  background-size: 20px 20px;
  margin-top: 11px;
  margin-left: 10px;
  display: block;
  border-radius: 200px;
  border: 0px solid #000000;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ident = () => {
  return (
    <Container>
      <Nick>Аноним</Nick>
      <Ava />
    </Container>
  );
};

export default ident;
