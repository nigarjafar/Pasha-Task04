import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPostandDetails } from "../../actions";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import faker from "faker";
import PostAuthor from "./PostAuthor";

class Post extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPostandDetails(id);
  }

  renderComments() {
    if (this.props.commentsLoading) {
      return <Loader />;
    }

    return this.props.comments.map(comment => {
      return (
        <div key={comment.id} className="comment">
          <div className="avatar">
            <img src={faker.image.avatar()} />
          </div>

          <div className="content">
            <div className="author">{comment.email}</div>

            <div className="text">{comment.body}</div>
          </div>
        </div>
      );
    });
  }

  renderBreadcrumb() {
    return (
      <div className="ui breadcrumb">
        <Link to="/" className="section">
          Home
        </Link>
        <div className="divider"> / </div>
        <Link to="/" className="section">
          Posts
        </Link>
        <div className="divider"> / </div>
        <Link to={`/posts/${this.props.match.params.id}`} className="section">
          {this.props.post ? this.props.post.title : ""}
        </Link>
      </div>
    );
  }

  render() {
    if (!this.props.post) return <Loader />;

    const { title, body, userId } = this.props.post;
    return (
      <div>
        {this.renderBreadcrumb()}
        <div className="ui segment">
          <h1>{title}</h1>
          <p>{body}</p>
          <PostAuthor id={userId} />
        </div>
        <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
          {this.renderComments()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const postId = props.match.params.id;

  return {
    post: state.posts.data.find(post => post.id == postId),
    postLoading: state.posts.loading,
    comments: state.comments.data.filter(comment => comment.postId == postId),
    commentsLoading: state.comments.loading
  };
};

export default connect(
  mapStateToProps,
  { fetchPostandDetails }
)(Post);
