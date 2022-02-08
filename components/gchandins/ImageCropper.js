import React, { PureComponent, createRef } from "react";
import ReactCrop from "react-image-crop";
import {Button} from 'rbx/elements/button';
import "react-image-crop/dist/ReactCrop.css";

const styles = {
  container: {
    display: 'flex',
    background: '#4a4a4a',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    borderRadius: 0,
    width: '100%'
  }
}

export default class ImageCropper extends PureComponent {
  state = {
    src: null,
    crop: {
      x: 0,
      y: 0
    },
    items: []
  };

  fileInput = createRef();

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
    this.setState({
      crop: {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height
      }
    }, () => {
      this.makeClientCrop(this.state.crop);
    });
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const {blob, url: croppedImageUrl} = await this.getCroppedImg(
        this.imageRef,
        crop,
        "handinraw.jpeg"
      );
      this.setState({ blob, croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve({blob, url: this.fileUrl});
      }, "image/jpeg");
    });
  }

  openFileInput = () => {
    this.fileInput.current && this.fileInput.current.click();
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div style={styles.container}>
        <div style={{width: '100%'}}>
          <Button style={styles.button} onClick={this.openFileInput}>
            Select image
          </Button>
          {croppedImageUrl ? (
            <Button style={{...styles.button, marginBottom: 10}} onClick={() => this.props.submit && this.props.submit(this.state.blob)}>
              Submit
            </Button>
          ) : null}
          <input ref={this.fileInput} style={{display: 'none'}} type="file" onChange={this.onSelectFile} />
        </div>
        <div style={styles.image}>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              imageStyle={{width: '100%', height: 'auto'}}
              keepSelection={true}
            />
          )}
        </div>
        <div style={styles.preview}>
          {croppedImageUrl && (
            <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
          )}
        </div>
      </div>
    );
  }
}
