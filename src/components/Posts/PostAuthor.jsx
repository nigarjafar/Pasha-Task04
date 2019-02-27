import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";

class PostAuthor extends Component {
  render() {
    if (!this.props.user) {
      return null;
    }

    return (
      <h1 className="ui label">
        <i className="user icon" />
        {this.props.user.name}
      </h1>
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
