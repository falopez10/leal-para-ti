import React, { Component } from "react";
import { Button, MenuItem, Modal, Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";

const CONFIG = require("./assets/config/config.json");

export class NavBar extends Component {
	//Add conditional: There's one navbar for logged, and other for not logged

	constructor(props){
		super(props);
		this.state={
			showLoginModal:false,
			inpEmail:"",
			inpPassword:""
		}


		this.handleLoginNavClick = this.handleLoginNavClick.bind(this);
		this.handleLoginClose = this.handleLoginClose.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	// Click on nav for login. Show Modal-form
	handleLoginNavClick(){

		this.setState({
			showLoginModal:true
		});
	}

	//Close Login Modal.
	handleLoginClose(){
		this.setState({
			showLoginModal:false
		});
	}

	//Actually makes the request.
	handleLogin(user, password){
		const url = CONFIG.BASE_API_USER_URL + CONFIG.LOGIN_URL;
		console.log("doing request to " + url );
		// let body = JSON.stringify({"email":this.state.inpEmail, "password":this.state.inpPassword});
		let body = '{"email":"carltronik@gmail.com", "password":"123"}';
		console.log("body:",body);

		fetch(url,{
			method: "POST",
			body: body
		})
			.then((response) => {
	    	return response.json()
	    })
	    .catch(error => 
	    	console.error('Error:', error)
	    )
	    .then((resource) => {
	    	alert("Code: " + resource.code);
	    	this.setState({showLoginModal:false});
	    })
	}

	showLoginModal(){
		return (
			<Modal show={this.state.showLoginModal}>
			  <Modal.Header closeButton>
          <Modal.Title>Ingresar a Leal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Ingresa tu correo y contraseña</h3>
          <input type="hidden" name="_token" value="" />
          <div className="form-group">
              <label className="control-label">E-Mail Address</label>
              <div>
                  <input 
	                  type="email" 
	                  className="form-control input-lg" 
	                  name="email"
	                  onChange={evt => this.setState({inpEmail:evt.target.value}) }
                  />
              </div>
          </div>
          <div className="form-group">
              <label className="control-label">Password</label>
              <div>
                  <input  type="password" className="form-control input-lg" name="password" onChange={evt=>this.setState({inpPassword:evt.target.value})}/>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={()=>(this.handleLogin())}>Ingresar</Button>
          <Button bsStyle="secondary" onClick={this.handleLoginClose}>Close</Button>
        </Modal.Footer>
			</Modal>
		);
	}

	render() {
		return (
			<div>
				<Navbar collapseOnSelect>
				  <Navbar.Header>
				    <Navbar.Brand>
				      <a href="#home">Leal para ti</a>
				    </Navbar.Brand>
				    <Navbar.Toggle />
				  </Navbar.Header>
				  <Navbar.Collapse>
					  <Nav>
					    <NavItem eventKey={1} onClick={this.handleLoginNavClick}>
					      Ingresa
					    </NavItem>
					    <NavDropdown eventKey={2} title="Sobre Leal" id="basic-nav-dropdown">
					      <MenuItem eventKey={2.1}>Action</MenuItem>
					      <MenuItem eventKey={2.2}>Another action</MenuItem>
					      <MenuItem divider />
					      <MenuItem eventKey={2.4}>Separated link</MenuItem>
					    </NavDropdown>
					  </Nav>
				  </Navbar.Collapse>
				</Navbar>

				{/*Show modal to process login request*/}
				{this.showLoginModal()}
			</div>
		);
	}
}

export default NavBar;