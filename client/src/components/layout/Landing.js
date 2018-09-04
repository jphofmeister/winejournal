import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <section>
        <h1 className="display-3 mb-4">Wine Journal</h1>
        <p className="lead">
          {' '}
          Keep you wines here!
        </p>
        <hr />
        <Link to="/register" className="button">
          Sign Up
        </Link>
        <Link to="/login" className="button">
          Login
        </Link>
      </section>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);