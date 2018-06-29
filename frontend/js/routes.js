var app = app || {};
console.log("loading routes");
app.Router = Backbone.Router.extend({
	routes: {
		"": 'home'
	}
});

app.router = new app.Router();
app.loginView = new app.LoginView();

app.router.on('route:home', function() {
	console.log("route:home");
	app.loginView.render();
});
Backbone.history.start(); //@todo: check what this does.

app.setFocus = function(form) {
	console.log('now setting focus', form);
	form.find("input:first").focus();
}
