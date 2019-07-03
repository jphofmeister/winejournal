import React, { Component } from 'react';
const preset = require('../../config/cloudinary-upload-preset');

let cloudName = preset.cloud_name;
let uploadPreset = preset.upload_preset;

class FileUploader extends Component {
  constructor(props) {
    super(props);

    this.uploadWidget = this.uploadWidget.bind(this);
  }

  uploadWidget(e) {
    e.preventDefault();

    window.cloudinary.openUploadWidget({
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      multiple: false,
      cropping: true,
      croppingAspectRatio: 1,
      singleUploadAutoClose: false
    }, (error, result) => { this.props.onUploadImage(result) });
  }

  render() {

    return (
      <div className="form-row">
        <button onClick={this.uploadWidget} className="upload-image-label">Upload an image</button>
      </div>
    )
  }
}

export default FileUploader;