const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin.js');
const requireCredits = require('../middlewares/requireCredits.js');
const Survey = mongoose.model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) =>{
	app.get('/api/surveys', requireLogin, async (req,resp) => {
		const surveys = await Survey.find({ _user: req.user.id}).select({
			recipients: false
		});

		resp.send(surveys);
	});


	app.get('/api/surveys/:surveyId/:choice', (req, resp)=>{
			resp.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks',(req, resp) => {
		const p  = new Path('/api/surveys/:surveyId/:choice');

		 _.chain(req.body)
							.map(({email, url})=>{
								
								const match = p.test(new URL(url).pathname);
								if(match)
								{
									return { email, surveyId: match.surveyId, choice:match.choice }
								}
								})
							.compact()
							.uniqBy('email', 'surveyId')
							.each(({surveyId, email, choice}) => {
								Survey.updateOne({
									_id: surveyId,
									recipients: {
										$elemMatch: { email, responded:false}
									}
								},
								{
									$inc: { [choice]: 1 },
									$set: { 'recipients.$.responded': true},
									lastResponded: new Date()
								}).exec();
							})
							.value();
			resp.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req,resp)=>{
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() }) ),
			_user: req.user.id,
			dateSent: Date.now() 
		});
		//Send Email
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try{
			await mailer.send();
			await survey.save();
			req.user.credits-=1;
			const user = await req.user.save();

			resp.send(user);
		}
		catch (err) {
			resp.status(422).send(err);
		}
	});
};
//