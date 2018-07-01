/**
 * Routes
 * 
 * */
var app = app || {};
console.log("loading routes");

app.Router = Backbone.Router.extend({
	initialize: function() {
		console.log('route initialized');
	},
	routes: {
		"": 'index',
		"login": 'login',
		"register": "register",
	}
});
app.router = new app.Router();

app.navbarView.render()
.then(function(){
	//home page
	app.router.on('route:index', function() {
		console.log("route:index");
		if (!app.authenticate()) return;
		(new app.HomeView()).render();
	});
	app.router.on('route:login', function() {
		console.log("route:login");
		app.loginView.render();
	});
	//register page
	app.router.on('route:register', function() {
		console.log("route:register");
		//@todo: validate user and then route to login or home page.
		//(new app.NavbarView()).render();
		app.registerView.render();
	});	
	Backbone.history.start(); //@todo: check what this does.
});




