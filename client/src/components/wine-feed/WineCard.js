import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import placeholder_image from './placeholder_image.jpg';

class WineCard extends Component {

  render() {
    const { wine } = this.props;

    let cardImage;
    if (wine.wineImageUrl) {
      cardImage = { backgroundImage: `url(${wine.wineImageUrl})`}
     } else {
      cardImage = { backgroundImage: `url(${placeholder_image})`}
     }
    


    return (
      <Link to={`/wine/${wine._id}`}>
        <div className="wine-card">
          <div className="card-image" style={cardImage}></div>
          <h3 className="wine-row">{wine.wineName} </h3>
          <span className="wine-row">Winery: {wine.winery} </span>
          <span className="wine-row">Wine Type: {wine.wineType} </span>
        </div>
      </Link>
    )
  }
}

WineCard.propTypes = {
  wine: PropTypes.object.isRequired
}

export default WineCard;