import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostsAndUsers } from "../../actions";
import Loader from "../Loader";
import PostListItem from "./PostListItem";

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchPostsAndUsers();
  }

  render() {
    if (this.props.posts.loading) return <Loader />;

    return (
      <div className="ui cards" style={{ justifyContent: "center" }}>
        {this.props.posts.data.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { fetchPostsAndUsers }
)(PostsList);
