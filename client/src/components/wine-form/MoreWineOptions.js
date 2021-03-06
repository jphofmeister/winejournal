import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextInput from '../common/TextInput';

class MoreWineOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="form-container">

        <TextInput
          name="tasteLocation"
          labelText="Location Tasted At"
          placeholder="Location"
          value={this.props.tasteLocation}
          onChange={this.props.onChange}
          error={errors.tasteLocation}
          divClass="wine-form-row"
        />

        <TextInput
          name="rating"
          labelText="Rating"
          type="number"
          placeholder="Out of 5"
          value={this.props.rating}
          onChange={this.props.onChange}
          error={errors.rating}
          divClass="wine-form-row"
        />

        <TextInput
          name="alcoholContent"
          labelText="Alcohol Content"
          type="number"
          placeholder="Alcohol Content"
          value={this.props.alcoholContent}
          onChange={this.props.onChange}
          error={errors.alcoholContent}
          divClass="wine-form-row"
        />

        <TextInput
          name="price"
          labelText="Price"
          type="number"
          placeholder="Price"
          value={this.props.price}
          step="any"
          onChange={this.props.onChange}
          error={errors.price}
          divClass="wine-form-row"
        />

        <TextInput
          name="vintage"
          labelText="Vintage"
          type="number"
          placeholder="Vintage"
          value={this.props.vintage}
          onChange={this.props.onChange}
          error={errors.vintage}
          divClass="wine-form-row"
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps)(MoreWineOptions);