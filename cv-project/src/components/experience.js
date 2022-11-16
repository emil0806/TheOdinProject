import React, { Component } from "react";

class Experience extends Component {
  render() {
    if (this.props.length === 0) {
      return (
        <form onSubmit={this.props.submitting}>
          <div className="inputDiv">
            <label htmlFor="title">Position</label>
            <input
              type="text"
              name="title"
              id="title"
              value={this.props.current.title}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              value={this.props.current.company}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="tasks">Main tasks</label>
            <input
              type="text"
              name="tasks"
              id="tasks"
              value={this.props.current.tasks}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="start">Start</label>
            <input
              type="text"
              name="start"
              id="start"
              value={this.props.current.start}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="end">End</label>
            <input
              type="text"
              name="end"
              id="end"
              value={this.props.current.end}
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
            <label htmlFor="title">Position</label>
            <input
              type="text"
              name="title"
              id="title"
              value={this.props.current.title}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              value={this.props.current.company}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="tasks">Main tasks</label>
            <input
              type="text"
              name="tasks"
              id="tasks"
              value={this.props.current.tasks}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="start">Start</label>
            <input
              type="text"
              name="start"
              id="start"
              value={this.props.current.start}
              onChange={this.props.changing}
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="end">End</label>
            <input
              type="text"
              name="end"
              id="end"
              value={this.props.current.end}
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
          <label htmlFor="title">Position</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.props.current.title}
            onChange={this.props.changing}
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            id="company"
            value={this.props.current.company}
            onChange={this.props.changing}
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="tasks">Main tasks</label>
          <input
            type="text"
            name="tasks"
            id="tasks"
            value={this.props.current.tasks}
            onChange={this.props.changing}
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="start">Start</label>
          <input
            type="text"
            name="start"
            id="start"
            value={this.props.current.start}
            onChange={this.props.changing}
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="end">End</label>
          <input
            type="text"
            name="end"
            id="end"
            value={this.props.current.end}
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

export default Experience;
