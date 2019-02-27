import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../../actions";

class PostCreate extends Component {
  state = {
    fields: { title: "", body: "" },
    errors: { title: null, body: null },
    touched: { title: false, body: false },
    submitted: false
  };

  handleSubmit = async e => {
    e.preventDefault();

    //setState function doesn't work immediately, so we must await for validation before submitting form
    await this.validateTitle(this.state.fields.title, true);
    await this.validateBody(this.state.fields.body, true);

    const isValid = Object.values(this.state.errors).every(k => k === null);

    if (isValid) {
      this.setState({ submitted: true });
      this.props.createPost(this.state.fields);
    }
  };

  componentDidUpdate() {
    if (this.state.submitted && !this.props.loading) {
      alert("The record was added.");
      this.setState({
        fields: { title: "", body: "" },
        errors: { title: "", body: "" },
        touched: { title: false, body: false },
        submitted: false
      });
    }
  }

  validateTitle = (value, isTouched = false) => {
    const touched = isTouched || this.state.touched.title;
    const message =
      touched && value.length < 3
        ? "Title must be at least 3 characters"
        : null;

    this.setState({
      fields: { ...this.state.fields, title: value },
      errors: { ...this.state.errors, title: message },
      touched: { ...this.state.errors, title: touched }
    });
  };

  validateBody = (value, isTouched = false) => {
    const touched = isTouched || this.state.touched.body;
    const message =
      touched && value.length < 10
        ? "Body must be at least 10 characters"
        : null;

    this.setState({
      fields: { ...this.state.fields, body: value },
      errors: { ...this.state.errors, body: message },
      touched: { ...this.state.errors, body: touched }
    });
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={e => this.handleSubmit(e)} className="ui form error">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              autoComplete="off"
              value={this.state.fields.title}
              onChange={e => this.validateTitle(e.target.value)}
              onBlur={e => this.validateTitle(e.target.value, true)}
            />
          </div>
          <div className="ui error message">{this.state.errors.title}</div>

          <div className="field">
            <label>Body</label>
            <textarea
              value={this.state.fields.body}
              name="body"
              onChange={e => this.validateBody(e.target.value)}
              onBlur={e => this.validateBody(e.target.value, true)}
            />
          </div>
          <div className="ui error message">{this.state.errors.body}</div>
          <div style={{ textAlign: "right" }}>
            <button
              className="ui button"
              type="submit"
              disabled={this.state.submitted && this.props.loading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { loading: state.posts.loading };
};

export default connect(
  mapStateToProps,
  { createPost }
)(PostCreate);
