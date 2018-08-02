import React from "react";
import styled from "styled-components";
import Header from "./header-thread";
import Boardlist from "./boardlist";
import ThreadPage from './threadPage';

const GoBackButton = styled.p`
  margin-left: 5px;
  cursor: pointer;
  height: 16px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: raw;
  max-width: 960px;
  margin: 0 auto;
`;

class Thread extends React.Component {
  render() {
    return (
      <div>
        <Header board={this.props.match.params.board.slice(0)} thread={this.props.match.params.thread.slice(0)}/>
        <Wrapper>
          <GoBackButton onClick={() => {this.props.history.goBack()}}>←</GoBackButton>
          <Boardlist />
          <ThreadPage board={this.props.match.params.board.slice(0)} thread={this.props.match.params.thread.slice(0)}/>
        </Wrapper>
      </div>
    );
  }
}

export default Thread;
