import React, { Component } from "react";

class Education extends Component {
  render() {
    if (this.props.length === 0) {
      return (
        <form onSubmit={this.props.submitting}>
          <div className="inputDiv">
            <label htmlFor="schoolName">Name of School</label>
            <input
              type="text"
              name="schoolName"
              id="schoolName"
              value={this.props.current.schoolName}
              onChange={this.props.changing}
              required
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="titleOfStudy">Title of Study</label>
            <input
              type="text"
              name="titleOfStudy"
              id="titleOfStudy"
              value={this.props.current.titleOfStudy}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="dateOfGraduation">Date of graduation</label>
            <input
              type="text"
              name="dateOfGraduation"
              id="dateOfGraduation"
              value={this.props.current.dateOfGraduation}
              onChange={this.props.changing}
            ></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      );
    } else if (this.props.length > 0 && this.props.editActive) {
      return (
        <form onSubmit={this.props.submitting}>
          <div className="inputDiv">
            <label htmlFor="schoolName">Name of School</label>
            <input
              type="text"
              name="schoolName"
              id="schoolName"
              value={this.props.current.schoolName}
              onChange={this.props.changing}
              required
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="titleOfStudy">Title of Study</label>
            <input
              type="text"
              name="titleOfStudy"
              id="titleOfStudy"
              value={this.props.current.titleOfStudy}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="dateOfGraduation">Date of graduation</label>
            <input
              type="text"
              name="dateOfGraduation"
              id="dateOfGraduation"
              value={this.props.current.dateOfGraduation}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="buttonDiv">
            <button onClick={this.props.nextEdit}>Edit next</button>
            <button onClick={this.props.prevEdit}>Edit prev</button>
            <button onClick={this.props.saveEdit}>Save Edit</button>
          </div>
        </form>
      );
    }
    return (
      <form onSubmit={this.props.submitting}>
        <div className="inputDiv">
          <label htmlFor="schoolName">Name of School</label>
          <input
            type="text"
            name="schoolName"
            id="schoolName"
            value={this.props.current.schoolName}
            onChange={this.props.changing}
            required
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="titleOfStudy">Title of Study</label>
          <input
            type="text"
            name="titleOfStudy"
            id="titleOfStudy"
            value={this.props.current.titleOfStudy}
            onChange={this.props.changing}
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="dateOfGraduation">Date of graduation</label>
          <input
            type="text"
            name="dateOfGraduation"
            id="dateOfGraduation"
            value={this.props.current.dateOfGraduation}
            onChange={this.props.changing}
          ></input>
        </div>
        <div className="buttonDiv">
          <button type="submit">Add another</button>
          <button onClick={this.props.editing}>Edit existing</button>
        </div>
      </form>
    );
  }
}

export default Education;
