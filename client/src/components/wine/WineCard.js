import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class WineCard extends Component {


  render() {
    const { wine } = this.props;

    return (
      <Link to={`/wine/${wine._id}`}>
        <div className="wine-card">
          <span className="wine-row">Name: {wine.wineName} </span>
          <span className="wine-row">Winery: {wine.winery} </span>
          <span className="wine-row">Wine Type: {wine.wineType} </span>
          <span className="wine-row">Notes: {wine.notes} </span>
          <span className="wine-row">Varietal: {wine.varietal} </span>
          <span className="wine-row">Tasted On: <Moment format="MMM DD, YYYY">{wine.tasteDate}</Moment></span>
        </div>
      </Link>
    )
  }
}

WineCard.propTypes = {
  wine: PropTypes.object.isRequired
}

// const mapStateToProps = state => ({
//   //auth: state.auth
//   //wine: state.wine
// });

export default WineCard;