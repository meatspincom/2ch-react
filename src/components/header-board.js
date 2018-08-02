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
      Board: "Loading..",
      title: "",
      current_thread: ""
    },
    apiURL: `https://cors-anywhere.herokuapp.com/https://2ch.hk/${
      this.props.board
    }/index.json`,
    ready: false
  };
  getArr(url) {
    axios
      .get(url)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    const gogo = () => {
      this.getArr(`https://cors-anywhere.herokuapp.com/https://2ch.hk/${
        this.props.board
      }/index.json`);
    }
    gogo();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: {
        Board: "Loading..",
        title: "",
        current_thread: ""
      }
    })
    const url = `https://cors-anywhere.herokuapp.com/https://2ch.hk/${
      nextProps.board
    }/index.json`;
    this.getArr(url);
  }
  render() {
    return <HeaderBoardText>/{this.state.data.Board}/</HeaderBoardText>;
  }
}

export default HeaderBoard;
