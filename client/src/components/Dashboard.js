import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
const Dashboard = () =>{
	return (
			<div>
				<SurveyList />
				<div className="fixed-action-btn">
				<Link to="/surveys/new" className="btn-floating btn-large red">
				<i className="large material-icons">add</i>
    			</Link>
    			</div>
			</div>
		);
};
export default Dashboard;
//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
//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