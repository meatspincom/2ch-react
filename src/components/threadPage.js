import React from "react";
import styled from "styled-components";
import axios from "axios";
import avaImg from "../img/ava.jpg";

const PostImg = styled.img`
  height: auto;
  max-width: 200px;
  margin-top: 10px;
  margin-left: 10px;
`;

const Block = styled.div`
  border-top: #cecdcc solid 1px !important;
  padding: 15px 20px;
  border: 0px;
  background: #ffffff;
  margin-left: 15px;
  width: 550px;
`;

const TextComment = styled.p`
  color: #939393;
  font-size: 12px;
  width: 470px;
  margin-top: 6px;
  margin-left: 10px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostAva = styled.span`
  height: 50px;
  width: 50px;
  background: url(${avaImg}) no-repeat;
  background-size: 50px 50px;
  display: block;
  border-radius: 200px;
  border: 0px solid #000000;
`;

const NameForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const PostName = styled.p`
  color: #9a7a19;
  font-size: 12px;
  font-weight: bold;
`;

const PostDate = styled.p`
  color: #939393;
  font-size: 12px;
  margin-top: 6px;
`;

class ThreadPage extends React.Component {
  state = {
    data: {
      threads: [
        {
          posts: [
            {
              comment: "Loading...",
              num: "1",
              op: 0,
              posts_count: 3,
              files: []
            }
          ]
        }
      ]
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
        console.log(err);
      });
  }
  componentDidMount() {
    this.getArr();
  }
  render() {
    const thread = this.state.data.threads[0].posts.map(item => (
      <Block>
        <FlexRow>
          <PostAva />
          <NameForm>
            <PostName>Аноним №{item.num}</PostName>
            <PostDate>{item.date}</PostDate>
          </NameForm>
        </FlexRow>
        <TextComment dangerouslySetInnerHTML={{ __html: item.comment }} />
        {item.files.map(item => (
          <PostImg src={"https://2ch.hk/" + item.path} />
        ))}
      </Block>
    ));
    return <div>{thread}</div>;
  }
}

export default ThreadPage;
