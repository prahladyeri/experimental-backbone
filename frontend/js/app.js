/* Business Logic */

var app = {};
app.version = "0.1.1";
console.log('loading app version ', app.version);

var user1 = new User({
	name: "John Doe",
	type: "admin",
	email: "johndoe@nowhere.com",
	password: "",
});

var user2 = new User({
	name: "Jane Doe",
	type: "admin",
	email: "janedoe@nowhere.com",
	password: "",
});

//console.log(user.toJSON());
