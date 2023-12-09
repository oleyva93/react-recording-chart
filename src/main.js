import ReactDOM from "react-dom";
import { Route, Router, hashHistory } from "react-router";

import App from "./App";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}></Route>
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
