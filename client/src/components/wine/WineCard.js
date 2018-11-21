import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class WineCard extends Component {

  render() {
    const { wine } = this.props;

    // let date;
    // if (wine.tasteDate) {
    //   date = (<Moment format="MMM DD, YYYY">{wine.tasteDate}</Moment>);
    // } else {
    //   date = "-";
    // }

    const cardImage = {
      backgroundImage: `url(${wine.wineImageUrl})`
    }


    return (
      <Link to={`/wine/${wine._id}`}>
        <div className="wine-card">
          <div className="card-image" style={cardImage}></div>
          <h3 className="wine-row">{wine.wineName} </h3>
          <span className="wine-row">Winery: {wine.winery} </span>
          <span className="wine-row">Wine Type: {wine.wineType} </span>
          {/* <span className="wine-row">Notes: {wine.notes} </span>
          <span className="wine-row">Varietal: {wine.varietal} </span>
          <span className="wine-row">Tasted On: {date}</span> */}
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