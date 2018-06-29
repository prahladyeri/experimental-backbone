console.log("loading models");
User = Backbone.Model.extend({
	defaults: {
		type: "admin", // admin/user
		name: "",
		email: "",
		password: "",
	}
});
