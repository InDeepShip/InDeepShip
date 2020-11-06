import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import '../styles/main.scss';

const fixImageRotation = require('fix-image-rotation').fixRotation;

class DropZoneField extends Component {
  onDrop = async (acceptedFiles, rejectedFiles) => {
    const { onChange } = this.props.input;
    const files = [];

    acceptedFiles = await fixImageRotation(acceptedFiles);
    rejectedFiles = await fixImageRotation(rejectedFiles);

    acceptedFiles.map(
      file => files.push(
        {
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
          progress: file.progress,
          type: file.type,
          lastModified: file.lastModified,
          lastModifiedDate: file.lastModifiedDate,
        },
      ),
    );
    rejectedFiles.map(
      file => files.push({
        preview: file.preview,
        name: file.name,
        size: file.size,
        progress: file.progress,
        type: 'rejected',
      }),
    );
    // console.log(files);
    onChange(files);
    this.forceUpdate();
  }

  render() {
    const files = this.props.input.value;
    return (
      <div className="image shadowed has-image-centered" style={{ height: 256, width: 256, background: 'white' }}>
        <ReactDropzone
          accept="image/jpeg, image/png, image/jpg"
          className="upload-container"
          onDrop={this.onDrop}
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div className="dropzone-box" {...getRootProps()}>
              <input {...getInputProps()} />
              {files && files.length > 0 ? (
                <div><img className="is-rounded" src={files[0].preview} alt={files[0].name} /></div>
              ) : (
                  <div className="placeholder-preview">
                    <span className="fa fa-upload fa-5x" />
                    <br />
                    <p>Drop or select an image.</p>
                  </div>
                )}
            </div>
          )}
        </ReactDropzone>
      </div>
    );
  }
}

export default DropZoneField;
