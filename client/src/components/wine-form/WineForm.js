import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import { addWine } from '../../actions/wineActions';
import RadioButtons from '../common/RadioButtons';
import MoreWineOptions from './MoreWineOptions';

class WineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wineName: '',
      winery: '',
      wineType: '',
      notes: '',
      varietal: '',
      tasteDate: '',
      tasteLocation: '',
      rating: '',
      alcoholContent: '',
      price: '',
      vintage: '',
      wineImage: '',
      areOptionsHidden: true,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newWine = {
      wineName: this.state.wineName,
      winery: this.state.winery,
      wineType: this.state.wineType,
      notes: this.state.notes,
      varietal: this.state.varietal,
      tasteDate: this.state.tasteDate,
      tasteLocation: this.state.tasteLocation,
      rating: this.state.rating,
      alcoholContent: this.state.alcoholContent,
      price: this.state.price,
      vintage: this.state.vintage,
      wineImage: this.state.wineImage
    };

    this.props.addWine(newWine, this.props.history);
  }

  onChange(e) {
    const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: newValue });
  }

  onReset = (event) => {
    this.setState({
      isFormHidden: true,
      areOptionsHidden: true
    });
  }

  toggleOptions() {
    this.setState({
      areOptionsHidden: !this.state.areOptionsHidden
    });
  }

  render() {
    const { errors } = this.state;
    const moreWineOptions = {
      tasteDate: this.state.tasteDate,
      tasteLocation: this.state.tasteLocation,
      rating: this.state.rating,
      alcoholContent: this.state.alcoholContent,
      price: this.state.price,
      vintage: this.state.vintage,
      wineImage: this.state.wineImage
    }

    const radioOptions = [
      { name: 'wineType', value: 'Red', checked: this.state.wineType === 'Red', onChange: this.onChange },
      { name: 'wineType', value: 'White', checked: this.state.wineType === 'White', onChange: this.onChange },
      { name: 'wineType', value: 'Sparkling', checked: this.state.wineType === 'Sparkling', onChange: this.onChange },
      { name: 'wineType', value: 'Rosé', checked: this.state.wineType === 'Rosé', onChange: this.onChange },
      { name: 'wineType', value: 'Dessert', checked: this.state.wineType === 'Dessert', onChange: this.onChange },
      { name: 'wineType', value: 'Fortified', checked: this.state.wineType === 'Fortified', onChange: this.onChange }
    ];

    return (
      <form onSubmit={this.onSubmit} onReset={this.onReset}>
        <div className="form-container">
          <TextInput
            name="wineName"
            labelText="Wine Name"
            placeholder="Ex: Picnic Blush"
            value={this.state.wineName}
            onChange={this.onChange}
            error={errors.wineName}
          />

          <TextInput
            name="winery"
            labelText="Winery"
            placeholder="Ex: Mallow Run"
            value={this.state.winery}
            onChange={this.onChange}
            error={errors.winery}
          />

          <RadioButtons
            mainLabel="Wine Type"
            options={radioOptions}
            error={errors.wineType}
          />

          <TextArea
            name="notes"
            labelText="Notes"
            placeholder="Ex: Refreshing, easy drinking"
            onChange={this.onChange}
            value={this.state.notes}
          />

          <TextInput
            name="varietal"
            labelText="Varietal"
            placeholder="Ex: Catawba, Merlot, Riesling"
            value={this.state.varietal}
            onChange={this.onChange}
            error={errors.varietal}
          />

          <a href="#"
            className="expand-link"
            onClick={this.toggleOptions}>
            More Options
          </a>

          {!this.state.areOptionsHidden &&
            <MoreWineOptions moreWineOptions={moreWineOptions} onChange={this.onChange} />
          }

        </div>
        <input type="submit" value="SUBMIT" />
        <input type="reset" value="CANCEL" />
      </form>
    )
  }
}

WineForm.propTypes = {
  addWine: PropTypes.func.isRequired,
  wine: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  wine: state.wine,
  errors: state.errors
})

export default connect(mapStateToProps, { addWine })(withRouter(WineForm));