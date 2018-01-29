import React,{ Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
class Payments extends Component{
	render(){
		
		
		return(
				<div>
				<StripeCheckout 
				 name="Emaily"
				 description="Pay $5 for 5 Credits"
				 amount={500}
				 token={token => this.props.handleToken(token)}
				 stripeKey={process.env.REACT_APP_STRIPE_KEY}
				>
					<button className="btn">Add Credits </button>
				</StripeCheckout>
				</div>
			);
	}
}
export default connect(null, actions)(Payments);
