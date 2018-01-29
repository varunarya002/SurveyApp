module.exports = (req, resp, next) => {
	if(req.user.credits < 1){
		resp.status(403).send({error: "Not enough credits!"});
	}

	next();
}