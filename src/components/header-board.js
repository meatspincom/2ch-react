import React from "react";
import styled from "styled-components";

const HeaderBoardText = styled.p`
  color: white;
  font-weight: bold;
  font-size: 2em;
  margin-top: 2.1px;
`;

class HeaderBoard extends React.Component {
  render() {
    return <HeaderBoardText>/{this.props.board}/{this.props.thread}</HeaderBoardText>;
  }
}

export default HeaderBoard;
