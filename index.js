const nodemailer = require('nodemailer-promise');
const fs = require('fs-extra');

const PEOPLE_LOC = 'people.json';
const MADE_ORDER = 'order.json';

const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASS = process.env.SENDER_PASS;
const SENDER_HOST = process.env.SENDER_HOST;

function main() {
	console.log('STARTING FUNCTION');

	// get People.json
	console.log('GETTING PEOPLE JSON FILE');
	return fs.readJson(PEOPLE_LOC)
	.then((people) => {
		// getValid Order
		console.log('BUILDING A VALID ORDER');
		let order = makeValidOrder(people);
		return Promise.resolve(order);
	})
	.then((order) => {
		// Save Order to json file
		console.log('WRITTING ORDER TO OUTPUT FILE');
		return fs.writeJson(MADE_ORDER, order)
		.then(() => {
			return Promise.resolve(order);
		});
	})
	.then((order) => {
		// Send All Emails
		console.log('SENDING EMAILS');
		return sendAllEmails(order);
	})
	.then(() =>{
		console.log('EMAILS SENT');
		return Promise.resolve(null)
	});
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// Make a Valid Order
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function makeValidOrder(people) {
	let order = makeOrder(people);
	
	while (!isValid(order)) {
		order=makeOrder(people);
	}
	return order
}



function makeOrder(people) {
	let order = [];
	people = clone(people);
	while (people.length > 0) {
		let index = randomInt(0, people.length);
		order.push(people.splice(index, 1)[0]);
	}
	return order
}

function isValid(order) {

	let valid = true
	for (let i = 0; i < order.length - 1; i++) {
		if (order[i].partner === order[i+1].id) valid = false;
		if (order[i+1].partner === order[i].id) valid = false;
	}

	if (order[0].partner === order[order.length-1].id) valid = false;
	if (order[order.length-1].partner === order[0].id) valid = false;
	return valid
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// Send All Email
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function sendAllEmails(order) {
	let proms = [];

	order.forEach((gifter, index) => {
		let target;
		if (index === order.length-1) target = order[0];
		else target = order[index+1];

		proms.push(sendEmail(gifter, target));
	});

	return Promise.all(proms);
}



function sendEmail(gifter, target) {
	let email = nodemailer.config({
	    host: SENDER_HOST,
        port: 465,
	    auth:{
	    	user: SENDER_EMAIL,
      		pass: SENDER_PASS
      	}
	});


	let message = {
	    to: 'sturgessecretsantas@gmail.com',
	    subject: 'Message title',
	    text: 'Hey ' + gifter.name + '\n\nYour Secret Santa Target is ' + target.name
	};

	return email(message);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// Utils
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function clone(a) {
   return JSON.parse(JSON.stringify(a));
}


main()
.then((data) => {
	console.log(data);
})
.catch((err) => {
	console.log(err);
})