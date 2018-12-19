import React, { Component } from 'react';

class MoreWineOptions extends Component {
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
          <label htmlFor="tasteDate">Tasted On</label>
          <input
            type="text"
            name="tasteDate"
            placeholder="mm/dd/yyyy"
            onChange={this.handleChangeFor('tasteDate')}
            value={this.props.tasteDate} />
        </div>
      </div>
    );
  }
}

export default MoreWineOptions;