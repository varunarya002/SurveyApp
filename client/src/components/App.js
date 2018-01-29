import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header.js';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew.js';



 class App extends React.Component {
 	componentDidMount(){
 		this.props.fetchUser();
 	}
	render(){
		return(
			<div className='app container'>
			<BrowserRouter>
			<div>
				<Header />
				<Route exact={true} path='/' component={Landing} />
				<Route exact path='/surveys' component={Dashboard} />
				<Route path='/surveys/new' component={SurveyNew} />
			</div>
			</BrowserRouter>
			</div>
			);
	}
}
export default connect(null, actions)(App);