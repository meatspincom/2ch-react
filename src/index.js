import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";
import Thread from "./components/thread";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory;
class Home extends React.Component{
  render(){
  return <Redirect to="/b"></Redirect>
}}


const Render = () => (
  <Router history={history}>
    <Switch>
      <Route path="/:board" exact component={App} />
      <Route path="/:board/res/:thread" exact component={Thread} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

ReactDOM.render(<Render />, document.getElementById("root"));
