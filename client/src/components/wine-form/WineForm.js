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
      wineImage: null,
      tempImageUrl: null,
      areOptionsHidden: true,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
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

  onSubmit(e) {
    e.preventDefault();

    const wineData = new FormData();
    wineData.append('wineImage', this.state.wineImage);
    wineData.append('wineName', this.state.wineName);
    wineData.append('winery', this.state.winery);
    wineData.append('wineType', this.state.wineType);
    wineData.append('notes', this.state.notes);
    wineData.append('varietal', this.state.varietal);
    wineData.append('tasteDate', this.state.tasteDate);
    wineData.append('tasteLocation', this.state.tasteLocation);
    wineData.append('rating', this.state.rating);
    wineData.append('alcoholContent', this.state.alcoholContent);
    wineData.append('price', this.state.price);
    wineData.append('vintage', this.state.vintage);

    this.props.addWine(wineData, this.props.history);
  }

  onDeleteImage() {
    this.setState({
      tempImageUrl: null,
      wineImage: null
    });
    //document.getElementById("wineImage").value = "";
  }

  onReset() {
    this.setState({
      isFormHidden: true,
      areOptionsHidden: true
    });
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
      { name: 'wineType', value: 'Red', checked: this.state.wineType === 'Red', onChange: this.onChange },
      { name: 'wineType', value: 'White', checked: this.state.wineType === 'White', onChange: this.onChange },
      { name: 'wineType', value: 'Sparkling', checked: this.state.wineType === 'Sparkling', onChange: this.onChange },
      { name: 'wineType', value: 'Rosé', checked: this.state.wineType === 'Rosé', onChange: this.onChange },
      { name: 'wineType', value: 'Dessert', checked: this.state.wineType === 'Dessert', onChange: this.onChange },
      { name: 'wineType', value: 'Fortified', checked: this.state.wineType === 'Fortified', onChange: this.onChange }
    ];

    const uploadInput = (
      <div className="form-row" >
        <input
          type="file"
          name="wineImage"
          id="wineImage"
          onChange={this.onChange}
        />
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
      <form className="wine-form" onSubmit={this.onSubmit} onReset={this.onReset} encType="multipart/form-data">
        <div className="wine-form-container">

          {this.state.tempImageUrl ? displayImage : uploadInput}

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

          {/* <a href="#"
            className="expand-link"
            onClick={this.toggleOptions}>
            More Options
          </a> */}

          <button
            className="expand-link"
            onClick={this.toggleOptions}>
            More Options
          </button>

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