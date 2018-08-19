import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";
import { BrowserRouter as Router} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory;


const Render = () => (
  <Router history={history}>
    <App />
  </Router>
);

ReactDOM.render(<Render />, document.getElementById("root"));
