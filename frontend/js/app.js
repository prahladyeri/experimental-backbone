var app = app || {};
app.version = "0.3";
console.log('loading app version ', app.version);

//helper functions
app.setFocus = function(form) {
	//console.log('now setting focus', form);
	form.find("input:first").focus();
}


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
