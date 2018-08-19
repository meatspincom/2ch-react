import React from "react";
import styled, { consolidateStreamedStyles } from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import avaImg from "../img/ava.jpg";
import clipImg from "../img/clip.png"
import { isString } from "util";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Ava = styled.span`
  height: 20px;
  width: 20px;
  background: url(${avaImg}) no-repeat;
  background-size: 20px 20px;
  display: block;
  border-radius: 200px;
  border: 0px solid #000000;
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

const CommentAva = styled.span`
  height: 35px;
  width: 35px;
  background: url(${avaImg}) no-repeat;
  background-size: 35px 35px;
  display: block;
  border-radius: 200px;
  border: 0px solid #000000;
`;

const NameForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const Block = styled.div`
  padding: 15px 20px;
  border: 0px;
  border-radius: 5px;
  background: #ffffff;
  margin-left: 15px;
  margin-top: 15px;
  width: 550px;
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
const CreatePostTextArea = styled.textarea`
  height: 50px;
  border: 0px;
  width: 460px;
  margin: 0 8px;
  margin-top: 1px;
  resize: none;
  :focus{
    outline:0;
  }
`;
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
const PostClip = styled.label`
  cursor: pointer;
  height: 20px;
  width: 20px;
  background: url(${clipImg}) no-repeat;
  background-size: 20px 20px;
  display: block;
`;
const PostName = styled.p`
  color: #9a7a19;
  font-size: 12px;
  font-weight: bold;
`;

const CommnentName = styled.p`
  color: #9a7a19;
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
`;

const Text = styled.p`
  color: #939393;
  font-size: 12px;
  margin-top: 6px;
`;

const TextComment = styled.p`
  color: #939393;
  font-size: 12px;
  width: 470px;
  margin-top: 6px;
  margin-left: 10px;
`;

const PostDate = styled.p`
  color: #939393;
  font-size: 12px;
  margin-top: 6px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Line = styled.hr`
  border: none;
  color: #ebeae6;
  background-color: #ebeae6;
  height: 1px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div`
  margin-top: 10px;
`;

const PostImg = styled.img`
  height: auto;
  max-width: 200px;
  margin-top: 10px;
  margin-left: 10px;
`;

const ShowComments = styled.div`
  background: #f2f0ed;
  font-size: 12px;
  text-align: center;
  padding: 10px 0;
`;

class Feed extends React.Component {
  state = {
    data: {
      threads: [
        {
          posts: [
            {
              comment: "Loading...",
              num: "1",
              op: 0,
              posts_count: 3
            }
          ]
        }
      ]
    },
    isPostActive: false
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
    this.getArr(`https://cors-anywhere.herokuapp.com/https://2ch.hk/${
      this.props.match.params.board.slice(0)
    }/index.json`);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: {
        threads: [
          {
            posts: [
              {
                comment: "Loading...",
                num: "1",
                op: 0,
                posts_count: 3
              }
            ]
          }
        ]
      }
    });
    const url = `https://cors-anywhere.herokuapp.com/https://2ch.hk/${
      nextProps.location.pathname.slice(0)
    }/index.json`;
    this.getArr(url);
  }
  render() {
    const thread = this.state.data.threads.map(item => (
      <Block>
        <FlexRow>
          <PostAva />
          <NameForm>
            <PostName>Аноним №{item.thread_num}</PostName>
            <PostDate>{item.posts[0].date}</PostDate>
          </NameForm>
        </FlexRow>
        <Text dangerouslySetInnerHTML={{ __html: item.posts[0].comment }} />
        {item.posts[0].files_count &&
          item.posts[0].files.map(item => (
            <PostImg src={"https://2ch.hk/" + item.path} />
          ))}
        <Line />
        {item.posts_count > 4 && (
          <ShowComments>
            <Link to={"/" + this.props.match.params.board.slice(0) + "/res/" + item.thread_num}>
              Показать еще {item.posts_count} комментариев
            </Link>
          </ShowComments>
        )}
        {item.posts.slice(1, item.posts.length).map(item => (
          <Comment>
            <FlexRow>
              <CommentAva />
              <CommentContent>
                <CommnentName>Аноним №{item.num}</CommnentName>
                <TextComment
                  dangerouslySetInnerHTML={{ __html: item.comment }}
                />
                {item.files.map(item => (
                  <PostImg src={"https://2ch.hk/" + item.path} />
                ))}
              </CommentContent>
            </FlexRow>
            <Line />
          </Comment>
        ))}
        <div>
          <FlexRow>
            <CommentAva/>
            {!this.state[item.thread_num] && <CreatePostInput onFocus={() => {let update = {}; update[item.thread_num] = true; this.setState(update)}} placeholder="Написать комментарий.." />}
            {this.state[item.thread_num] && <CreateCommentTextArea autoFocus onBlur={() => {let update = {}; update[item.thread_num] = false; this.setState(update)}}placeholder="Написать комментарий.." />}
            <Clip htmlFor={`file-${item.thread_num}`} />
            <input id={`file-${item.thread_num}`} type="file" accept="image/*,video/mp4,video/webm" />
          </FlexRow>
          {this.state[item.thread_num] && <SubmitPost>Отправить</SubmitPost>}
        </div>
      </Block>
    ));
    return (
      <Wrapper>
        <Block>
          <div>
            <FlexRow>
              <Ava />
              {!this.state.isPostActive && <CreatePostInput onFocus={() => {this.setState({...this.state, isPostActive:true})}} placeholder="Что у Вас нового?" />}
              {this.state.isPostActive && <CreatePostTextArea onBlur={() => {this.setState({...this.state, isPostActive:false})}} autoFocus placeholder="Что у Вас нового?" />}
              <PostClip htmlFor="file-0" />
              <input id="file-0" type="file" accept="image/*,video/mp4,video/webm" />
            </FlexRow>
            {this.state.isPostActive && <SubmitPost>Отправить</SubmitPost>}
          </div>
        </Block>
        {thread}
      </Wrapper>
    );
  }
}

export default Feed;
