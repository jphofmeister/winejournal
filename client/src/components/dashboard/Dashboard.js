import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import WineFeed from '../wine-feed/WineFeed';
import Spinner from '../common/Spinner';
import { getWines } from '../../actions/wineActions';
import groupByMonth from '../../utils/groupByMonth';
import wine_journal_logo from '../../images/wine_journal_logo.png';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getWines();

    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    const header = document.getElementById('header');
    header.classList.toggle('sidebar-open');
  }

  render() {
    const { wines, loading } = this.props.wine;

    const { months, winesByMonth } = groupByMonth(wines);
    if (months === 0) {
      return (
        <span>You have not added any wine.</span>
      );
    }

    let wineContent;

    if (wines === null || loading) {
      wineContent = <Spinner />
    } else {
      wineContent = <WineFeed months={months} winesByMonth={winesByMonth} />
    }

    return (
      <div className="grid-container">
        <Sidebar months={months} />

        <main>
          <div className="mobile-header">
            <button className="icon-button open-menu" onClick={this.openMenu}><i class="fas fa-bars"></i></button>
            <img src={wine_journal_logo} className="logo-img" alt="Wine Journal" />
          </div>
          {wineContent}
        </main>
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getWines: PropTypes.func.isRequired,
  wine: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  wine: state.wine
});

export default connect(mapStateToProps, { getWines })(Dashboard);