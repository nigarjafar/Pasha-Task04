import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

class PostListItem extends Component {
  render() {
    const { id, title, body, userId } = this.props.post;

    return (
      <div className="ui card">
        <div className="content">
          <div className="header">
            <Link to={`/posts/${id}`}>{title} </Link>
          </div>

          <div className="description">
            <p>{body}</p>
          </div>
        </div>
        <div className="extra content">
          <PostAuthor id={userId} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(PostListItem);
