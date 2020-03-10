require('dotenv').config();
const mailer = require('nodemailer');
const tokenSign = require('./tokenSign');

module.exports = async user => {
	const transport = mailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD
		}
	});

	const info = await transport.sendMail({
		from: process.env.EMAIL,
		to: 'ozov1@ukr.net',
		subject: 'confirm password change',
		html: buildTemplate(user)
	});
	return info.response;
};

function buildTemplate(user) {
	let token = tokenSign.password({ user });
	return `<h1> Password change </h1>
	<br>
	Someone wants to change password on localhost:3000.
	<br>
	If its you please click 
	<form action="http://localhost:3000/auth/password-confirm?t=${token}&password=11111&passwordCopy=11111" method="post">
	<input type="submit" value="confirm password change"> </form>
	`;
}

