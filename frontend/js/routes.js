/**
 * Routes
 * 
 * */
var app = app || {};

app.initRoutes = function(callback) {
	console.log("loading routes");
	app.Router = Backbone.Router.extend({
		initialize: function() {
			console.log('route initialized');
		},
		routes: {
			"": 'index',
			"login": 'login',
			"register": "register",
			"lorem": "test",
			"ipsum": "test",
			'about': 'about',
			'longrunning': 'longrunning',
			'*path':  'defaultRoute'
		}
	});
	app.router = new app.Router();
	app.router.listenTo(app.bus, "database:connected", function(e){
		console.log("database:connected", app.state.user);
	});

	views.navbarView.render();
	app.router.on('route:index', function() {
		console.log("route:index");
		if (!helper.authenticate()) return;
		views.homeView.render();
	});
	app.router.on('route:login', function() {
		console.log("route:login");
		views.loginView.render();
	});
	app.router.on('route:register', function() {
		console.log("route:register");
		views.registerView.render();
	});	
	app.router.on('route:about', function() {
		console.log("route:about");
		if (!helper.authenticate()) return;
		views.aboutView.render();
	});
	app.router.on('route:test', function() {
		console.log("route:test");
		if (!helper.authenticate()) return;
		app.testView.render();
	});
	app.router.on('route:longrunning', function(){
		console.log('route:longrunning');
		if (!helper.authenticate()) return;
		views.navbarView.render();
		app.sleep(2500)
		.then(function(e){
			app.testView.render();
		});
	});
	app.router.on('route:defaultRoute', function() {
		console.log("route:defaultRoute");
		if (!helper.authenticate()) return;
		views.testView.render();
	});
	Backbone.history.start(); //@todo: check what this does.
	callback();
}
