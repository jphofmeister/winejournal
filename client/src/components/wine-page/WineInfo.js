import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class WineInfo extends Component {
  constructor(props) {
    super(props);
    this.handleToggleShowEditForm = this.handleToggleShowEditForm.bind(this);
  }

  handleToggleShowEditForm() {
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
      <div className="wine-info">

        <div className="breadcrumbs">
          <Link to="/dashboard"><i className="fas fa-arrow-left" /> <span className="back-text">Back</span></Link>
        </div>

        <div className="wine-heading-img-container">
          <div className="wine-img">
            <img src={wine.wineImageUrl} alt="" />
          </div>
        </div>

        <div className="wine-content">
          <div className="wine-heading">
            <h1>{wine.wineName}</h1>
            <button onClick={this.handleToggleShowEditForm} className="edit-wine-button">Edit Wine</button>
          </div>
          <div className="description-row"><div className="description-label">Winery:</div> {wine.winery} </div>
          <div className="description-row"><div className="description-label">Wine Type:</div> {wine.wineType} </div>
          <div className="description-row"><div className="description-label">Notes:</div> {wine.notes} </div>
          <div className="description-row"><div className="description-label">Varietal:</div> {wine.varietal} </div>
          <div className="description-row"><div className="description-label">Tasted On:</div> {date}</div>
          <div className="description-row"><div className="description-label">Location Tasted At:</div> {wine.tasteLocation}</div>
          <div className="description-row"><div className="description-label">Rating:</div> {wine.rating} Stars</div>
          <div className="description-row"><div className="description-label">Alcohol Content:</div> {wine.alcoholContent}%</div>
          <div className="description-row"><div className="description-label">Price:</div> ${wine.price}</div>
          <div className="description-row"><div className="description-label">Vintage:</div> {wine.vintage}</div>
          <button className="delete" onClick={this.handleDeleteClick.bind(this, wine._id)}>
            <i className="fas fa-times" /> Delete
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