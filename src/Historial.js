import React, { Component } from "react";
import Swal from "sweetalert2";
import Moment from "react-moment";
import { Button, ButtonToolbar, Col, ListGroup, ListGroupItem, Modal, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import "moment/locale/es";
import DatePicker from "react-date-picker";
let moment = require("moment");
const CONFIG = require("./assets/config/config.json");

export class Historial extends Component {

	constructor(props){
		super(props);
		this.state={
			transactions:[],
			showDetailModal:false,
			currentTransaction:{},
			startDateValue:"",
			endDateValue:"",
			types:["earn","redeem"]
		};

		this.fetchTransactions = this.fetchTransactions.bind(this);
		this.handleTransactionClick = this.handleTransactionClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);

	}

	componentDidMount() {
		this.fetchTransactions();
	}

	//Fetch transactions with filter, type stands for redeem/earn
	fetchTransactions(){
		let url = new URL(CONFIG.BASE_API_USER_URL + CONFIG.TRANSACTIONS_URL);
		let formatted_token = "Bearer " + this.props.token;

		let myHeaders = new Headers();
		myHeaders.append("Content-type", "application/json");
		myHeaders.append("Authorization", formatted_token);

		//Query params
		let startDate = moment(this.state.startDateValue, "YYYY-MM-DD").format();
		let endDate = moment(this.state.endDateValue, "YYYY-MM-DD").format();
		console.log("dates: ",startDate,endDate,"types: ",this.state.types);
		if ( startDate !=="Invalid date" && endDate !== "Invalid date"){
			let params = {startDate, endDate};
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		}

		fetch(url,{
			method: "GET",
			headers: myHeaders
		})
			.then((response) => {
	    	return response.json()
	    })
	    .catch(error => {
	    	Swal({
	    		type:"error",
	    		title:"Hubo un error en el sistema",
	    		text: "Por favor intenta de nuevo"
	    	});
	    }
	    )
	    .then((resource) => {
	    	// code=100: OK.
	    	console.log("response:",resource);
	    	let transactions = resource.data.filter(tran=>{
	    		return this.state.types.includes(tran.type);
	    	});
	    	if ( startDate !=="Invalid date" && endDate !== "Invalid date") Swal({
					  type: 'success',
					  title: "Se han consultado tus transacciones exitosamente",
					  showConfirmButton: false,
					  timer: 1500
					});
	    	this.setState({
	    		transactions
	    	});
	    })
	}

	handleTransactionClick(transaction){
		this.setState({
			showDetailModal:true,
			currentTransaction:transaction
		});
	}
	handleClose(){
		this.setState({
			showDetailModal:false
		});
	}
	handleStartDateChange(startDateValue){
		this.setState({
			startDateValue
		});
	}
	handleEndDateChange(endDateValue){
		this.setState({
			endDateValue
		});
	}

	handleCheckBoxChange(types){
		this.setState({
			types
		});
	}

	showTransactionDetail(){
		let currentTransaction = this.state.currentTransaction;
		let msg = <br/>
		if(!currentTransaction) return ;
		if(currentTransaction.type==="redeem"){
  		msg = (<div>
  			<h3>El <Moment format="D MMM YYYY">{currentTransaction.createdDate}</Moment> redimiste {currentTransaction.points} puntos. </h3>
  			<br/>
  			<br/>
  			<h4>¡Gracias por preferirnos!</h4>
  		</div>);
  	}
  	else if(currentTransaction.type==="earn"){
  		msg = (<div>
  			<h3>El <Moment format="D MMM YYYY">{currentTransaction.createdDate}</Moment> ganaste {currentTransaction.points} puntos. </h3>
  			<h4>Los ganaste tras una compra por un valor de ${currentTransaction.value}.</h4>
  			<br/>
  			<h4>¡Gracias por preferirnos!</h4>
  		</div>);	
  	}

		return (
			<Modal show={this.state.showDetailModal}>
			  <Modal.Header>
          <Modal.Title>Detalle de transaccion {currentTransaction.num} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { msg }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="info" onClick={this.handleClose}>Cerrar</Button>
        </Modal.Footer>
			</Modal>
		);
	}

	renderTransactionsList(){
		if(this.state.transactions.length === 0)
			return (<p> No tienes transacciones en Leal</p>)
		else{
			return (<ListGroup>
				{this.state.transactions.map((tran, index)=>{
					tran.num = index+1;
					let typeVerb = "ganados";
					if(tran.type === "redeem") typeVerb = "redimidos";
					return (
						<ListGroupItem key={tran.num} onClick={()=>this.handleTransactionClick(tran)}
						header={<h4><Moment format="D MMM YYYY" withTitle>
														{tran.createdDate}
													</Moment></h4>}>
							
							<b>{tran.points}</b> puntos {typeVerb}
						</ListGroupItem>);
				})}
			</ListGroup>)
		}
	}
	renderFilters(){
		return(
			<Row>
				<Col sm={3} md={3}>
					<h4>Fecha inicial</h4>
					<DatePicker 
						ref="start-datepicker" 
						value={this.state.startDateValue} 
						onChange={this.handleStartDateChange} />	
				</Col>
				<Col sm={3} md={3}>
					<h4>Fecha Final</h4>
					<DatePicker 
						ref="end-datepicker" 
						value={this.state.endDateValue} 
						onChange={this.handleEndDateChange} />
				</Col>
				<Col sm={3} md={3}>
				<h4>Tipo de transacción</h4>
				<ButtonToolbar>
			    <ToggleButtonGroup type="checkbox" 
			    	value={this.state.types}
			    	onChange={this.handleCheckBoxChange}>
			      <ToggleButton value={"redeem"}>Puntos redimidos</ToggleButton>
			      <ToggleButton value={"earn"}>Puntos ganados   </ToggleButton>
			    </ToggleButtonGroup>
				</ButtonToolbar>
				</Col>
				<br/>
				<Button sm={3} md={3}
					bsStyle="primary"
					onClick={this.fetchTransactions}>
					Filtrar
				</Button>
			</Row>
			
		);
	}

	render() {
		return (
			<div>
				<h3>¡Mira y filtra tus transacciones por fecha y tipo!</h3>
				{this.renderFilters()}
				<br/>
				<div>
					{this.renderTransactionsList()}
				</div>
				{this.showTransactionDetail()}
			</div>
		);
	}
}

export default Historial;
