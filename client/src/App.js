import React, { Component } from "react";
import Map from "./modules/Map";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };

    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.state.apiResponse}</p>
        <Map />
      </div>
    );
  }
}

export default App;
