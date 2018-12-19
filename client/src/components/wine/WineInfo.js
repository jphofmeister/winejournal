import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class WineInfo extends Component {
  constructor(props) {
    super(props);
    this.handleToggleOptions = this.handleToggleOptions.bind(this);
  }

  handleToggleOptions() {
    const newValue = !this.props.showEditForm;
    this.props.onClick(newValue);
  }

  handleDeleteClick(id) {
    this.props.onDeleteClick(id);
  }

  render() {
    const { wine } = this.props;
    let date;
    if (wine.tasteDate) {
      date = (<Moment format="MMM DD, YYYY">{wine.tasteDate}</Moment>);
    } else {
      date = "-";
    }

    return (
      <div>

        <div className="breadcrumbs">
          <Link to="/dashboard">Dashboard</Link> >
          <Link to={`/wine/${wine._id}`}> {wine.wineName}</Link>
        </div>
        <h1>{wine.wineName}</h1>
        <p className="wine-row">Wine Image: <img src={wine.wineImageUrl} alt="" /></p>
        <p className="wine-row">Winery: {wine.winery} </p>
        <p className="wine-row">Wine Type: {wine.wineType} </p>
        <p className="wine-row">Notes: {wine.notes} </p>
        <p className="wine-row">Varietal: {wine.varietal} </p>
        <p className="wine-row">Tasted On: {date}</p>
        <p className="wine-row">Location Tasted At: {wine.tasteLocation}</p>
        <p className="wine-row">Rating: {wine.rating} Stars</p>
        <p className="wine-row">Alcohol Content: {wine.alcoholContent}%</p>
        <p className="wine-row">Price: ${wine.price}</p>
        <p className="wine-row">Vintage: {wine.vintage}</p>
        <div>
          <button onClick={this.handleToggleOptions}>Edit Wine</button>
        </div>
        <div>
          <button onClick={this.handleDeleteClick.bind(this, wine._id)}>
            <i className="fas fa-times" />
          </button>
        </div>

      </div>
    )
  }
}

WineInfo.defaultProps = {
  showEditForm: false
}

export default WineInfo;