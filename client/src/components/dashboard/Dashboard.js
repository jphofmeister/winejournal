import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WineFeed from '../wine/WineFeed';
import Spinner from '../common/Spinner';
import { getWines } from '../../actions/wineActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getWines();
  }

  render() {
    const { user } = this.props.auth;
    const { wines, loading } = this.props.wine;

    let wineContent;

    if (wines === null || loading) {
      wineContent = <Spinner />
    } else {
      wineContent = <WineFeed wines={wines} />
    }

    return (
      <section>
        <h1>Dashboard</h1>
        <Link to="/add-wine" className="button add-wine-btn btn-primary">Add Wine</Link>
        {wineContent}
      </section>
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