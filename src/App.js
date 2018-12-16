import React, { Component } from "react";
import "./App.css";
import NavBar from "./NavBar.js";
import Historial from "./Historial.js";

class App extends Component {

  constructor(props){
    super(props);

    this.state={
      logged:false,
      token:"",
      user:{}
    }

    this.renderMainComp = this.renderMainComp.bind(this);
    this.renderLoggedComp = this.renderLoggedComp.bind(this);
    this.renderNotLoggedComp = this.renderNotLoggedComp.bind(this);
  }

  setUser(user, token, logged){
    this.setState({
      user,
      token,
      logged
    });
  }

  renderLoggedComp(){
    let user = this.state.user;
      return (<div>
        <div className="App-header">
        <h1> </h1>
          <h1>Leal para ti</h1>
          <h2> Bienvenido, {user.firstName} {user.lastName} </h2>
        </div>
        <Historial className="App-body" token={this.state.token} user={user}/>
      </div>);
  }

  renderNotLoggedComp(){
      return <div>
        <div className="App-header">
          <h1> </h1>
          <h1>Leal para ti</h1>
          <h2 >Bienvenido a Leal</h2>
        </div>
        <div className="App-body">
        <br/>
          <h4>Ingresa para observar el historial de tus transacciones en la plataforma</h4>
        </div>
      </div>;
  }

  renderMainComp(){
    if(this.state.logged)
      return this.renderLoggedComp();
    else
      return this.renderNotLoggedComp();
  }

  render() {
    let main = this.renderMainComp();

    return (
      <div className="App">
        <NavBar 
          logged={this.state.logged}
          setUser={this.setUser.bind(this)}
        />
        <div>{main}</div>
      </div>
    );
  }
}

export default App;
