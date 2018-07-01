/**
 * Routes
 * 
 * */
var app = app || {};
console.log("loading routes");
app.navbarView = new app.NavbarView();

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
app.loginView = new app.LoginView();
app.registerView = new app.RegisterView();

app.navbarView.render()
.then(function(){
	//home page
	app.router.on('route:index', function() {
		console.log("route:index");
		//@todo: validate user and then redirect to login or home page.
		app.router.navigate("login", {'trigger':true})
		//(new app.NavbarView()).render();
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




