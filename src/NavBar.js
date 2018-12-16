import React, { Component } from "react";
import { Button, MenuItem, Modal, Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";
import Swal from "sweetalert2";

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
		this.handleLogOutClick = this.handleLogOutClick.bind(this);
		this.renderLogButton = this.renderLogButton.bind(this);
	}

	/*componentDidMount() {
		this.inputPassword.addEventListener("keyup", function(event) {
		  event.preventDefault();
		  // Enter
		  if (event.keyCode === 13)	this.handleLogin();
		}); 
	}*/

	// Click on nav for login. Show Modal-form
	handleLoginNavClick(){

		this.setState({
			showLoginModal:true
		});
	}
	handleLogOutClick(){
		this.props.setUser( {}, "", false);
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
		let body = JSON.stringify({"email":this.state.inpEmail, "password":this.state.inpPassword});
		let myHeaders = new Headers();
		myHeaders.append("Content-type", "application/json");

		fetch(url,{
			method: "POST",
			headers: myHeaders,
			body: body
		})
			.then((response) => {
	    	return response.json()
	    })
	    .catch(error => 
	    	Swal("Error", "Hubo un error en el sistema: "+error+". Por favor intenta de nuevo.", "error")
	    )
	    .then((resource) => {
	    	// 100: OK. 101: Invalid email/pass. 102: Error in process. 130: Missing field
	    	if(resource.code === 100){
	    		Swal({
					  type: 'success',
					  title: "Bienvenido, " + resource.user.firstName,
					  showConfirmButton: true,
					  timer: 2500
					});
	    		this.props.setUser(resource.user, resource.token, true);
	    		this.setState({showLoginModal:false});
	    	}
	    	else if(resource.code === 101)
	    		Swal("Email no válido", "Tu email y contraseña no coinciden :(", "error");
	    	else
	    		Swal("Error", "Hubo un error en el sistema. Por favor intenta de nuevo.", "error");

	    })
	}

	showLoginModal(){
		return (
			<Modal show={this.state.showLoginModal}>
			  <Modal.Header>
          <Modal.Title>Ingresar a Leal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Ingresa tu correo y contraseña</h3>
          <input type="hidden" name="_token" value="" />
          <div className="form-group">
              <label className="control-label">E-Mail</label>
              <div>
                  <input 
	                  type="email" autoComplete="on"
	                  className="form-control input-lg" 
	                  name="email"
	                  onChange={evt => this.setState({inpEmail:evt.target.value}) }
                  />
              </div>
          </div>
          <div className="form-group">
              <label className="control-label">Contraseña</label>
              <div>
                  <input ref={input => this.inputPassword=input }  type="password" className="form-control input-lg" name="password" onChange={evt=>this.setState({inpPassword:evt.target.value})}
                  />
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleLogin}>Ingresar</Button>
          <Button bsStyle="danger" onClick={this.handleLoginClose}>Cancelar</Button>
        </Modal.Footer>
			</Modal>
		);
	}

	renderLogButton(){
		if(!this.props.logged)
			return <NavItem eventKey={1} onClick={this.handleLoginNavClick}> Ingresar</NavItem>;
		else
			return <NavItem eventKey={1} onClick={this.handleLogOutClick}> Salir</NavItem>;
	}

	render() {
		return (
			<div>
				<Navbar className="NavBar" fixedTop inverse >
				  <Navbar.Header>
				    <Navbar.Brand>
				      <a href="#home">Leal para ti</a>
				    </Navbar.Brand>
				    <Navbar.Toggle />
				  </Navbar.Header>
				  <Navbar.Collapse>
					  <Nav>
					    {this.renderLogButton()}
					    <NavDropdown eventKey={2} title="Sobre Leal" id="basic-nav-dropdown">
					      <MenuItem eventKey={2.1} href="https://www.puntosleal.com/">Puntos Leal</MenuItem>
					      <MenuItem divider />
					      <MenuItem eventKey={2.2} href="https://play.google.com/store/apps/details?id=com.kubo.leal&hl=es_419">Play Store</MenuItem>
					      <MenuItem eventKey={2.2} href="https://itunes.apple.com/co/app/leal/id1083234969?mt=8">App Store</MenuItem>
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