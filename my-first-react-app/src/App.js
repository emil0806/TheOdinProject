/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import MyComponent from "./myComponent";

class App extends Component {
  constructor(props) {
    super(props);

    this.onClickBtn = this.onClickBtn.bind(this);

    this.state = { count: 0 };

    this.countUp = this.countUp.bind(this);
  }

  onClickBtn() {
    console.log("Button was clicked");
  }

  countUp() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <div>
          <MyComponent title="React" onButtonClicked={this.onClickBtn} />
        </div>
        <div>
          <button onClick={this.countUp}>Click me!</button>
          <p>{count}</p>
        </div>
      </div>
    );
  }
}

export default App;
