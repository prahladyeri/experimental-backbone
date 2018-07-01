/**
 * App
 * 
 * */
var app = app || {};
app.version = "0.4";
app.config = {
	mode: 'offline', //@todo implement indexeddb and online mode
}
//@todo fill this after login:
app.state = {
	isLoggedIn: false,
}
console.log('loading app version ', app.version);
var user1 = new app.User({
	name: "John Doe",
	type: "admin",
	email: "johndoe@nowhere.com",
	password: "",
});
var user2 = new app.User({
	name: "Jane Doe",
	type: "admin",
	email: "janedoe@nowhere.com",
	password: "",
});
app.users = new app.Users([user1, user2]);


/**
 * Event Bus
 * 
 * */
//Backbone.sync(); //@todo override globally all save/fetch events

app.bus = _.clone(Backbone.Events);
app.bus.on("login", function(data) {
	console.log("bus triggered!", data);
});
app.bus.on("register", function(data) {
	console.log("bus triggered!", data);
});
