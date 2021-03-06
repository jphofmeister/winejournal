import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import wine_journal_logo from '../../images/wine_journal_logo.png';

import getMonthYearString from '../../utils/getMonthYearString';

class Sidebar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  closeMenu() {
    const header = document.getElementById('header');
    header.classList.toggle('sidebar-open');
  }

  render() {
    //const { isAuthenticated } = this.props.auth;
    const { months } = this.props;

    const authLinks = (
      <ul>
        {/* <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li> */}
        <li>
          <a href="" onClick={this.onLogoutClick.bind(this)}>
            <i className="fas fa-sign-out-alt" /> Logout
          </a>
        </li>
      </ul>
    );

    return (
      <header id="header">
        <Link to="/">
          <img src={wine_journal_logo} className="logo-img" alt="Wine Journal" />
        </Link>

        <button className="icon-button close-menu" onClick={this.closeMenu.bind(this)}>
          <i className="fas fa-times" />
        </button>

        <Link to="/add-wine" className="button add-wine-btn btn-primary">+ Add Wine</Link>
        
        <ul className="month-list">
          {months.map((month) => (
            <li key={month}>
              <a href={`#${month}`}>{getMonthYearString(month)}</a>
            </li>
          ))}
        </ul>
        <div>
          {authLinks}
        </div>

      </header>
    );
  }
}

Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Sidebar);