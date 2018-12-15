import React, { Component } from "react";
import "./App.css";
import NavBar from "./NavBar.js";

class App extends Component {

  constructor(props){
    super(props);

    this.state={
      logged:false
    }

    this.renderMainComp = this.renderMainComp.bind(this);
  }

  renderMainComp(){
    if(this.state.logged)
      return <h2>Logged</h2>;
    else
      return <h2>Not Logged</h2>;
  }

  render() {
    let main = this.renderMainComp();
    return (
      <div className="App">
        <NavBar/>
        <h1>Leal para ti</h1>
        <div>{main}</div>
      </div>
    );
  }
}

export default App;
