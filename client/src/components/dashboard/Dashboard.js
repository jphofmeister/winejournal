import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import WineFeed from '../wine-feed/WineFeed';
import Spinner from '../common/Spinner';
import { getWines } from '../../actions/wineActions';
import groupByMonth from '../../utils/groupByMonth';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getWines();
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
        {wineContent}
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