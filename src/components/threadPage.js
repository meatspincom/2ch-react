import React from "react";
import styled from "styled-components";
import axios from "axios";
import avaImg from "../img/ava.jpg";
import clipImg from "../img/clip.png"

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

const CommentBlock = styled.div`
  border-top: #cecdcc solid 1px !important;
  padding: 15px 20px;
  margin-bottom: 50px;
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

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const CommentAva = styled.span`
  height: 35px;
  width: 35px;
  background: url(${avaImg}) no-repeat;
  background-size: 35px 35px;
  display: block;
  border-radius: 200px;
  border: 0px solid #000000;
`;
const CreatePostInput = styled.input`
  border: 0px;
  width: 460px;
  margin: 0 10px;
`;
const SubmitPost = styled.a`
    padding: 7px 16px 8px;
    cursor: pointer;
    outline: none;
    text-align: center;
    text-decoration: none;
    background-color: #EFEEEC;
    border-radius: 4px;
    margin-left: 438px;
`
const CreateCommentTextArea = styled.textarea`
  height: 50px;
  border: 0px;
  width: 460px;
  margin: 0 8px;
  margin-top: 8px;
  resize: none;
  :focus{
    outline:0;
  }
`;
const Clip = styled.label`
  cursor: pointer;
  height: 20px;
  width: 20px;
  background: url(${clipImg}) no-repeat;
  background-size: 20px 20px;
  margin-top: 10px;
  display: block;
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
      <Block key={item.num}>
        <FlexRow>
          <PostAva />
          <NameForm>
            <NameContainer><PostName>Аноним №{item.num}</PostName></NameContainer>
            <PostDate>{item.date}</PostDate>
          </NameForm>
        </FlexRow>
        <TextComment dangerouslySetInnerHTML={{ __html: item.comment }} />
        {item.files.map(item => (
          <PostImg src={"https://2ch.hk/" + item.path} />
        ))}
      </Block>
    ));
    return <div>
      {thread}
      <CommentBlock>
          <FlexRow>
            <CommentAva />
            {!this.state[this.props.thread] && <CreatePostInput onFocus={() => {let update = {}; update[this.props.thread] = true; this.setState(update)}} placeholder="Написать комментарий.." />}
            {this.state[this.props.thread] && <CreateCommentTextArea autoFocus onBlur={() => {let update = {}; update[this.props.thread] = false; this.setState(update)}}placeholder="Написать комментарий.." />}
            <Clip htmlFor={`file-${this.props.thread}`} />
            <input id={`file-${this.props.thread}`} type="file" accept="image/*,video/mp4,video/webm" />
          </FlexRow>
          {this.state[this.props.thread] && <SubmitPost>Отправить</SubmitPost>}
      </CommentBlock>
      </div>;
  }
}

export default ThreadPage;
