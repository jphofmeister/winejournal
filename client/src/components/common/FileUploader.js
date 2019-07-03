import React, { Component } from 'react';
const preset = require('../../config/cloudinary-upload-preset');

let cloudName = preset.cloud_name;
let uploadPreset = preset.upload_preset;

class FileUploader extends Component {
  constructor(props) {
    super(props);

    this.checkUploadResult = this.checkUploadResult.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  checkUploadResult(resultEvent) {
    if (resultEvent.event === 'success') {
      this.props.onUploadImage(resultEvent.info.secure_url.toString());
    } else {
      console.log('failure');
    }
  }

  uploadWidget(e) {
    e.preventDefault();

    window.cloudinary.openUploadWidget({
      cloudName: cloudName,
      uploadPreset: uploadPreset
    }, (error, result) => { this.checkUploadResult(result) });
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