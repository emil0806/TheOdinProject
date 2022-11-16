import React, { Component } from "react";

class ExperienceCV extends Component {
  render() {
    return (
      <ul>
        {this.props.roles.map((role) => {
          return (
            <div className="expDiv" key={role.id}>
              <div className="titleHeader">
                {role.title} at {role.company}
              </div>
              <div className="tasks">Main tasks: {role.tasks}</div>
              <div>
                Employment from {role.start} to {role.end}
              </div>
            </div>
          );
        })}
      </ul>
    );
  }
}

export default ExperienceCV;
