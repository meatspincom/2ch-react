import React from "react";
import styled from "styled-components";
import Header from "./header";
import Boardlist from "./boardlist";
import Feed from "./feed";

const Wrapper = styled.div`
  display: flex;
  flex-direction: raw;
  max-width: 960px;
  margin: 0 auto;
`;

class App extends React.Component {
  state = {
    loading: true
  };
  render() {
    return (
      <div>
          <Header board={this.props.match.params.board.slice(0)} />
          <Wrapper>
            <Boardlist />
            <Feed board={this.props.match.params.board.slice(0)} />
          </Wrapper>
      </div>
    );
  }
}

export default App;
