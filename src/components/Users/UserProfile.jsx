import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
import Loader from "../Loader";
import faker from "faker";

class UserProfile extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.fetchUser(this.props.match.params.id);
  }
  render() {
    if (!this.props.user) {
      return <Loader />;
    }

    const { user } = this.props;

    return (
      <div className="ui four column grid">
        <div className="row">
          <div className="four wide column">
            <div className="ui card">
              <a className="image" href="#link">
                <img src={faker.image.city()} />
              </a>
              <div className="content">
                <div className="header">{user.name}</div>
                <div className="meta">
                  <div className="time">@{user.username}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="twelve wide column">
            <div className="column">
              <h2>{user.name}</h2>
              <hr />
              <h5>
                <i className="teal envelope icon" /> {user.email}
              </h5>
              <h5>
                <i className="teal globe icon" /> {user.website}
              </h5>
              <h5>
                <i className="teal briefcase icon" />
                {user.company.name} ,{user.company.catchPhrase}
              </h5>
              <h5>
                <i className="teal map pin icon" />
                {user.address.city} {user.address.street}
              </h5>
              <h5>
                <i className="teal phone icon" /> {user.phone}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(state);
  return {
    user: state.users.data.find(user => user.id == props.match.params.id)
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(UserProfile);
