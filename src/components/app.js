import React from "react";
import styled from "styled-components";
import {Route, Switch, Redirect } from "react-router-dom";
import Header from "./header";
import Boardlist from "./boardlist";
import Feed from "./feed";
import Thread from "./thread";

class Home extends React.Component{
  render(){
  return <Redirect to="/b"></Redirect>
}}

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
          <Switch>
            <Route path="/:board/" exact component={Header} />
            <Route path="/:board/res/:thread" component={Header} />
          </Switch>
          <Wrapper>
            <Boardlist />
            <Switch>
              <Route path="/:board" exact component={Feed} />
              <Route path="/:board/res/:thread" exact component={Thread} />
              <Route path="/" component={Home} />
            </Switch>
          </Wrapper>
      </div>
    );
  }
}

export default App;
