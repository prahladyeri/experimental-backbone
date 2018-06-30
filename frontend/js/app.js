var app = app || {};
app.version = "0.1.3";
console.log('loading app version ', app.version);

app.user1 = new app.User({
	name: "John Doe",
	type: "admin",
	email: "johndoe@nowhere.com",
	password: "",
});

app.user2 = new app.User({
	name: "Jane Doe",
	type: "admin",
	email: "janedoe@nowhere.com",
	password: "",
});
