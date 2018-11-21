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
      <section className="landing">
        <div className="container">
          <h1>Wine Journal</h1>
          <p>Keep your wines here! Organize your wine cellar, write down notes, rate your favorites, and more!</p>
          <div className="landing-buttons">
            <Link to="/login" className="button">
              LOGIN
            </Link>
            <Link to="/register" className="button btn-primary">
              SIGN UP
            </Link>
          </div>
        </div >
      </section >
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