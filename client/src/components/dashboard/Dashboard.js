import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import WineFeed from '../wine-feed/WineFeed';
import Spinner from '../common/Spinner';
import { getWines } from '../../actions/wineActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getWines();
  }

  render() {
    //const { user } = this.props.auth;
    const { wines, loading } = this.props.wine;

    let wineContent;

    if (wines === null || loading) {
      wineContent = <Spinner />
    } else {
      wineContent = <WineFeed wines={wines} />
    }

    return (
      <div className="grid-container">
        <Sidebar />
        <main>
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