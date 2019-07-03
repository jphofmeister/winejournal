import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import { addWine } from '../../actions/wineActions';
import RadioButtons from '../common/RadioButtons';
import FileUploader from '../common/FileUploader';
import MoreWineOptions from './MoreWineOptions';

import wine_type_red from '../../images/wine_type_red.png';
import wine_type_white from '../../images/wine_type_white.png';
import wine_type_rose from '../../images/wine_type_rose.png';
import wine_type_sparkling from '../../images/wine_type_sparkling.png';
import wine_type_dessert from '../../images/wine_type_dessert.png';
import wine_type_port from '../../images/wine_type_port.png';

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
      wineImage: null,
      areOptionsHidden: true,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.onUploadImage = this.onUploadImage.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    let newValue;

    if (e.target.type === 'checkbox') {
      newValue = e.target.checked;
    } else {
      newValue = e.target.value;
    }

    this.setState({ [e.target.name]: newValue });
  }

  onSubmit(e) {
    e.preventDefault();

    const wineData = {
      wineImage: this.state.wineImage,
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
    }

    this.props.addWine(wineData, this.props.history);
  }

  onUploadImage(resultEvent) {
    if (resultEvent.event === 'success') {
      this.setState({
        wineImage: resultEvent.info.secure_url
      });
    }
  }

  onDeleteImage() {
    this.setState({
      tempImageUrl: null,
      wineImage: null
    });
  }

  onReset(e) {
    e.preventDefault();

    this.setState({
      isFormHidden: true,
      areOptionsHidden: true
    });

    this.props.history.push('/dashboard');
  }

  toggleOptions(e) {
    e.preventDefault();
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
      vintage: this.state.vintage
    }

    const radioOptions = [
      { name: 'wineType', image: wine_type_red, value: 'Red', checked: this.state.wineType === 'Red', onChange: this.onChange },
      { name: 'wineType', image: wine_type_white, value: 'White', checked: this.state.wineType === 'White', onChange: this.onChange },
      { name: 'wineType', image: wine_type_rose, value: 'Rosé', checked: this.state.wineType === 'Rosé', onChange: this.onChange },
      { name: 'wineType', image: wine_type_sparkling, value: 'Sparkling', checked: this.state.wineType === 'Sparkling', onChange: this.onChange },
      { name: 'wineType', image: wine_type_dessert, value: 'Dessert', checked: this.state.wineType === 'Dessert', onChange: this.onChange },
      { name: 'wineType', image: wine_type_port, value: 'Fortified', checked: this.state.wineType === 'Fortified', onChange: this.onChange }
    ];

    const uploadInput = (
      <FileUploader onUploadImage={this.onUploadImage} />
    );

    const displayImage = (
      <div className="uploaded-image-container" >
        <img src={this.state.wineImage} alt="" />
        <a onClick={this.onDeleteImage}>
          <i className="fas fa-times" /> Delete and Upload New Image
        </a>
      </div>
    );

    return (
      <div>
        <h1 className="wine-form-heading">Create a Wine Entry</h1>
        <form className="wine-form" onSubmit={this.onSubmit} onReset={this.onReset} encType="multipart/form-data">

          <div className="upload-container">
            {this.state.wineImage ? displayImage : uploadInput}
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

            <button
              className="expand-link"
              onClick={this.toggleOptions}>
              More Options
            </button>

            {!this.state.areOptionsHidden &&
              <MoreWineOptions moreWineOptions={moreWineOptions} onChange={this.onChange} />
            }


            <input type="submit" value="Submit" className="button btn-primary" />
            <input type="reset" value="Cancel" className="button" />
          </div>
        </form>
      </div>
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