import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails.js';
import formFields from './formFields';

class SurveyForm extends Component {
	
	renderFields(){
		return _.map(formFields, ({label, name}) => {
			return (
				<Field key={name} name={name} label={label} type="text" component={SurveyField} />
				);
		});
	}
	render(){
		const { handleSubmit } = this.props;
		return(
				<div>
					<form onSubmit={handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
					<button className="teal btn-flat right white-text" type="submit">Next
						<i className="material-icons right">done</i>
					</button>
					</form>
				</div>
			);
	}
}
function validate(values){
	const errors ={};
	errors.recipients = validateEmails(values.recipients|| '');
	_.each(formFields, ({ name })=>{
		if(!values[name])
		{
			errors[name] = "Please Enter the value";
		}
	});

	return errors;
}
export default reduxForm({
	validate,
	form:'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);