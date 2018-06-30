/**
 * Models
 * 
 * */
var app = app || {};
console.log("loading models");
app.User = Backbone.Model.extend({
	defaults: {
		type: "admin", // admin/user
		name: "",
		email: "",
		password: "",
	},
	validate: function(attrs, options) {
		if (attrs.password.length < 8) {
			return "Password length cannot be less than eight chars.";
		}
	}
});

app.Users = Backbone.Collection.extend({
	model: app.User,
	url: "/user",
});
