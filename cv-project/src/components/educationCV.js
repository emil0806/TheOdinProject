import React, { Component } from "react";

class EducationCV extends Component {
  render() {
    return (
      <div className="eduDiv">
        <ul>
          {this.props.roles.map((inst) => {
            return (
              <div className="eduBox" key={inst.id}>
                <div className="studyHeader">
                  Studied {inst.titleOfStudy} at {inst.schoolName}
                </div>
                <div>Year of Graduation: {inst.dateOfGraduation}</div>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default EducationCV;
