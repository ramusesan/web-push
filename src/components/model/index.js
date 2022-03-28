import React, { Component } from "react";
import "./index.css";
import closeIco from "../../images/cancel.png";

export default class Model extends Component {
  assetViewer = () => {
    if (this.props.assetType == "Image") {
      return (
        <div className="model-img">
          <img src={this.props.assetUrl} alt="asset url" />
        </div>
      );
    }
    if (this.props.assetType == "Video") {

        return (
            <video width="100%" height="500" controls autoPlay >
            <source src={this.props.assetUrl} type="video/mp4"/>
           </video>

        )
    }
  };

  render() {
    console.log(this.props);

    if (!this.props.showModel) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="main-model">
          <div
            className="backdrop"
            onClick={this.props.toggleModel.bind(this, false)}
          ></div>

          <img
            className="close-icon"
            onClick={this.props.toggleModel.bind(this, false)}
            src={closeIco}
            alt="close"
          />

          {this.assetViewer()}
        </div>
      </React.Fragment>
    );
  }
}
