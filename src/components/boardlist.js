import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const BoardUl = styled.ul`
  list-style: none;
`;
const BoardlistItem = styled.li`
  display: block;
  margin: 2.5px 0;
`;
const Title = styled.div`
  background: orange;
  color: white;
  padding: 5px;
`;
const Container = styled.div`
  margin-top: 20px;
  width: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

class Boardlist extends React.Component {
  state = {
    data: {
      "Loading...": [
        {
          bump_limit: "",
          category: "Взрослым",
          default_name: "Аноним",
          enable_dices: 0,
          enable_flags: 0,
          enable_icons: 0,
          enable_likes: 0,
          enable_names: 1,
          enable_oekaki: 0,
          enable_posting: 1,
          enable_sage: 1,
          enable_shield: 0,
          enable_subject: 1,
          enable_thread_tags: 0,
          enable_trips: 1,
          icons: [],
          id: "",
          name: "",
          pages: 7,
          sage: 1,
          tripcodes: 1
        }
      ]
    },
    value: {
      "Loading...": {
        isOpen: false
      }
    }
  };
  loadValue(arr) {
    const newArr = [...this.state.value];
    newArr.value = arr;
    newArr.value = Object.keys(newArr.value).map(
      (item, index) => (newArr.value[Object.keys(this.state.data)] = false)
    );
    this.setState({ value: newArr.value });
  }
  getArr() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://2ch.hk/makaba/mobile.fcgi?task=get_boards`
      )
      .then(res => {
        this.setState({ data: res.data });
        this.loadValue(Object.keys(res.data));
      });
  }
  open(id) {
    const newArr = [...this.state.value];
    newArr[id] = !newArr[id];
    this.setState({
      value: newArr
    });
  }
  componentDidMount() {
    this.getArr();
  }
  render() {
    const thread = Object.keys(this.state.data).map((item, index) => (
      <Container>
        <Title onClick={() => this.open(index)}>
          {Object.keys(this.state.data)[index]}
        </Title>
        {this.state.value[index] && (
          <BoardUl>
            {this.state.data[Object.keys(this.state.data)[index]].map(
              (item, index) => (
                <BoardlistItem>
                  <Link to={"/" + item.id}>
                    {" /"}
                    {item.id}
                    {"/ - "}
                    {item.name}
                  </Link>
                </BoardlistItem>
              )
            )}
          </BoardUl>
        )}
      </Container>
    ));
    return <Wrapper>{thread}</Wrapper>;
  }
}

export default Boardlist;
