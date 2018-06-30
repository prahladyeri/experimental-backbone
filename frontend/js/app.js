var app = app || {};
app.version = "0.4";
app.config = {
	mode: 'offline', //@todo implement indexeddb
}

//@todo fill this after login:
app.user = {
	status: "signed-out",
}
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

app.users = new app.Users([app.user1, app.user2]);
app.users = new app.Users([app.user1, app.user2]);

