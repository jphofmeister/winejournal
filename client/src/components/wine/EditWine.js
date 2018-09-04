import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import { editWine } from '../../actions/wineActions';
import RadioButtons from '../common/RadioButtons';
import isEmpty from '../../validation/is-empty';

class EditWine extends Component {
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
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  // componentDidMount() {
  //   this.props.getWine(this.props.match.params.id);
  // }

  componentDidMount() {
    const { wine } = this.props;

    const varietalCSV = wine.varietal.join(',');

    // if field is empty, make it an empty string
    wine.wineName = !isEmpty(wine.wineName) ? wine.wineName : '';
    wine.winery = !isEmpty(wine.winery) ? wine.winery : '';
    wine.wineType = !isEmpty(wine.wineType) ? wine.wineType : '';
    wine.notes = !isEmpty(wine.notes) ? wine.notes : '';
    //wine.varietal = !isEmpty(wine.varietal) ? wine.varietal : '';
    wine.tasteDate = !isEmpty(wine.tasteDate) ? wine.tasteDate : '';
    wine.tasteLocation = !isEmpty(wine.tasteLocation) ? wine.tasteLocation : '';
    wine.rating = !isEmpty(wine.rating) ? wine.rating : '';
    wine.alcoholContent = !isEmpty(wine.alcoholContent) ? wine.alcoholContent : '';
    wine.price = !isEmpty(wine.price) ? wine.price : '';
    wine.vintage = !isEmpty(wine.vintage) ? wine.vintage : '';
    wine.wineImage = !isEmpty(wine.wineImage) ? wine.wineImage : '';

    this.setState({
      wineName: wine.wineName,
      winery: wine.winery,
      wineType: wine.wineType,
      notes: wine.notes,
      varietal: varietalCSV,
      tasteDate: wine.tasteDate,
      tasteLocation: wine.tasteLocation,
      rating: wine.rating,
      alcoholContent: wine.alcoholContent,
      price: wine.price,
      vintage: wine.vintage,
      wineImage: wine.wineImage
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const wineId = this.props.wine._id;

    const updatedWine = {
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

    this.props.editWine(wineId, updatedWine, this.props.history);

    const newValue = !this.props.showEditForm;
    this.props.onClick(newValue);
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


  render() {
    const { errors } = this.state;

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

          <TextInput
            name="tasteDate"
            labelText="Tasted On"
            type="date"
            placeholder="mm/dd/yyyy"
            value={this.state.tasteDate}
            onChange={this.onChange}
            error={errors.tasteDate}
          />

          <TextInput
            name="tasteLocation"
            labelText="Location Tasted At"
            placeholder="Location"
            value={this.state.tasteLocation}
            onChange={this.onChange}
            error={errors.tasteLocation}
          />

          <TextInput
            name="rating"
            labelText="Rating"
            type="number"
            placeholder="Out of 5"
            value={this.state.rating}
            onChange={this.onChange}
            error={errors.rating}
          />

          <TextInput
            name="alcoholContent"
            labelText="Alcohol Content"
            type="number"
            placeholder="Alcohol Content"
            value={this.state.alcoholContent}
            onChange={this.onChange}
            error={errors.alcoholContent}
          />

          <TextInput
            name="price"
            labelText="Price"
            type="number"
            placeholder="Price"
            value={this.state.price}
            step="any"
            onChange={this.onChange}
            error={errors.price}
          />

          <TextInput
            name="vintage"
            labelText="Vintage"
            type="number"
            placeholder="Vintage"
            value={this.state.vintage}
            onChange={this.onChange}
            error={errors.vintage}
          />

        </div>
        <input type="submit" value="SUBMIT" />
        <input type="reset" value="CANCEL" />
      </form>
    )
  }
}

EditWine.propTypes = {
  editWine: PropTypes.func.isRequired,
  //wine: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  //wine: state.wine,
  errors: state.errors
})

export default connect(mapStateToProps, { editWine })(EditWine);