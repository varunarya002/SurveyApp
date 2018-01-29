if(process.env.NODE_ENV === 'production'){
	//go to pord keys
	module.exports = require('./prod.js');
}
else{
	//go to dev keys
	module.exports = require('./dev.js');
}