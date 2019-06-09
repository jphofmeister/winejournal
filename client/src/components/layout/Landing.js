import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import wine_journal_logo from '../../images/wine_journal_logo.png'

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <section className="landing">
        <img src={wine_journal_logo} />
        <div className="container">
          <h1>Record your<br />
            Wine Discoveries</h1>
          <p>
            This wine journal allows you to create simple-to-detailed entries of your wine tastings. Upload a picture, enter basic details, write tasting notes, and more.
          </p>
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