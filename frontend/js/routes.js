console.log("loading routes");
var Router = Backbone.Router.extend({
	routes: {
		"": 'home'
	}
});

var router = new Router();
var loginView = new LoginView();

router.on('route:home', function() {
	console.log("route:home");
	loginView.render();
});
Backbone.history.start(); //@todo: check what this does.

function setFocus(form) {
	window.form = form;
	console.log('now setting focus', form);
	form.find("input:first").focus();
}
