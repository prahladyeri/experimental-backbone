/* Business Logic */

var app = {};
app.version = "0.1.1";

var user = new User({
	name: "John Doe",
	type: "admin",
	email: "johndoe@nowhere.com",
	password: "",
});

console.log(user.toJSON());
