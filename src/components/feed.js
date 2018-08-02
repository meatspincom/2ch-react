import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Ava = styled.span`
  height: 20px;
  width: 20px;
  background: url("/ava.jpg") no-repeat;
  background-size: 20px 20px;
  display: block;
  border-radius: 200px;
  border: 0px solid #000000;
`;

const PostAva = styled.span`
  height: 50px;
  width: 50px;
  background: url("/ava.jpg") no-repeat;
  background-size: 50px 50px;
  display: block;
  border-radius: 200px;
  border: 0px solid #000000;
`;

const CommentAva = styled.span`
  height: 35px;
  width: 35px;
  background: url("/ava.jpg") no-repeat;
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
const Clip = styled.span`
  height: 20px;
  width: 20px;
  background: url("./clip.png") no-repeat;
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
    }
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
      this.props.board
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
      nextProps.board
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
            <Link to={"/" + this.props.board + "/res/" + item.thread_num}>
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
        <FlexRow>
          <CommentAva />
          <CreatePostInput placeholder="Написать комментарий..." />
          <Clip />
        </FlexRow>
      </Block>
    ));
    return (
      <Wrapper>
        <Block>
          <FlexRow>
            <Ava />
            <CreatePostInput placeholder="Что у Вас нового?" />
            <Clip />
          </FlexRow>
        </Block>
        {thread}
      </Wrapper>
    );
  }
}

export default Feed;
