//routing to /auth/google
const passport = require('passport');

module.exports = (app)=>{
	
//google
app.get('/auth/google',passport.authenticate('google',{
	scope: ['profile','email']
})
);
app.get('/auth/google/callback',passport.authenticate('google'),
	(req,resp) => {
		resp.redirect('/surveys');
}
);

app.get('/api/logout',(req,resp)=>{
	req.logout();
	resp.redirect('/');
});
app.get('/api/current_user',(req,resp)=>{
	resp.send(req.user);
	//resp.send(req.session);
});

});