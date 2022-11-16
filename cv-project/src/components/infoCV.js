import React, { Component } from "react";

class InfoCv extends Component {
  render() {
    return (
      <div className="infoDiv">
        <div className="names">
          <div className="firstName">{this.props.current.firstName.saved}</div>
          <div className="lastName">{this.props.current.lastName.saved}</div>
        </div>
        <div className="contact">
          <div className="email">{this.props.current.email.saved}</div>
          <div className="phone">{this.props.current.phone.saved}</div>
        </div>
      </div>
    );
  }
}

export default InfoCv;
