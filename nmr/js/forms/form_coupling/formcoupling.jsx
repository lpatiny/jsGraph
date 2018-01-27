import React from "react";
import FormCouplingElement from './formcouplingelement.jsx'

class FormCoupling extends React.Component {
	
	constructor() {

		super();
		this.state = {
			delta: 0,
			j: [ {} ]
		};

		this.addCoupling = this.addCoupling.bind( this );
		this.removeCoupling = this.removeCoupling.bind( this );
		this.subFormChanged = this.subFormChanged.bind( this );
		this.handleInputChange = this.handleInputChange.bind( this );
	}


	handleInputChange(event) {
	    const target = event.target;
	    let value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    if( target.type == 'number' ) {
	    	value = parseFloat( value );
	    }

	    this.setState({
	      [name]: value
	    });
	}

	subFormChanged( event, index ) {
		const target = event.target;
	    let value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;


	    if( target.type == 'number' ) {
	    	value = parseFloat( value );
	    }

	    this.state.j[ index ][ name ] = value;
	    this.setState({
	      couplings: this.state.j
	    });
	}

	addCoupling( index ) {
		this.state.j.splice( index + 1, 0, {
			constant: '',
			multiplicity: 'd' // Doublet by default
		} );
		this.setState( { j: this.state.j } );
	}

	removeCoupling( index ) {
		this.state.j.splice( index, 1 );
		this.setState( { j: this.state.j } );
	}

	componentDidMount() {
		this.extendState();
	}

	componentWillReceiveProps( nextProps ) {
		this.extendState( nextProps );
	}

	componentDidUpdate() {

		if( Array.isArray( this.state.j ) && this.state.j.length == 0 ) {
			this.setState( { j: [ { multiplicity: null, constant: null } ] })
		}
	}

	extendState( props = this.props ) {
		
		this.setState( props.formData );
	}

	render() {
		let couplings = this.state.j;

		if( ! couplings ) {
			couplings = [];
		}
		return ( 

			<form>	

				<div className="row">
					<div className="col-sm-4">Delta</div>
					<div className="col-sm-4">
						<div className="input-group">
							<input type="number" className="form-control" onChange={ this.handleInputChange } name="delta" value={ this.state.delta } />
							<span className="input-addon">ppm</span>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12">Coupling</div>
					<div className="col-sm-12">

						<table>	
							<thead>	
								<tr>
									<th>
										Multiplicity
									</th>
									<th>
										Constant (Hz)
									</th>
									<th>
										
									</th>
								</tr>
							</thead>
							<tbody>
							{
								couplings.map( ( coupling, index ) => {

									return ( <FormCouplingElement 
										key = {index}
										addLine={ () => { this.addCoupling( index ) } } 
										removeLine={ () => { this.removeCoupling( index ) } } 
										onChange={ ( event ) => this.subFormChanged( event, index ) } 
										multiplicity={ coupling.multiplicity } 
										coupling={ coupling.coupling } 
									/> )
								} )
							}
							</tbody>
						</table>
					</div>
				</div>

				<div className="col-sm-12">
					<button type="button" className="btn btn-default" onClick={ () => this.props.onValidate( this.state ) }>Ok</button>
					<button type="button" className="btn btn-default" onClick={ () => this.props.onCancel( this.state ) }>Cancel</button>
					<button type="button" className="btn btn-default" onClick={ () => this.props.onSplit( this.state ) }>New signal</button>
				</div>
			</form> 
		);
	}
}

export default FormCoupling;