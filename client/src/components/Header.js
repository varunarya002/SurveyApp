import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
class Header extends React.Component {
	renderContent(){
		switch(this.props.auth){
			case null:
				return
			case false:
				return(
					<div id="h-content">
					<a href="/auth/google">Sign in with Google</a>
					</div>
					);
			default:
				return [
						<li key="1"><Payments /></li>,
						<a key="3" class="btn disabled">Credits: {this.props.auth.credits}</a>,
					<li id="h-content" key="2">	
					<a href="/api/logout">Logout</a>
					</li>
					];
		}
	}
	render(){
		console.log(this.props);
		return(
			<header className='header'>

					<div id="home"><Link to={this.props.auth ? '/surveys':'/'}>Emaily</Link></div>
					{this.renderContent()}
			</header>
			);
	}
}
function mapStatetoProps({auth}){
	return {auth};
}
export default connect(mapStatetoProps)(Header);