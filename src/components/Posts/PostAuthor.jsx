import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
import { Link } from "react-router-dom";

class PostAuthor extends Component {
  render() {
    if (!this.props.user) {
      return null;
    }

    const { id, name } = this.props.user;
    return (
      <Link to={`/users/${id}`}>
        <h1 className="ui label">
          <i className="user icon" />
          {name}
        </h1>
      </Link>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.users.data.find(user => user.id == props.id)
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(PostAuthor);
