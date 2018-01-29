const rs = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default (emails) =>{
	const invalidEmails = emails
						.split(',')
						.map((email) => email.trim())
						.filter((email) => rs.test(email) === false );
	if(invalidEmails.length > 0)
	{
		return `These emails are invalid ${invalidEmails}`;
	} 
	return null;
}