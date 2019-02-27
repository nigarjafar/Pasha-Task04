import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="ui inverted menu fixed">
      <Link to="/" className="active item">
        Home
      </Link>
      <Link to="/posts/new" className="active item">
        Create
      </Link>
    </div>
  );
};
