import React from "react";
import styled from "styled-components";
import axios from "axios";

const HeaderBoardText = styled.p`
  color: white;
  font-weight: bold;
  font-size: 2em;
  margin-top: 2.1px;
`;

class HeaderBoard extends React.Component {
  state = {
    data: {
      Board: "Loading",
      title: "",
      current_thread: ""
    },
    apiURL: `https://cors-anywhere.herokuapp.com/https://2ch.hk/${
      this.props.board
    }/res/${this.props.thread}.json`
  };
  getArr() {
    axios
      .get(this.state.apiURL)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(this.props);
      });
  }
  componentDidMount() {
    this.getArr();
  }
  render() {
    return (
      <HeaderBoardText>
        /{this.state.data.Board}/{this.state.data.current_thread}
      </HeaderBoardText>
    );
  }
}

export default HeaderBoard;
