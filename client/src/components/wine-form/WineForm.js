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
      //selectedImage: null,
      wineImage: null,
      wineImageName: null,
      imageUrl: null,
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

  onChange(e) {
    // const newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    let newValue;

    if (e.target.type === 'file') {
      // newValue = URL.createObjectURL(e.target.files[0]);
      this.setState({ imageUrl: URL.createObjectURL(e.target.files[0]) })
      newValue = e.target.files[0];
      //newValue = data;
    } else if (e.target.type === 'checkbox') {
      newValue = e.target.checked;
    } else {
      newValue = e.target.value;
    }

    this.setState({ [e.target.name]: newValue });
  }

  onSubmit(e) {
    e.preventDefault();

    // const wineImage = this.state.wineImage;

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

    console.log(wineData);

    // const newWine = {
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

    this.props.addWine(wineData, this.props.history);
  }

  // onFileUpload(e) {
  //   this.setState({ wineImage: e.target.files[0] })
  // }

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

    return (
      <form onSubmit={this.onSubmit} onReset={this.onReset} encType="multipart/form-data">
        <div className="form-container">
          <input
            type="file"
            name="wineImage"
            onChange={this.onChange}
          />
          <img src={this.state.imageUrl} />

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