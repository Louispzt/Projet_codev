import React, { Component } from "react";
import Map from "./modules/Map";
import LineChartWeek from "./modules/LineChartWeek";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };

    this.setState({ apiResponse: this.callAPI() });
  }

  callAPI() {
    fetch("http://localhost:9000")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">{this.state.apiResponse}</p>
        <div className="MapDiv">
          <Map />
        </div>

        <div className="ChartDiv">
          <LineChartWeek />
        </div>
      </div>
    );
  }
}

export default App;
