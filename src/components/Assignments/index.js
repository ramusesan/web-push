import React from "react";
import "./index.css";
import fileImg from "../../images/icons/file.png";
import resourceImg from "../../images/icons/resource.png";
import reloadIcon from "../../images/reload.png";

import Model from "../model";

class Assignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      data: null,
      showModel: false,
    };
  }

  toggleModel = (t,  el, event) => {
 
   
    this.setState({ showModel: t, data: el });
    if(!t){
      this.setState({ showModel: t, data: null });
    }
  };

  getAssignmentList = () => {
    let url = "https://web-push-server-app.herokuapp.com/assignment/get";
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          console.warn(result);
          this.setState({ assignments: result.data });
        });
      })
      .catch((err) => {
        console.error("Error", err);
      });
  };

  componentDidMount() {
    this.getAssignmentList();
  }

  modelComp = () => {
 
      return <Model toggleModel={this.toggleModel} {...this.state.data} showModel={this.state.showModel}/>;
   
  };
  render() {
    const { assignments, data } = this.state;

    const icons = {
      file: fileImg,
      resourse: resourceImg,
    };

    return (
      <div>
        <div>
          {" "}
          <img
            onClick={this.getAssignmentList}
            className="reload-icon"
            src={reloadIcon}
            alt="reload"
          />
        </div>

        <section className="main-container">

        {this.modelComp()}
          {assignments && assignments.length > 0 ? (
            assignments.map((el, index) => {
              const ico = index % 2 === 0 ? icons.file : icons.resourse;
              return (
                <div
                  className="card"
                  key={index.toString()}
                  onClick={this.toggleModel.bind(this, true, el)}
                >
                  <div id="icon">
                    <div id="img">
                      <img src={ico} alt="icon" />
                    </div>
                  </div>
                  <div id="desc">
                    <label>{el.title}</label>
                    <p>{el.body}</p>
                  </div>

               
                </div>
              );
            })
          ) : (
            <h1> No assignments found </h1>
          )}
        </section>
      </div>
    );
  }
}

export default Assignments;
