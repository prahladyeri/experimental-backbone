/* Business Logic */
var user = new User({
	name: "John Doe",
	type: "admin",
	email: "johndoe@nowhere.com",
	password: "",
});

console.log(user.toJSON());

