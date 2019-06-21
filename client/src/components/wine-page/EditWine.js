import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import { editWine } from '../../actions/wineActions';
import RadioButtons from '../common/RadioButtons';
import isEmpty from '../../validation/is-empty';

import placeholder_image from '../wine-feed/placeholder_image.jpg';
import wine_type_red from '../../images/wine_type_red.png';
import wine_type_white from '../../images/wine_type_white.png';
import wine_type_rose from '../../images/wine_type_rose.png';
import wine_type_sparkling from '../../images/wine_type_sparkling.png';
import wine_type_dessert from '../../images/wine_type_dessert.png';
import wine_type_port from '../../images/wine_type_port.png';

class EditWine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wineName: '',
      winery: '',
      wineType: '',
      notes: '',
      varietal: [],
      tasteDate: '',
      tasteLocation: '',
      rating: '',
      alcoholContent: '',
      price: '',
      vintage: '',
      wineImage: '',
      tempImageUrl: null,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
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
    wine.tempImageUrl = !isEmpty(wine.wineImageUrl) ? wine.wineImageUrl : '';

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
      wineImage: wine.wineImage,
      tempImageUrl: wine.tempImageUrl
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

    // const updatedWine = {
    //   wineName: this.state.wineName,
    //   winery: this.state.winery,
    //   wineType: this.state.wineType,
    //   notes: this.state.notes,
    //   varietal: this.state.varietal,
    //   tasteDate: this.state.tasteDate,
    //   tasteLocation: this.state.tasteLocation,
    //   rating: this.state.rating,
    //   alcoholContent: this.state.alcoholContent,
    //   price: this.state.price,
    //   vintage: this.state.vintage,
    //   wineImage: this.state.wineImage
    // };

    const updatedWineData = new FormData();
    updatedWineData.append('wineImage', this.state.wineImage);
    updatedWineData.append('wineName', this.state.wineName);
    updatedWineData.append('winery', this.state.winery);
    updatedWineData.append('wineType', this.state.wineType);
    updatedWineData.append('notes', this.state.notes);
    updatedWineData.append('varietal', this.state.varietal);
    updatedWineData.append('tasteDate', this.state.tasteDate);
    updatedWineData.append('tasteLocation', this.state.tasteLocation);
    updatedWineData.append('rating', this.state.rating);
    updatedWineData.append('alcoholContent', this.state.alcoholContent);
    updatedWineData.append('price', this.state.price);
    updatedWineData.append('vintage', this.state.vintage);

    this.props.editWine(wineId, updatedWineData, this.props.history);

    const newValue = !this.props.showEditForm;
    this.props.onClick(newValue);
  }

  onChange(e) {
    // const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    // this.setState({ [e.target.name]: newValue });
    let newValue;

    if (e.target.type === 'file') {
      this.setState({ tempImageUrl: URL.createObjectURL(e.target.files[0]) })
      newValue = e.target.files[0];
    } else if (e.target.type === 'checkbox') {
      newValue = e.target.checked;
    } else {
      newValue = e.target.value;
    }

    this.setState({ [e.target.name]: newValue });
  }

  onDeleteImage() {
    this.setState({
      tempImageUrl: null,
      wineImage: null
    });
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
      { name: 'wineType', image: wine_type_red, value: 'Red', checked: this.state.wineType === 'Red', onChange: this.onChange },
      { name: 'wineType', image: wine_type_white, value: 'White', checked: this.state.wineType === 'White', onChange: this.onChange },
      { name: 'wineType', image: wine_type_rose, value: 'Rosé', checked: this.state.wineType === 'Rosé', onChange: this.onChange },
      { name: 'wineType', image: wine_type_sparkling, value: 'Sparkling', checked: this.state.wineType === 'Sparkling', onChange: this.onChange },
      { name: 'wineType', image: wine_type_dessert, value: 'Dessert', checked: this.state.wineType === 'Dessert', onChange: this.onChange },
      { name: 'wineType', image: wine_type_port, value: 'Fortified', checked: this.state.wineType === 'Fortified', onChange: this.onChange }
    ];

    const uploadInput = (
      <div className="form-row">
        <input
          type="file"
          name="wineImage"
          id="wineImage"
          onChange={this.onChange}
          className="upload-image"
        />
        <label for="wineImage" className="upload-image-label">Upload an image</label>
      </div >
    );

    const displayImage = (
      <div className="form-row" >
        <img src={this.state.tempImageUrl} alt="" />
        <a onClick={this.onDeleteImage}>
          <i className="fas fa-times" />
        </a>
      </div>
    );

    return (
      <div>
        <h1 className="wine-form-heading">Edit Wine Entry</h1>
        <form className="wine-form" onSubmit={this.onSubmit} onReset={this.onReset} encType="multipart/form-data">
          <div className="upload-container">
            {this.state.tempImageUrl ? displayImage : uploadInput}
          </div>

          <div className="normal-form-container">
            <TextInput
              name="wineName"
              labelText="Wine Name"
              placeholder="Ex: Picnic Blush"
              value={this.state.wineName}
              onChange={this.onChange}
              error={errors.wineName}
              divClass="wine-form-row"
            />

            <TextInput
              name="winery"
              labelText="Winery"
              placeholder="Ex: Mallow Run"
              value={this.state.winery}
              onChange={this.onChange}
              error={errors.winery}
              divClass="wine-form-row"
            />

            <RadioButtons
              mainLabel="Wine Type"
              options={radioOptions}
              error={errors.wineType}
              divClass="wine-form-row"
            />

            <TextArea
              name="notes"
              labelText="Notes"
              placeholder="Ex: Refreshing, easy drinking"
              onChange={this.onChange}
              value={this.state.notes}
              divClass="wine-form-row"
            />

            <TextInput
              name="varietal"
              labelText="Varietal"
              placeholder="Ex: Catawba, Merlot, Riesling"
              value={this.state.varietal}
              onChange={this.onChange}
              error={errors.varietal}
              divClass="wine-form-row"
            />

            <TextInput
              name="tasteDate"
              labelText="Tasted On"
              type="date"
              placeholder="mm/dd/yyyy"
              value={this.state.tasteDate}
              onChange={this.onChange}
              error={errors.tasteDate}
              divClass="wine-form-row"
            />

            <TextInput
              name="tasteLocation"
              labelText="Location Tasted At"
              placeholder="Location"
              value={this.state.tasteLocation}
              onChange={this.onChange}
              error={errors.tasteLocation}
              divClass="wine-form-row"
            />

            <TextInput
              name="rating"
              labelText="Rating"
              type="number"
              placeholder="Out of 5"
              value={this.state.rating}
              onChange={this.onChange}
              error={errors.rating}
              divClass="wine-form-row"
            />

            <TextInput
              name="alcoholContent"
              labelText="Alcohol Content"
              type="number"
              placeholder="Alcohol Content"
              value={this.state.alcoholContent}
              onChange={this.onChange}
              error={errors.alcoholContent}
              divClass="wine-form-row"
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
              divClass="wine-form-row"
            />

            <TextInput
              name="vintage"
              labelText="Vintage"
              type="number"
              placeholder="Vintage"
              value={this.state.vintage}
              onChange={this.onChange}
              error={errors.vintage}
              divClass="wine-form-row"
            />


            <input type="submit" value="Save" className="button btn-primary" />
            <input type="reset" value="Cancel" className="button" />

          </div>
        </form>
      </div>
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