import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import PostsList from "./Posts/PostsList";
import PostCreate from "./Posts/PostCreate";
import Post from "./Posts/Post";
import history from "../history";

export default () => {
  return (
    <div>
      <Router history={history}>
        <div className="ui main container" style={{ marginTop: "60px" }}>
          <Menu />
          <Switch>
            <Route path="/" exact component={PostsList} />
            <Route path="/posts/new" component={PostCreate} />
            <Route path="/posts/:id" component={Post} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
