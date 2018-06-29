var app = app || {};
console.log("loading models");
app.User = Backbone.Model.extend({
	defaults: {
		type: "admin", // admin/user
		name: "",
		email: "",
		password: "",
	}
});
