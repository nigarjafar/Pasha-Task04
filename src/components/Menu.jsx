import React from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <div className="ui inverted segment">
      <div className="ui inverted secondary pointing menu">
        <NavLink to="/" exact activeClassName="active" className="item">
          Home
        </NavLink>
        <NavLink to="/posts/new" activeClassName="active" className="item">
          Add Post
        </NavLink>
      </div>
    </div>
  );
};
