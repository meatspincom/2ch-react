import React from "react";
import styled from "styled-components";
import Ident from "./header-ident";
import HeaderBoard from "./header-board-thread";
import logo from "../img/header-logo.png";

const HeaderS = styled.header`
  max-width: 100%;
  background-color: orange;
  height: 42px;
`;
const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  max-width: 960px;
  height: 42px;
  margin: 0 auto;
`;
const HeaderLogo = styled.span`
  height: 20px;
  width: 15px;
  background: url(${logo}) no-repeat;
  background-size: 15px 20px;
  background-position-y: 11px;
  padding-top: 11px;
  display: block;
`;

const Header = props => {
  return (
    <HeaderS>
      <Nav>
        <HeaderLogo />
        <HeaderBoard board={props.board} thread={props.thread} />
        <Ident />
      </Nav>
    </HeaderS>
  );
};

export default Header;
