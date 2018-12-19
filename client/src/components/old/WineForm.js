import React, { Component } from 'react';

class WineForm extends Component {
  constructor(props) {
    super(props);
    this.handleChangeFor = this.handleChangeFor.bind(this);
  }

  handleChangeFor = (propertyName) => (event) => {
    const forProperty = propertyName;
    const target = event.target;
    const newValue = target.type === 'checkbox' ? target.checked : target.value;

    this.props.onChange(forProperty, newValue);
  }

  render() {
    return (
      <div className="form-container">
        <div className="form-row">
          <label htmlFor="wineName">Wine Name</label>
          <input
            type="text"
            name="wineName"
            placeholder="Ex: Picnic Blush"
            onChange={this.handleChangeFor('wineName')}
            value={this.props.wineName} />
        </div>

        <div className="form-row">
          <label htmlFor="winery">Winery</label>
          <input
            type="text"
            name="winery"
            placeholder="Ex: Mallow Run"
            onChange={this.handleChangeFor('winery')}
            value={this.props.winery} />
        </div>

        <div className="form-row">
          <label>Wine Type</label>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="wineType"
                onChange={this.handleChangeFor('wineType')}
                value="Red"
                checked={this.props.wineType === 'Red'} />
              Red
            </label>

            <label>
              <input
                type="radio"
                name="wineType"
                onChange={this.handleChangeFor('wineType')}
                value="White"
                checked={this.props.wineType === 'White'} />
              White
            </label>

            <label>
              <input
                type="radio"
                name="wineType"
                onChange={this.handleChangeFor('wineType')}
                value="Sparkling"
                checked={this.props.wineType === 'Sparkling'} />
              Sparkling
            </label>

            <label>
              <input
                type="radio"
                name="wineType"
                onChange={this.handleChangeFor('wineType')}
                value="Rosé"
                checked={this.props.wineType === 'Rosé'} />
              Rosé
            </label>

            <label>
              <input
                type="radio"
                name="wineType"
                onChange={this.handleChangeFor('wineType')}
                value="Dessert"
                checked={this.props.wineType === 'Dessert'} />
              Dessert
            </label>

            <label>
              <input
                type="radio"
                name="wineType"
                onChange={this.handleChangeFor('wineType')}
                value="Fortified"
                checked={this.props.wineType === 'Fortified'} />
              Fortified
            </label>
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            placeholder="Ex: Refreshing, easy drinking"
            onChange={this.handleChangeFor('notes')}
            value={this.props.notes} />
        </div>

        <div className="form-row">
          <label htmlFor="varietal">Varietal</label>
          <input
            type="text"
            name="varietal"
            placeholder="Ex: Catawba, Merlot, Riesling"
            onChange={this.handleChangeFor('varietal')}
            value={this.props.varietal} />
        </div>

      </div>
    );
  }
}

export default WineForm;