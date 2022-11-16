import React, { Component } from "react";

class Info extends Component {
  render() {
    if (this.props.current.completed === true) {
      return <button onClick={this.props.editing}>Edit</button>;
    } else if (this.props.editActive) {
      return (
        <form onSubmit={this.props.submitting}>
          <div className="inputDiv">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={this.props.current.firstName.temp}
              onChange={this.props.changing}
              required
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={this.props.current.lastName.temp}
              onChange={this.props.changing}
              required
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={this.props.current.email.temp}
              onChange={this.props.changing}
              required
            ></input>
          </div>
          <div className="inputDiv">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={this.props.current.phone.temp}
              onChange={this.props.changing}
              required
            ></input>
          </div>
          <button type="submit">Save Edit</button>
        </form>
      );
    }

    return (
      <form onSubmit={this.props.submitting}>
        <div className="inputDiv">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={this.props.current.firstName.temp}
            onChange={this.props.changing}
            required
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={this.props.current.lastName.temp}
            onChange={this.props.changing}
            required
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={this.props.current.email.temp}
            onChange={this.props.changing}
            required
          ></input>
        </div>
        <div className="inputDiv">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={this.props.current.phone.temp}
            onChange={this.props.changing}
            required
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Info;
