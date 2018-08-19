import React from "react";
import styled from "styled-components";
import ThreadPage from './threadPage';

const GoBackButton = styled.p`
  top: 0;
  left: 0;
  position: absolute;
  background: white;
  padding: 0px 5px;
  padding-bottom: 4px;
  margin-top: 62px;
  margin-left: 100px;
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
        <Wrapper>
        <GoBackButton onClick={this.props.history.goBack}>←</GoBackButton>
          <ThreadPage board={this.props.match.params.board.slice(0)} thread={this.props.match.params.thread.slice(0)}/>
        </Wrapper>
      </div>
    );
  }
}

export default Thread;
